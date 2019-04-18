import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const plugins = [
  resolve({
    preferBuiltins: false,
    mainFields: ['jsnext:main', 'module', 'main'],
  }),
  commonjs(),
];

export default {
  input: './background.js',
  output: {
    file: './background.bundle.js',
    format: 'iife',
  },
  plugins,
};
