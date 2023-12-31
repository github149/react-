import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
//包的路径
const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');
export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}
export function getPackageJSON(pkgName) {
	//包路径
	const pathName = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(pathName, { encoding: 'utf-8' });
	return JSON.parse(str);
}

//基础的rollupPlugins
export function getBaseRollupPlugins({
	alias = { __DEV__: true },
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
