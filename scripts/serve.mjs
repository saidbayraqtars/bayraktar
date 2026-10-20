// Serves out/ the way nginx does on the VPS (deploy/nginx/sbayraktar.conf):
// clean URLs from .html files, the /projects redirects, 404.html.
// Used for local preview and the Playwright tests: `npm run serve` (port 3010).
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { redirects, fallback } from './redirects.mjs'

const ROOT = 'out'
const PORT = Number(process.env.PORT || 3010)
const TYPES = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
    '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml',
    '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon',
}
// Metadata images are exported without an extension.
const EXTENSIONLESS = { '/apple-icon': 'image/png', '/opengraph-image': 'image/png' }

const isFile = async (p) => { try { return (await stat(p)).isFile() } catch { return false } }

createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    const hit = redirects.find((r) => r.from === path)
    if (hit || path.startsWith(fallback.prefix)) {
        res.writeHead(301, { location: hit ? hit.to : fallback.to }).end()
        return
    }
    const safe = normalize(path).replace(/^(\.\.[/\\])+/, '')
    for (const candidate of [safe, `${safe}.html`, join(safe, 'index.html')]) {
        const file = join(ROOT, candidate)
        if (await isFile(file)) {
            res.writeHead(200, { 'content-type': EXTENSIONLESS[path] || TYPES[extname(file)] || 'application/octet-stream' })
            res.end(await readFile(file))
            return
        }
    }
    res.writeHead(404, { 'content-type': TYPES['.html'] }).end(await readFile(join(ROOT, '404.html')))
}).listen(PORT, '127.0.0.1', () => console.log(`[serve] http://127.0.0.1:${PORT}`))
