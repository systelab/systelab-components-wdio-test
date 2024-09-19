# Test remote WDIO REST API

## Boot REST API server

Execute the following command to boot the server to remotely control a WDIO application:

```bash
npm run start-remote-test-server
```

> If start succeeds, the server will be running on port 3333

## Start a Chrome application

Send a request to **POST localhost:3333/wdio/application/start** endpoint with the following body:

```json
{
    "browserType": "Chrome",
    "options": {

    }
}
```

## Navigate to URL



## Query a text


## Postman collection




