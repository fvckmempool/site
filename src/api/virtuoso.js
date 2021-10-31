import axios from "axios";
import {Client} from "graphql-ld";
import {QueryEngineComunica} from "graphql-ld-comunica";
const API = 'https://query.wikidata.org/sparql'
const uris = {
    wd:"https://www.wikidata.org/wiki/"
}
const comunicaConfig = {
    sources: [
      { type: "sparql", value:API,
     },
    ],
  };
  const context = {
    "@context": {
      "label": { "@id": "http://www.w3.org/2000/01/rdf-schema#label" },
      "drink":`${uris.wd}Q154`,
      "subClassOf":`${uris.wd}Property:P279`
    }
  }

  const client = new Client({ context, queryEngine: new QueryEngineComunica(comunicaConfig) });

const queryAllAlcoholicBerveage = `
query{
    id(subClassOf:drink)
}
`
 function getAllAlcoholicBerveage(){
    return new Promise((resolve, reject) => {
      axios.get({'query':queryAllAlcoholicBerveage}).then((response) => {
        resolve(response.data)
      }).catch((err) => reject(err))
    });
  }

  export {
    getAllAlcoholicBerveage
  }