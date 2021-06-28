var express = require('express');
var router = express.Router();


/* Informação de todos os países. */
router.get('/filmes',async function(req, res) {
  if(req.query.year){
    var year = req.query.year
    graphDB.fetch(`select ?s ?da ?nome where { ?s rdf:type :Filme ; :year "${req.params.id}" .}`)
   .then(resp => {
     res.jsonp(resp.data)
   })
  }
  else {
    graphDB.fetch('select ?s ?da ?nome where { ?s rdf:type :Filme ; :data ?da . ?a :nome ?nome}')
    .then(resp => {
      res.jsonp(resp.data)
    })
  }
});

router.get('/filmes/:id ', (req, res) => {
  graphDB.fetch(`select ?p ?val where { :${req.params.id} rdf:type :Filme ; ?p ?val .}`)
  .then(resp => {
    res.jsonp(resp.data)
  })
})


router.get('/atores', (req, res) => {
  graphDB.fetch(`select distinct ?m where { ?s rdf:type :Ator ; :temAutor ?m .}`)
  .then(resp => {
    res.jsonp(resp.data)
  })
})




module.exports = router;
