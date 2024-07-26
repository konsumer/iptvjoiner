# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.5.1

FROM node:${NODE_VERSION}-alpine
# USER node
WORKDIR /usr/src/app

ENV NODE_ENV=production

# These should match, but you can override, if you need to
ENV PORT=3000
EXPOSE 3000

# this is the location of the database
ENV DATABASE_LOCATION=/usr/src/db
VOLUME /usr/src/db

# install deps
COPY package*.json .
RUN npm ci --include=dev

# Copy the rest of the source files into the image.
COPY . .

# build production
RUN npm run build

# get rid of dev-deps
RUN npm prune --production

CMD ["npm", "run", "start:prod"]
