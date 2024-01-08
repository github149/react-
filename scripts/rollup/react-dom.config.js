import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';
const { name, module } = getPackageJSON('react-dom');
//react-dom包路径，也就是源码路径
const pkgPath = resolvePkgPath(name);
//react-dom产物路径
const pkgDistPath = resolvePkgPath(name, true);
export default [
	//react-dom
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				name: 'index.js',
				format: 'umd'
			},
			{
				file: `${pkgDistPath}/client.js`,
				name: 'client.js',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			alias({
				entries: {
					hostConfig: `${pkgPath}/src/hostConfig.ts`
				}
			}),
			//生成package.json
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, version, description }) => ({
					name,
					version,
					description,
					main: 'index.js'
				})
			})
		]
	}
];
