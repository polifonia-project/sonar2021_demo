import { SparqlClient } from "./etl/extract/sparql/SparqlClient"
import { FilePublisher } from "./etl/load/json/FilePublisher"
import { PolifoniaTTLFileToSonarAPPSongsETL } from "./etl/PolifoniaTTLFileToSonarAPPSongsETL"
import { SparqlDataMapper } from "./etl/transform/sparql/SparqlDataMapper"


const songsETL = new PolifoniaTTLFileToSonarAPPSongsETL(
    new SparqlClient(),
    new SparqlDataMapper(),
    new FilePublisher()
)

songsETL.run()