// main backend service
// TODO: add better errors to everything

import express from 'express'
import bodyParser from 'body-parser'
import { mergeIpTv, outputEPG, outputM3U } from './iptv.js'

import db from './db.js'

export const app = express()
export default app

const bodyJson = bodyParser.json()

// update the channel-data & map
async function updateProvider (id) {
  const provider = await db.get(`providers:${id}`)
  if (!provider) {
    throw new Error('Provider not found.')
  }
  const data = await mergeIpTv(provider.m3u, provider.epg)
  // TODO: this just clobbers epg, it should be merged
  // TODO: epg should be broken down by channel in db, to handle larger lists
  await db.put(`epg:${id}`, data)
  return data
}

// TODO: handle channelsToInclude on outputs

// stream playlist (mapped)
app.get('/:id/stream.m3u', async (req, res) => {
  const data = await db.get(`epg:${req.params.id}`)
  if (!data) {
    throw new Error('Provider not found.')
  }
  res.setHeader('content-type', 'audio/mpegurl')
  res.send(outputM3U(data))
})

// EPG XMLTV (mapped)
app.get('/:id/xmltv.xml', async (req, res) => {
  const data = await db.get(`epg:${req.params.id}`)
  if (!data) {
    throw new Error('Provider not found.')
  }
  res.setHeader('content-type', 'text/xml')
  res.send(outputEPG(data))
})

// update a single provider
app.get('/providers/:id/update', async (req, res) => {
  await updateProvider(req.params.id)
  res.json('OK')
})

// get all providers
app.get('/providers', async (req, res) => {
  const out = []
  for await (const [key, value] of db.iterator()) {
    if (key.startsWith('providers:')) {
      value.id = key.replace(/^providers:/, '')
      out.push(value)
    }
  }
  res.json(out)
})

// create a new provider
app.post('/providers', bodyJson, async (req, res) => {
  const id = crypto.randomUUID()
  await db.put(`providers:${id}`, req.body)
  await updateProvider(id)
  res.json({ id, ...req.body })
})

// edit an existing provider
app.put('/providers/:id', bodyJson, async (req, res) => {
  const old = await db.get(`providers:${req.params.id}`)
  const newRecord = { ...old, ...req.body }
  await db.put(`providers:${req.params.id}`, newRecord)
  if (req.body.m3u || req.body.epg) {
    await updateProvider(req.params.id)
  }
  res.json({ ...newRecord, id: req.params.id })
})

// get a single provider
app.get('/providers/:id', async (req, res) => {
  const rec = await db.get(`providers:${req.params.id}`)
  res.json({ ...rec, id: req.params.id })
})

// delete an existing provider
app.delete('/providers/:id', async (req, res) => {
  await db.del(`providers:${req.params.id}`)
  // TODO: delete channels that use this provider
  res.json('OK')
})

// get all channels
app.get('/channels', async (req, res) => {
  const out = []
  for await (const [key, value] of db.iterator()) {
    if (key.startsWith('channels:')) {
      value.id = key.replace(/^channels:/, '')
      out.push(value)
    }
  }
  res.json(out)
})

// create a new channel
app.post('/channels', bodyJson, async (req, res) => {
  const id = crypto.randomUUID()
  await db.put(`channels:${id}`, req.body)
  res.json({ id, ...req.body })
})

// edit an existing channel
app.put('/channels/:id', bodyJson, async (req, res) => {
  const old = await db.get(`channels:${req.params.id}`)
  const newRecord = { ...old, ...req.body }
  await db.put(`channels:${req.params.id}`, newRecord)
  res.json({ ...newRecord, id: req.params.id })
})

// get a single channel
app.get('/channels/:id', async (req, res) => {
  const rec = await db.get(`channels:${req.params.id}`)
  res.json({ ...rec, id: req.params.id })
})

// delete an existing channel
app.delete('/channels/:id', async (req, res) => {
  await db.del(`channels:${req.params.id}`)
  res.json('OK')
})
