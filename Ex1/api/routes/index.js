var express = require('express');
var router = express.Router();
var gdb = require('../utils/graphdb')
var axios = require('axios')


function perm (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

}
router.get('/',function(req, res){
  perm(req,res)
  res.jsonp('Página inicial');
});


/* Informação de todos os países. */
router.get('/paises',async function(req, res) {
  perm(req,res)
  /*res.setHeader('Acess-Control-Allow-Origin','*');*/
  var myquery = `select  ?s ?populacao ?continente where {
    ?s a :País;
      	:população ?populacao;
      	:pertenceA ?continente.
 
} order by ?s`
  var result = await gdb.execQuery(myquery);
  var dados = result.results.bindings.map(c=> {
    return {
      país: c.s.value.split("#")[1],
      populacao : c.populacao.value,
      continente : c.continente.value.split("#")[1]
    }
  })
  res.jsonp(dados);
});

/* Informações relativas a um país */
router.get('/paises/:id', async function(req, res) {
  perm(req,res)
  var myquery = `select  * where {
    ?s a :Semana;
       	:relativoA :${req.params.id};
    	
} order by asc (?s)
`
  var result = await gdb.execQuery(myquery);
  var dados = result.results.bindings.map(c=> {
    return {
      semana: c.s.value.split("#")[1]
    }
  })
  
  res.jsonp(dados);
});

/* Todas as informações de todas as semanas de um país o id é o nome do país */

router.get('/paises/semanas/:id', async function(req, res) {
  perm(req,res)
  var myquery = `select  * where {
    ?s a :Semana;
       	:relativoA :${req.params.id};        
    	:nmr_vacinados_1dose ?nmr_vacinados_1dose;
    	:nmr_vacinados_totalmente ?nmr_vacinados_totalmente;
     	:num_casos ?num_casos;
      	:num_casos_acum ?num_casos_acum;
       	:num_mortes ?num_mortes;
        :num_mortes_acum ?num_mortes_acum
     	       
} order by ?s`

  var result = await gdb.execQuery(myquery);
  
  var dados =  result.results.bindings.map(c=> {
    return {
      país: req.params.id,
      semana:c.s.value.split("#")[1]/*.split("_")[0]+"_"+c.s.value.split("#")[1].split("_")[1]*/,
      nmr_vacinados_totalmente : c.nmr_vacinados_totalmente.value,
      num_casos : c.num_casos.value,
      num_casos_acum :c.num_casos_acum.value,
      num_mortes : c.num_mortes.value,
      num_mortes_acum : c.num_mortes_acum.value,
    
    }
  })
      
    
  res.jsonp(dados);
});

/*dados de uma semana especifica*/
router.get('/paises/semana/:id', async function(req, res) {
  perm(req,res)
  var myquery = `select  * where {
    :${req.params.id} a :Semana;    
    	:nmr_vacinados_1dose ?nmr_vacinados_1dose;
    	:nmr_vacinados_totalmente ?nmr_vacinados_totalmente;
     	:num_casos ?num_casos;
      :num_casos_acum ?num_casos_acum;
      :num_mortes ?num_mortes;
      :num_mortes_acum ?num_mortes_acum
     	       
} `

  var result = await gdb.execQuery(myquery);
  
  var dados =  result.results.bindings.map(c=> {
    return {
      semana:req.params.id,
      nmr_vacinados_1dose :c.nmr_vacinados_1dose.value,
      nmr_vacinados_totalmente : c.nmr_vacinados_totalmente.value,
      num_casos : c.num_casos.value,
      num_casos_acum :c.num_casos_acum.value,
      num_mortes : c.num_mortes.value,
      num_mortes_acum : c.num_mortes_acum.value,
    
    }
  })
      
    
  res.jsonp(dados);
});



module.exports = router;
