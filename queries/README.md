# Transformations
In what follows, `fx` stands for:
```
java -jar sparql-anything-VERSION.jar
```
The recommended version is the latest release: `https://github.com/SPARQL-Anything/sparql.anything/releases/edit/v0.3.0`

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
fx -q queries/rdf-genius.sparql -i output/ls-genius.json -f TTL -p output/rdf/genius/?filename.ttl -s 0
```
Generate a single CSV collecting info from the RDF files
```
fx -q queries/lyrics-genius.sparql -l output/rdf/genius/ -f CSV -o output/lyrics-genius.csv
```


### /songfacts
Input: the `/songfacts` dataset

Output: `output/lyrics-songfacts.csv`

#### Process
Generate the list of files as a SPARQL JSON result set
```
fx -q queries/ls-songfacts.sparql -f JSON -o output/ls-songfacts.json
```
Use the SPARQL result set to iterate over files and generate an RDF file for each JSON file (the folder output/rdf/songfacts/ must already exist!)
```
fx -q queries/rdf-songfacts.sparql -i output/ls-songfacts.json -f TTL -p output/rdf/songfacts/?filename.ttl -s 0
```
Generate a single CSV collecting info from the RDF files
```
fx -q queries/lyrics-songfacts.sparql -l output/rdf/songfacts/ -f CSV -o output/lyrics-songfacts.csv
```
