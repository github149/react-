/* eslint-disable @typescript-eslint/no-explicit-any */

export type Container = any;
export const createInstance = (...args: any) => {
	console.log(args);
	return {} as any;
};
export const appendInitialChild = (...args: any) => {
	console.log(args);
	return {} as any;
};
export const createTextInstance = (...args: any) => {
	console.log(args);
	return {} as any;
};
