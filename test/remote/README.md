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
        "capabilities": {
            "browserName": "chrome",
            "goog:chromeOptions": {
                "args": ["--no-sandbox"]
            }
        }
    }
}
```

## Navigate to URL
Send a request to POST localhost:3333/wdio/applications/1/navigate endpoint with the following body:

```json
{
  "url": "https://www.werfen.com"
}
```

## Query a text

Send a request to POST localhost:3333/wdio/applications/1/element/query/text endpoint with the following body:

```json
{
  "locators":[
    {
      "type":"ElementSelector",
      "selector":".row-main-info"
    },
    {
      "type":"ElementSelector",
      "selector":".carousel-inner"
    },
    {
      "type":"ElementSelector",
      "selector":"h1.info-container__title"
    }
  ]
}
```


## Click on an element

Send a request to POST localhost:3333/wdio/applications/1/element/action/click endpoint with the following body:

```json
{
  "locators":[
    {
      "type":"ElementSelector",
      "selector":".row-main-info"
    },
    {
      "type":"ElementSelector",
      "selector":".carousel-inner"
    },
    {
      "type":"ElementSelector",
      "selector":"h1.info-container__title"
    }
  ]
}
```

## Postman collection

You can find more examples by importing the `PostmanCollection.json` on Postman. The examples can be found on WDIO Remote Server


## Run test suite collection

To run the test suite, first start the remote server by running on a terminal:

```shell
npm run start-remote-test-server
```
Then, on other terminal, run:
```shell
npm run test-remote-server
```


