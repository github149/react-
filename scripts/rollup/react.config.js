import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
const { name, module } = getPackageJSON('react');
//react包路径，也就是源码路径
const pkgPath = resolvePkgPath(name);
//react产物路径
const pkgDistPath = resolvePkgPath(name, true);
export default [
	//react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
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
	},
	//jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: {
			file: `${pkgDistPath}/jsx-runtime.js`,
			name: 'jsx-runtime.js',
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	},
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: {
			file: `${pkgDistPath}/jsx-dev-runtime.js`,
			name: 'jsx-dev-runtime.js',
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	}
];
