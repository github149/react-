export type Container = Element;
export type Instance = Element;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createInstance = (type: string, _props: unknown): Instance => {
	// TODO 处理props
	const element = document.createElement(type);
	return element;
};
export const appendInitialChild = (
	parent: Instance | Container,
	child: Instance
) => {
	parent.appendChild(child);
};
export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};
export const appendChildToContainer = appendInitialChild;
