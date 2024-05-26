const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outdir: 'out',
    platform: 'node',
    target: "node14",
    external: ['vscode'],
}).catch(() => process.exit(1));