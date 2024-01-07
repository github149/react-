/* eslint-disable @typescript-eslint/no-unused-vars */
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;
// prepareFreshStack 方法就是用于解决这个问题的。它会做以下工作：
// 保存当前调用栈
// 清空当前调用栈
// 返回一个函数
// 然后在执行真正的组件更新任务时：

// 先调用 prepareFreshStack 返回的函数，清空调用栈
// 执行更新任务
// 如果任务发生错误，错误对象的调用栈将是干净的
function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}
//实现调度功能
// scheduleUpdateOnFiber 的主要作用就是完成这项任务：
// 接收一个需要更新的 Fiber 对象
// 检查该 Fiber 是否已经在更新过程中
// 如果是，直接返回
// 否则继续下一步
// 将更新任务添加到该 Fiber 的更新队列中
// 如果该 Fiber 是 Concurrent 模式，还需要额外的处理
// 如设置需要挂起等标记
// 返回 Fiber 对象
// 之后，在 React 的调度循环中，会不断从各个 Fiber 的更新队列中取出任务执行更新工作。
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent != null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

//从当前的网上遍历到根节点
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function markUpdateFromFiberToRoot(fiber: FiberNode) {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderRoot(root: FiberRootNode) {
	//初始化
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn('workLoop发生错误', e);
			}

			workInProgress = null;
		}
	} while (true);
	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;
	//wip fiberNode树中的flags
	commitRoot(root);
}
// workLoop 可以说是 React 更新机制的核心驱动器，它通过不断循环，保证 Fiber 树能按需进行初始化、更新和清理工作。
function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
//performUnitOfWork 是 React 中 workLoop 的一个重要子方法，它负责执行单个工作单元(unit of work)。
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}
// 与performUnitOfWork 配合，完整地执行了单个 Fiber 节点的初始化/更新流程。
// 所以它也是 workLoop 重要的子方法，负责完成单元工作后的后续处理
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;

		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node != null);
}
function commitRoot(root: FiberRootNode) {
	throw new Error('Function not implemented.');
}
