// @ts-check

/**
 * @type { import('f2e-middle-esbuild').BuildOptions }
 */
let config = {
    watches: [/\.[jet]?sx?$/],
    sourcemap: 'external',
    entryPoints: ['src/index.tsx'],
    outfile: 'static/bundle.js',
    target: 'chrome70',
    define: {
        "process.env.NODE_ENV": '"dev"',
    },
    jsxFactory: 'React.createElement',
    bundle: true,
    format: 'iife',
    loader: {
        '.tsx': 'tsx',
        '.ts': 'ts'
    },
    tsconfig: './tsconfig.json',
};

module.exports = config