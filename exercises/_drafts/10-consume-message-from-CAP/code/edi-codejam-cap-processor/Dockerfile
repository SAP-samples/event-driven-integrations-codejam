FROM --platform=linux/amd64 node:20-alpine

RUN apk add --no-cache sqlite

# use productive environment
ENV NODE_ENV development

# copy source as node user
WORKDIR /usr/src/app
COPY --chown=node:node . .

# install dependencies
RUN npm ci

# run app as node user
EXPOSE 4004
USER node
CMD ["npm", "start"]