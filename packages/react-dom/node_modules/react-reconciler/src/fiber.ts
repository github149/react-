/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, Props, ReactElementType, Ref } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
// 形成FiberNode数据结构
export class FiberNode {
	tag: WorkTag;
	key: any;
	stateNode: any;
	pendingProps: Props;
	type: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	ref: Ref;
	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	updateQueue: unknown;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		this.stateNode = null;
		this.type = null;

		// 构成树状结构
		// 指向父fiberNode
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;
		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps;
		this.memoizedProps = null;
		this.memoizedState = null;
		this.updateQueue = null;

		this.alternate = null;
		//副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
	}
}

//FiberRootNode是React中的内部数据结构，用于表示整个React应用的根节点。
export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		this.finishedWork = null;
		hostRootFiber.stateNode = this;
	}
}

//createWorkInProgress是一个内部方法，用于创建一个新的工作中的Fiber节点。
export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode | null => {
	let wip = current.alternate;
	if (wip == null) {
		//mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		//update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;
	return wip;
};

export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', element);
	}
	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}
