import { Action } from 'shared/ReactTypes';

export interface Update<State> {
	action: Action<State>;
}

export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}
//创建更新
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<Action>;
};

export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	updateQueue.shared.pending = update;
};
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
