# Github repository search

This repository is an exercise on how to implement the Github search functionaliry using its GraphQL endpoint.

## Stack
* React, using create-react-app
* Typescript
* Apollo GraphQL
* Material UI
* Emotion
* Jest
* Cypress
* ESLint + Prettier
* Husky

## Authentication
Since this app uses the Github GraphQL API, a personal access token must be provided.
You can obtain one by going to your [personal access token page](https://github.com/settings/tokens).

## Setup
For every change in the GraphQL queries, you must run the codegen to reflect these changes.
```bash
TOKEN=<token> yarn codegen
```

## Running locally
*Note:* If you don't provide a token, the application will ask you to provide one, if not, it will raise an error.

```bash
REACT_APP_TOKEN=<token> yarn start
```

## Running on production
```bash
REACT_APP_TOKEN=<token> yarn build
npx serve -s ./build
```
