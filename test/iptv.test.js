/* global test, expect */

import { mergeIpTv, outputEPG, outputM3U } from '../src/server/iptv.js'

// defaults to mocked URLs, but you can override with real
const { IPTVJOINER_M3U = 'http://localhost:3000/stream.m3u', IPTVJOINER_GUIDE = 'http://localhost:3000/guide.xml' } = process.env

test('has tests', () => {
  expect(true).toBeTruthy()
})

// TODO: these are setup for mock, should probly be more general

test('can do update/mapping', async () => {
  const mapped = await mergeIpTv(IPTVJOINER_M3U, IPTVJOINER_GUIDE)
  expect(Object.keys(mapped).length).toBe(360)
})

test('can limit update/mapping', async () => {
  const mapped = await mergeIpTv(IPTVJOINER_M3U, IPTVJOINER_GUIDE, ['USBA3800004EL', 'USBD3500027DS'])
  expect(Object.keys(mapped).length).toBe(2)
  expect(mapped.USBA3800004EL).toBeDefined()
  expect(mapped.USBD3500027DS).toBeDefined()
})

test('can output EPG', async () => {
  const epg = outputEPG(await mergeIpTv(IPTVJOINER_M3U, IPTVJOINER_GUIDE))
  expect(epg).toBeDefined()
})

test('can output M3U', async () => {
  const m3u = outputM3U(await mergeIpTv(IPTVJOINER_M3U, IPTVJOINER_GUIDE))
  expect(m3u).toBeDefined()
})
