import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js'];

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: 'lib/esm.min.js',
            format: 'esm',
            plugins: [terser()],
            sourcemap: true
        },
        {
            file: 'lib/umd.js',
            format: 'umd',
            name: '@gden/enum',
            sourcemap: true
        },
        {
            file: 'lib/umd.min.js',
            format: 'umd',
            name: '@gden/enum',
            plugins: [terser()],
            sourcemap: true
        }
    ],
    plugins: [
        resolve({ extensions }),
        babel({
            babelHelpers: 'bundled',
            include: ['src/**/*.js'],
            extensions,
            exclude: './node_modules/**'
        })
    ]
};
