import { FiberNode } from './fiber';

export function renderWidthHooks(wip: FiberNode) {
	const Component = wip.type;
	const props = wip.pendingProps;
	const children = Component(props);
	return children;
}
