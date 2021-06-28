import json
#open data
with open('movies.json') as f:
    data = json.loads(f.read())
#escrever ficheiro 
with open('final.ttl', 'w') as out:
    for i in data:
        out.write(f'''
            ###   http://www.di.uminho.pt/prc2020/movies#{i["title"]}
            :<http://www.di.uminho.pt/prc2020/movies#{i["title"]}> rdf:type owl:NamedIndividual ,
                                <http://www.di.uminho.pt/prc2020/movies#Filme> ;
        ''' )
        for j in i['cast']:
            out.write(f'''
                 <http://www.di.uminho.pt/prc2020/movies#temAutor> <http://www.di.uminho.pt/prc2020/movies#{j}>         
        ''')
        for j in i['genres']:
            out.write(f'''
                 <http://www.di.uminho.pt/prc2020/movies#temGenero> <http://www.di.uminho.pt/prc2020/movies#{j}>         
        ''')
        out.write(f'''

                <http://www.di.uminho.pt/prc2020/movies#data> {i["year"]} ;
                        :nome "{i["title"]}" .
                        
            ''')



####  http://www.di.uminho.pt/prc2020/movies#Anne_Hathaway
#<http://www.di.uminho.pt/prc2020/movies#Anne_Hathaway> rdf:type owl:NamedIndividual ,
#                                                                <http://www.di.uminho.pt/prc2020/movies#Ator> .
#
#
####  http://www.di.uminho.pt/prc2020/movies#BrokeBack_Mountain
#<http://www.di.uminho.pt/prc2020/movies#BrokeBack_Mountain> rdf:type owl:NamedIndividual ,
#                                                                     <http://www.di.uminho.pt/prc2020/movies#Filme> ;
#                                                            <http://www.di.uminho.pt/prc2020/movies#temAutor> <http://www.di.uminho.pt/prc2020/movies#Anne_Hathaway> ,
#                                                                                                              <http://www.di.uminho.pt/prc2020/movies#Heath_Ledger> ;
#                                                            <http://www.di.uminho.pt/prc2020/movies#temGenero> <http://www.di.uminho.pt/prc2020/movies#Romance> ,
#                                                                                                               <http://www.di.uminho.pt/prc2020/movies#Western> ;
#                                                            <http://www.di.uminho.pt/prc2020/movies#data> 2005 ;
#                                                            <http://www.di.uminho.pt/prc2020/movies#nome> "Brokeback Mountain" .
#
#
####  http://www.di.uminho.pt/prc2020/movies#Heath_Ledger
#<http://www.di.uminho.pt/prc2020/movies#Heath_Ledger> rdf:type owl:NamedIndividual ,
#                                                               <http://www.di.uminho.pt/prc2020/movies#Ator> ;
#                                                      <http://www.di.uminho.pt/prc2020/movies#nome> "Heath Ledger" .
#
#
####  http://www.di.uminho.pt/prc2020/movies#Romance
#<http://www.di.uminho.pt/prc2020/movies#Romance> rdf:type owl:NamedIndividual ,
#                                                          <http://www.di.uminho.pt/prc2020/movies#Género> ;
#                                                 <http://www.di.uminho.pt/prc2020/movies#temFilmes> <http://www.di.uminho.pt/prc2020/movies#BrokeBack_Mountain> .
#
#
####  http://www.di.uminho.pt/prc2020/movies#Western
#<http://www.di.uminho.pt/prc2020/movies#Western> rdf:type owl:NamedIndividual ,
#                                                          <http://www.di.uminho.pt/prc2020/movies#Género> ;
#                                                 <http://www.di.uminho.pt/prc2020/movies#temFilmes> <http://www.di.uminho.pt/prc2020/movies#BrokeBack_Mountain> .
#
#
#
#
#
#
#