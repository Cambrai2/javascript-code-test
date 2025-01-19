# Quick Start

to install dependencies run `npm i` followed with `npm run build`

## Running Tests

All unit tests are handled via jest and can be run via `npm run test`

## Endpoint

The endpoint `fetchByQuery` takes 3 parameters: `queryPath`, `inputParam` and `limit`:

- queryPath: provides the initial url path eg: `by-author` or `by-year`. This is designated by the type `QueryPath`.

# Javascript Code Test

`BookSearchApiClient` is a simple class that makes a call to a http API to retrieve a list of books and return them.

You need to refactor the `BookSearchApiClient` class, and demonstrate in `example-client.js` how it would be used. Refactor to what you consider to be production ready code. You can change it in anyway you would like and can use javascript or typescript.

Things you will be asked about:

1. How could you easily add other book seller APIs in the the future
2. How would you manage differences in response payloads between different APIs without needing to make future changes to whatever code you have in example-client.js
3. How would you implement different query types for example: by publisher, by year published etc
4. How your code would be tested
