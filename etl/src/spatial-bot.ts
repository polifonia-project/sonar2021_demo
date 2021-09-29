import 'reflect-metadata';
import { Container } from 'typedi';

import { PolifoniaTTLFileToSonarAPPSongsETL } from "./etl/PolifoniaTTLFileToSonarAPPSongsETL"


const songsETL = Container.get(PolifoniaTTLFileToSonarAPPSongsETL)

songsETL.run()
