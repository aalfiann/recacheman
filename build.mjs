import { build } from 'esbuild';
import fs from 'fs';

build({
  entryPoints: ['lib/index.js'],
  outfile: 'dist/index.js',
  bundle: false,
  format: 'cjs',
  platform: 'node',
  target: ['node20'],
  sourcemap: false,
  external: [],
}).then(() => {
  // Inject compatibility line for CommonJS default exports
  const content = fs.readFileSync('dist/index.js', 'utf8');
  const patch = content + '\nmodule.exports = module.exports.default || module.exports;';
  fs.writeFileSync('dist/index.js', patch);
}).catch(() => process.exit(1));
