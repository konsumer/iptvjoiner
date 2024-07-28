// this will download mock from channels I found on https://github.com/iptv-org

import { writeFile } from 'node:fs/promises'

const m3u = await fetch('https://i.mjh.nz/SamsungTVPlus/us.m3u8').then(r => r.text())
writeFile(new URL('mock/stream.m3u', import.meta.url).pathname, m3u)

const epg = await fetch('https://i.mjh.nz/SamsungTVPlus/us.xml').then(r => r.text())
writeFile(new URL('mock/guide.xml', import.meta.url).pathname, epg)
