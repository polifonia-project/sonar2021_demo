## Polifonia KG Places ETL

Here you find code to produce Polifonia KG places related triples.

For the mapping from raw data to RDF is used [sparql.anything](https://github.com/SPARQL-Anything/sparql.anything).

You need the sparql.anything `jar` in the root source of this folder.

Then run: `java -jar sparql-anything-{VERSION}.jar -q queries/places.sparql`

To ouput a new version of knowledge graph in `kg/` folder you can run (in a UNIX shell):

```java -jar sparql-anything-{VERSION}.jar -q queries/places.sparql > kg/polifonia-"`date +"%d-%m-%Y_%H:%M:%S"`"```



### Tutorial

```fx -q queries/tutorial.sparql -f JSON -o data/tutorial.jsonld```

