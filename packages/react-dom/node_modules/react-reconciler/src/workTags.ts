// FunctionComponent:函数组件类型，值是0
// HostRoot:根Fiber节点类型，值是3
// HostComponent:原生DOM组件类型，值是5
// HostText:文本节点类型，值是6
export const FunctionComponent = 0;
export const HostRoot = 3;
export const HostComponent = 5;
export const HostText = 6;
export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;
