/* eslint-disable @typescript-eslint/no-unused-vars */
import { beginWork } from './beginWork';
import { commitMutationEffects } from './commitWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;
// prepareFreshStack 方法就是用于解决这个问题的。它会做以下工作：

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}
//实现调度功能

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO 调度功能
	// fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

//从当前的网上遍历到根节点
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}
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
	const finishedWork = root.finishedWork;
	if (finishedWork === null) {
		return;
	}
	if (__DEV__) {
		console.warn('commit阶段开始执行', finishedWork);
	}

	// 重置
	root.finishedWork = null;
	// 判断是否存在3个子阶段需要执行的操作
	// root flags root subtreeFlags
	const subtreeFlags = (finishedWork.subtreeFlags & MutationMask) !== NoFlags;
	const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
	if (subtreeFlags || rootHasEffect) {
		// beforeMutation
		// mutation Placement
		// 切换在mutaion和layout阶段
		commitMutationEffects(finishedWork);
		root.current = finishedWork;
		// layout
	} else {
		//
		root.current = finishedWork;
	}
}
