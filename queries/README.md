# Transformations
In what follows, `fx` stands for:
```
java -jar sparql-anything-VERSION.jar
```
The recommended version is the lates release candidate: `https://github.com/SPARQL-Anything/sparql.anything/releases/edit/v0.3.0-RC1`

Type `fx` for usage info, or check the [documentation](https://github.com/SPARQL-Anything/sparql.anything/).

## Lyrics
Goal: obtain CSV files with basic metadata and lyrics


### Utilities

List all JSON files in `datasets/`:
```
fx -q queries/ls.sparql
```

### /genius
Input: the `/genius` dataset

Output: `output/lyrics-genius.csv`

#### Process
Generate the list of files as a SPARQL JSON result set
```
fx -q queries/ls-genius.sparql -f JSON -o output/ls-genius.json
```
Use the SPARQL result set to iterate over files and generate an RDF file for each JSON file (the folder output/rdf/genius/ must already exist!)
```
fx -q queries/rdf-genius.sparql -i output/ls-genius.json -f TTL -p output/rdf/genius/?filename.ttl
```
Generate a single CSV collecting info from the RDF files
```
fx -q queries/lyrics-genius.sparql -l output/rdf/genius/ -f CSV -o output/lyrics-genius.csv
```


