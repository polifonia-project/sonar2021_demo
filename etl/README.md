## Installation

To install dependencies run

```
$ npm install
```

## Build
Source code run 

```
$npm run build
```

## Sparql ETL

You can extract SPARQL data with `SparqlETL` class

```js
import 'reflect-metadata';
import { Container } from 'typedi';
import { SparqlETL } from "./etl/SparqlETL"

// typedi container is available to resolve dependency
const sparqlETL = Container.get(SparqlETL)

// SPARQL sources
const sources = [{
    type: SourceEnum.File,
    value: "https://raw.githubusercontent.com/polifonia-project/sonar2021_demo/develop/src/assets/data/data_v2.jsonld"
}]

const query = "SELECT ?s ?p ?o WHERE {?s ?p ?o }"

sparqlETL.run({
   query: query,
   sources: sources
}).then((results) => {
    console.log(results)
})

/*
Output: [
 {
   s: ...,
   p: ...,
   o: ...
 }
  ...
]
*/
```

See for example: [spatial-bot.ts](https://github.com/polifonia-project/sonar2021_demo/blob/develop/etl/src/spatial-bot.ts)
