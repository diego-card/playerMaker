const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg');

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jogadorFut',
    password: '2656572l',
    port: 5432
});

client.connect();



//client.query();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/jogadores', function (req, res) {
    client.query("SELECT * FROM jogadores").then(
        function (ret) {
            res.json({
                numeroDeJogadores: ret.rows.length,
                jogadores: ret.rows
            });
        }
    );
    /*res.json({
        nome: 'Paulo',
        pais: 'Brasil',
        notaGeral: '80',
        time: 'Flamengo',
        salario: '500,000'
    });*/
});


app.get('/jogadores/:id', function(req, res){
    client.query({
        text: "SELECT * FROM jogadores WHERE $1 = id",
        values: [req.params.id]
    }).then(
        function (ret) {
            res.json(ret.rows)
        }
    );
});

app.post('/jogador', function (req, res) {
    client.query({
        text: "INSERT INTO jogadores (nome, pais, notaGeral, time, salario) VALUES ($1, $2, $3, $4, $5)",
        values: [req.body.nome, req.body.pais, req.body.notaGeral, req.body.time, req.body.salario]
    });
    res.json({
        mensagem: 'Jogador cadastrado.',
        dados: {
            nome: req.body.nome,
            pais: req.body.pais,
            notaGeral: req.body.notaGeral,
            time: req.body.time,
            salario: req.body.salario
        }
    });
    console.log(req.body);
});

app.delete('/jogadordelete', function(req, res){
    client.query({
        text: "DELETE FROM jogadores WHERE id = $1",
        values: [req.body.id]
    });
    console.log('Deletado com sucesso.');
});

app.post('/time', function (req, res){
    client.query({
        text: "INSERT INTO times (nome, pais, liga) VALUES ($1, $2, $3)",
        values: [req.body.nome, req.body.pais, req.body.liga]
    });
    res.json({
        mensagem: 'Jogador cadastrado.',
        dados: {
            nome: req.body.nome,
            pais: req.body.pais,
            liga: req.body.liga
        }
    });
    console.log(req.body);
});

//Mostre TODOS os times
app.get('/todostimes', function (req, res) {
    client.query("SELECT * FROM times").then(
     function (ret) {
        res.json({
            numeroDeTimes: ret.rows.length,
            times: ret.rows
        });
        //console.log(ret.rows);
     });
 });

//Mostre os jogadores que possuem time
app.get('/jogadortime', function (req, res) {
    client.query("SELECT jogadores.nome as jogador, times.id, times.nome as time, times.pais FROM jogadores INNER JOIN times ON jogadores.time = times.nome").then(
     function (ret) {
         res.json({
            numeroDeJogadores: ret.rows.length,
            jogadores: ret.rows
         });
         console.log(ret.rows);
     });
 });

 app.delete('/timedelete', function(req, res){
    client.query({
        text: "DELETE FROM times WHERE nome = $1",
        values: [req.body.nome]
    });
    console.log('Deletado com sucesso.');
});

app.listen(3000, function(){
    console.log('Funcionando...');
});

/* 
API's pra momentos futuros:
https://the-odds-api.com/
https://rapidapi.com/googlecloud/api/google-translate1/ <-- Pra quando for pedido o país traduzir em tempo real
*/