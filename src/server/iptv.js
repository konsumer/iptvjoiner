// this manages collecting & parsing IPTV (playlists and EPG)

import { parseM3U, writeM3U } from '@iptv/playlist'
import { parseXmltv, writeXmltv } from '@iptv/xmltv'

// download stream & epg (if provided) and merge them into a single object
export async function mergeIpTv (playlistUrl, epgUrl, channelsToInclude) {
  const m3u = parseM3U(await fetch(playlistUrl).then(r => r.text()))

  let epg = { channels: [], programmes: [] }

  if (epgUrl) {
    epg = parseXmltv(await fetch(epgUrl).then(r => r.text()))
    // filter out epg channels & programmes that are not in stream playlist
    const channelIds = m3u.channels.map(c => c.tvgId).filter(id => id)
    epg.channels = epg.channels.filter(c => channelIds.includes(c.id))
    epg.programmes = epg.programmes.filter(p => channelIds.includes(p.channel))
  }

  // build an object that is faster to lookup by channel
  const keyed = {}
  for (const c of m3u.channels) {
    if (!channelsToInclude || (channelsToInclude && channelsToInclude.includes(c.tvgId))) {
      keyed[c.tvgId] = {
        ...c,
        epg: {
          ...epg.channels.find(cc => c.tvgId === cc.id),
          programs: epg.programmes.filter(p => p.channel === c.tvgId)
        }
      }
    }
  }

  return keyed
}

// output an EPG for a merged object
export function outputEPG (keyed, channelsToInclude) {
  const programmes = []
  const channels = []
  for (const cid of Object.keys(keyed)) {
    if (!channelsToInclude || (channelsToInclude && channelsToInclude.includes(cid))) {
      const { epg: { programs, ...epgChannel } } = keyed[cid]
      programmes.push(...programs)
      channels.push(epgChannel)
    }
  }

  return writeXmltv({ programmes, channels })
}

// output stream M3U for a merged object
export function outputM3U (keyed, channelsToInclude) {
  const channels = []
  for (const cid of Object.keys(keyed)) {
    if (!channelsToInclude || (channelsToInclude && channelsToInclude.includes(cid))) {
      const { epg, ...channel } = keyed[cid]
      channels.push(channel)
    }
  }
  return writeM3U({ channels })
}
