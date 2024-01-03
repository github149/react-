/* eslint-disable @typescript-eslint/no-explicit-any */
export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;
export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;
	_mark: string;
}

// 对应两种触发更新的方式
// 直接更新 this.setState(state)
// 函数更新的方式 this.setState((prevState) =>  (prevState+1))
export type Action<State> = State | ((prevState: State) => State);
