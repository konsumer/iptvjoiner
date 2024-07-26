This is a tool to merge & filter m3u & xmltv lists, for use with plex and other services that can only read shorter lists.


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
