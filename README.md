This is a tool to merge & filter m3u & xmltv lists, and emulate a hdhomerun device for use with plex and other services that can only read shorter lists.

You can kind of think of it like a simple & very fast [xTeVe](https://github.com/xteve-project/xTeVe) + [m3u4u](http://m3u4u.com/), combined. I used both of these together before i made it. [xTeVe](https://github.com/xteve-project/xTeVe) will turn m3u/epg into a fake HDHomeRun device (for plex) and you can use [m3u4u](http://m3u4u.com/) to manage your playlist and trim it down (because [xTeVe](https://github.com/xteve-project/xTeVe) can't handle really big lists.) With this service, you only need the one thing, and I like the UI better on mine than both of those. 


## local

```
npm i
npm start
```

Setup your client like this:

```
Stream: http://IP:3000/stream.m3u
XMLTV (EPG): http://IP:3000/xmltv.xml
```

Manage your streams/epg at  `http://IP:3000/`

## docker

You can run it in docker, like this:

```
docker run -it --rm -p 3000:3000 -v ${PWD}/.db:/usr/src/db konsumer/iptvjoiner
```

- `-p` - sets port (first is host-port, second is the port to expose.) You can map any host port to 3000.
- `-v` - volume-mounts `./.db` as the database-location (`/usr/src/db`.)

On windows, you might have to adjust like this (instead of using `-v`):

```
docker run -it --rm -p 3000:3000 --mount type=bind,source=C:\iptvjoiner,target=/usr/src/db konsumer/iptvjoiner
```

### compose

Add it to docker-compose, like this:

```yml
services:
  iptvjoiner:
    image: konsumer/iptvjoiner
    ports:
      - 3000:3000
    volumes:
      - ./.db:/usr/src/db
```


## notes

- I am using [these icons](https://icon-sets.iconify.design/carbon/)
- I publish for every platform with `npm run build:docker`
- test streams & epg can be found [here](https://i.mjh.nz/), which I got from [iptv-org](https://github.com/iptv-org)

## todo

- add actual homerun (shared port, and optional seperate ports for each provider)
- put channels admin inside each provider (and allow merging them) so you can do per-channel epg/m3u/homerun and global
- add info button for each provider
- actually setup cheannels admin