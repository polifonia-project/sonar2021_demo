## Polifonia KG Places ETL

Here you find code to produce Polifonia KG places related triples.

For the mapping from raw data to RDF is used [sparql.anything](https://github.com/SPARQL-Anything/sparql.anything).

You need the sparql.anything `jar` in the root source of this folder.
Then run: `fx -q queries/places.sparql`
This will output the KG in the console.


To output a version of the knowledge graph in `kg/versions` folder run:

```fx -q queries/places.sparql -f TTL -o kg/versions/polifonia-kg-places-{MAJOR.MINOR.PATCH}.ttl```

e.g. ```fx -q queries/places.sparql -f TTL -o kg/versions/polifonia-kg-places-0.0.1.ttl```



To update the latest version of the knowledge graph in `kg/` folder run:

```fx -q queries/places.sparql -f TTL -o kg/polifonia-kg-places-latest.ttl```


### Tutorial

```fx -q queries/tutorial.sparql -f JSON -o kg/tutorial/tutorial.jsonld```

