import 'reflect-metadata';
import { Container } from 'typedi';


import { SparqlETL } from "./etl/SparqlETL"
import { SourceEnum } from './etl/extract/sparql/SparqlClient';
import { FilePublisher } from './etl/load/json/FilePublisher';

const sparqlETL = Container.get(SparqlETL)
const filePublisher = Container.get(FilePublisher)


const sources = [{
    type: SourceEnum.File,
    value: "https://raw.githubusercontent.com/polifonia-project/sonar2021_demo/develop/src/assets/data/data_v2.jsonld"
}]

const getSongsQuery = `
      
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX polifonia-mp: <https://w3id.org/polifonia/ON/musical-performance/>
      
        SELECT ?id ?name ?artist ?youtubeID ?artistId  WHERE {
        
          ?id rdf:type polifonia-mp:Recording ;
            polifonia-mp:hasTitle ?name ;
            polifonia-mp:hasArtistLabel ?artist;
            polifonia-mp:hasArtist ?artistId;
            polifonia-mp:hasYoutubeID ?youtubeID .
        
        }         
`

const getAnnotationsQuery = `
        
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX poli-mp: <https://w3id.org/polifonia/ON/musical-performance/>
        PREFIX poli-core:  <https://w3id.org/polifonia/ON/core/>

        SELECT ?id 
               ?type 
               ?songID
               ?timestamp

               ?relatedSongID
               ?placeName
               ?description

               ?lat
               ?long

               WHERE {
            
          ?id rdf:type poli-core:SpatialAnnotation ;
              poli-mp:hasDescription ?description ;
              poli-mp:hasTimeStamp ?timestamp ;
              poli-mp:hasType ?type ;
              poli-mp:aboutRecording ?songID ;
              poli-mp:hasSpatialSimilarityToRecording ?relatedSongID ;
              poli-mp:hasLat ?lat;
              poli-mp:hasLng ?long ;
              poli-mp:aboutPlaceName ?placeName .
            }
`

const toSonarAppAnnotation =  (sparqlRow : any) => {
    return {
        id: sparqlRow.id,
        type: sparqlRow.type,
        description: sparqlRow.description,
        songID: sparqlRow.songID,
        timestamp: Number.parseInt(sparqlRow.timestamp),
        metadata: {
            long: sparqlRow.long,
            lat: sparqlRow.lat,
            placeName: sparqlRow.placeName
        },
        relationships: [{
            songID: sparqlRow.relatedSongID,
            type: sparqlRow.type,
            score: Math.random()
        }]

    }
}

const toSonarSongAnnotation = (sparqlRow: any) => {

    const parsedYTURL = sparqlRow.youtubeID.split("/")

    return {
        ...sparqlRow,
        youtubeID : parsedYTURL[parsedYTURL.length - 1]
    }
}

// remove duplicates with same id
const withoutDuplicates = (data: any[]) => {
    return data.filter((v : any,i : any,a : any) => a.findIndex((t : any)=>(t.id === v.id))===i)
}


function main() {
    
    // launch get songs job
    const getSongs = sparqlETL.run({
        query: getSongsQuery,
        sources: sources
    })
    
    // launch get annotation jobs
    const getAnnotations = sparqlETL.run({
        query: getAnnotationsQuery,
        sources: sources
    })
    

    // run query in parallel
    Promise.all([getSongs, getAnnotations]).then(([songsResults, annotationResults]) => {
    
        // remove duplicates and map to App Entities
        const sonarAnnotations = withoutDuplicates(annotationResults.map(toSonarAppAnnotation))
        const songAnnotations = withoutDuplicates(songsResults.map(toSonarSongAnnotation))

        // write new json static file
        filePublisher.write({
            songs: songAnnotations,
            annotations: sonarAnnotations
        }, {
            destination: "./data_v3.json",
            msg: "[*] File written to: " + "./data_v3.json"
        })
        
    })
}

main()