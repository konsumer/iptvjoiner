// this will mock fake URLs for unit-tests

import { readFile } from 'node:fs/promises'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

const mockM3u = await readFile(new URL('mock/stream.m3u', import.meta.url).pathname)
const mockEpg = await readFile(new URL('mock/guide.xml', import.meta.url).pathname)

export const handlers = [
  http.get('http://localhost:3000/stream.m3u', async () => {
    return new HttpResponse(mockM3u)
  }),
  http.get('http://localhost:3000/guide.xml', async () => {
    return new HttpResponse(mockEpg)
  })
]

const server = setupServer(...handlers)
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' })) // couldd also be bypass
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
