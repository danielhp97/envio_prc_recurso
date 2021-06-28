let axios = require('axios')

let prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <ontotext.com/explicit>
    PREFIX skos: <w3.org/2004/02/skos/core#>
    PREFIX : <http://prc.di.uminho.pt/2021/myfamily#>
`   
    let query = encodeURI(prefixes + 
    `
    CONSTRUCT {
        ?m :sexo "F" . 
        ?p :sexo "M" .
    
    } WHERE {
        ?s1 :temMae ?m .
        ?s2 :temPai ?p .
    
    }`)

    
    axios.get('http://localhost:7200/repositories/familias/statements?query=' + query)
        .then(res => {
            //console.log(res.data)
            //data = res.data
            let new_data = `INSERT DATA { ${res.data} }`


            axios.post('http://localhost:7200/repositories/family/statements?query=' + encodeURI(new_data))
              .then(console.log("Query done and data inserted"))
        })