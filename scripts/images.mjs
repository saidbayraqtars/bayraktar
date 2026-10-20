// Writes the WebP widths that lib/image-loader.ts asks for into out/_img.
// Runs after `next build` (see package.json). Widths must match
// images.deviceSizes + images.imageSizes in next.config.ts.
import { mkdir, readdir, stat } from 'node:fs/promises'
import { join, extname, basename, relative } from 'node:path'
import sharp from 'sharp'

const WIDTHS = [256, 480, 768, 1080, 1440, 1920]
const SRC = 'public/work'
const OUT = 'out/_img'

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
let written = 0
for (const file of files) {
    const input = join(SRC, file)
    // Same naming as the loader: path under public, slashes to "_", no extension.
    const name = relative('public', input).replace(/\\/g, '/').replace(/\//g, '_').slice(0, -extname(file).length)
    const { width: native = 0 } = await sharp(input).metadata()
    for (const w of WIDTHS) {
        const target = join(OUT, `${name}-${w}.webp`)
        // Never upscale: a 1200px screenshot asked for at 1920 is written at 1200.
        await sharp(input).resize({ width: Math.min(w, native), withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(target)
        written++
    }
}
const total = (await Promise.all((await readdir(OUT)).map((f) => stat(join(OUT, f))))).reduce((s, f) => s + f.size, 0)
console.log(`[images] ${files.length} images, ${written} files, ${(total / 1024).toFixed(0)} KB in ${OUT} (${basename(SRC)})`)
