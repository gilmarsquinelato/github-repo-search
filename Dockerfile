FROM node:12-alpine AS base

WORKDIR /app
ARG TOKEN
ENV REACT_APP_TOKEN=${TOKEN}
ENV BROWSER=none

COPY package.json .
COPY yarn.lock .

# ---
FROM base AS dependencies

ENV CYPRESS_CACHE_FOLDER=./tmp/Cypress
RUN yarn install

# ---
FROM cypress/browsers:node14.0.0-chrome84 AS tests

WORKDIR /app

ENV CI=true
ENV CYPRESS_CACHE_FOLDER=./tmp/Cypress

ARG TOKEN
ENV REACT_APP_TOKEN=${TOKEN}
ENV BROWSER=none

COPY --from=dependencies /app/node_modules node_modules
COPY --from=dependencies /app/tmp tmp
COPY . .
RUN yarn lint
RUN yarn test:ci
RUN yarn test:e2e

# ---
FROM dependencies AS release

COPY --from=dependencies /app/node_modules node_modules
COPY . .
RUN yarn build

# ---
FROM nginx:alpine AS run

COPY --from=release /app/build /usr/share/nginx/html
