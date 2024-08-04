// TODO: fix it
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: "json" };
import ts from 'typescript'

export default {
    input: 'src/index.ts', // Adjust this to the main entry point of your library
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
        typescript({
            typescript: ts,
        }),
        terser(),
    ],
};
