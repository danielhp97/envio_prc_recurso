var axios = require('axios')
var prefixes = `
        @prefix : <http://www.di.uminho.pt/prc2020/movies#> .
        @prefix owl: <http://www.w3.org/2002/07/owl#> .
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
        @prefix xml: <http://www.w3.org/XML/1998/namespace> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
        @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
        @base <http://www.di.uminho.pt/prc2020/movies> .
        `
//PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//PREFIX owl: <http://www.w3.org/2002/07/owl#>
//PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
//PREFIX noInferences: <http://www.ontotext.com/explicit>
//PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
//PREFIX : <http://www.di.uminho.pt/prc2021/covid#>
exports.execQuery = async function (query){

    var getLink = "http://gdb:7200/repositories/test?query="
    var encoded = encodeURIComponent(prefixes + query)
    var result = await axios.get(getLink + encoded)
    return result.data
}

exports.execTransaction = async function(query){
    var postLink = "http://gdb:7200/repositories/test/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try{
        response = await axios.post(postLink, `update=${encoded}`)
        return response.data
    }catch(error){
        throw(error)
    }
}
