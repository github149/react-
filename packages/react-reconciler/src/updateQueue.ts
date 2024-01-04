import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}
//createUpdate用于创建一个更新对象
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

//创建更新队列
//1. 创建一个空的对象来表示这个更新队列
//2. 设置默认属性，如是否需要同步flush同步等
//3. 返回这个更新队列对象
export const createUpdateQueue = <State>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
};

export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	updateQueue.shared.pending = update;
};

// 用于处理组件更新队列中的更新操作
// 具体来说，processUpdateQueue 会做以下事情：
// 获取组件的更新队列
// 循环取出队列中的每个更新操作
// 根据更新类型，执行对应的操作
// 如状态更新就调用 setState
// 如 props 更新就调用 componentReceiveProps
// 执行完一个更新后，检查是否需要中断以留出时间给浏览器渲染
// 如果需要中断，将剩余更新推入下次循环
// 如果不需要中断，继续取下一个更新执行
// 所有更新执行完后，标记队列为已处理
// 通过这种方式，processUpdateQueue 可以保证组件树中所有需要更新的组件都能得到有序执行，同时考虑浏览器性能需要中断渲染的情况。
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate != null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			// 通过函数更新的方式
			result.memoizedState = action(baseState);
		} else {
			//直接更新
			result.memoizedState = action;
		}
	}
	return result;
};
