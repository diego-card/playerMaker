$(document).ready(function() {
    function apiJogadores(){
        let exportarJogadores;
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/jogadores',
            success: function (dados) {
                exportarJogadores = dados.jogadores;
            },
            error: function (erro) {
                console.log(erro);
            },
            async: false,
            dataType: 'JSON'
        });
        return exportarJogadores
    };

    //Pesquisa o nome do jogador
    $('#botaoPesquisar').click(function(){
            //$('#resultadoDeBusca').text('');
            $('#resultadoDeBusca').text(`Resultados contendo: "${$('#mostrarNome').val()}"`)
            for(jogador of apiJogadores()){
                if(jogador.nome == $('#mostrarNome').val()){
                    $('#resultadoDeBusca').append(`<br> ID: ${jogador.id} - ${jogador.nome} ${apiCountries(jogador.pais).flag} joga pelo(a) ${jogador.time}.`);
                };
            }
            if(jogador.nome != $('#mostrarNome').val()) {
                $('#resultadoDeBusca').append(`<br> Nenhum resultado encontrado.`);
            };
        }
    );
        

    //Mostra informação completa dos jogadores
    $('#botaoInformacoes').click(function(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/jogadores',
            success: function (dados) {
                let players = dados.jogadores;
                for(jogador of players){
                    if(jogador.id == $('#idID').val()){
                        $('#resultadoInformacoes').append(`${jogador.nome}, atua pelo(a) ${jogador.time}, nasceu no(a) ${jogador.pais} ${apiCountries(jogador.pais).flag} Capital: ${apiCountries(jogador.pais).capital[0]}. Tem overall de: ${jogador.notageral}. Salário de: $${jogador.salario}.<br>`)
                    };
                };
            },
            error: function (erro) {
                console.log(erro);
            },
            dataType: 'JSON'
        });
    });

    //API dos países
        function apiCountries(paisDoJo){
        let paises;
        $.ajax({
            type: 'GET',
            url: `https://restcountries.com/v3.1/name/${paisDoJo}`,
            success: function (dados) {
                paises = dados[0];
            },
            error: function (erro) {
                console.log(erro);
            },
            async: false,
            dataType: 'JSON'
        });
        return paises
    }
   // });

   //Cria os jogadores
    $('#botaoCriar').click(function(){
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/jogador',
            data: JSON.stringify({
                nome: $('#idNome').val(),
                pais: $('#idPais').val(),
                notaGeral: $('#idNotaGeral').val(),
                time: $('#idTime').val(),
                salario: $('#idSalario').val()
            }),
            contentType: 'application/json',
            success: function(dados){
                console.log(dados);

            },
            error: function (erro) {
                console.log(erro);
            },
            dataType: 'JSON'
        });
        $('span.sucesso').filter('[name="primeiro"]').show();
        $('span.sucesso').filter('[name="primeiro"]').fadeOut(2000);
    });

    //Deleta os jogadores
    $('#botaoDeletar').click(function(){
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/jogadordelete',
            data: JSON.stringify({
                id: $('#idDeletar').val()
            }),
            contentType: 'application/json',
            success: function(dados){
                console.log(dados)
            },
            dataType: 'json'
        });
        $('span.deletado').filter('[name="primeiro"]').show();
        $('span.deletado').filter('[name="primeiro"]').fadeOut(2000);
    });

    //Cria o time
    $('#botaoTimeCriar').click(function(){
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/time',
            data: JSON.stringify({
               nome: $('#idTimeNome').val(),
               pais: $('#idTimePais').val(),
               liga: $('#idTimeLiga').val() 
            }),
            contentType: 'application/json',
            success: function(dados){
                console.log(dados);

            },
            error: function (erro) {
                console.log(erro);
            },
            dataType: 'JSON'
        });
        $('span.sucesso').filter('[name="segundo"]').show();
        $('span.sucesso').filter('[name="segundo"]').fadeOut(2000);
    });

    function apiTodosTimes() {
        let todostimes;
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/todostimes',
            success: function (dados){
                //console.log(dados.times);
                todostimes = dados.times;
        },
            error: function (erro){
                console.log(erro);
        },
            async: false,
            dataType: 'JSON'
        });
        return todostimes;
    };

    //Pesquisa o time do jogador
    $('#botaoTimePesquisar').click(function(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/jogadortime',
            success: function (dados){
                let players = dados.jogadores;
                for (equipe of apiTodosTimes()) {
                    //console.log(equipe);
                    if(equipe.nome == $('#TimeNome').val()){
                        $('#resultadoTimes').text(`Jogadores que atuam pelo(a): ${$('#TimeNome').val()} ${apiCountries(equipe.pais).flag}`);
                    }
                };
                if(equipe.nome != $('#TimeNome').val()) {
                    $('#resultadoTimes').text(`Nenhum resultado encontrado.`);
                };
                for (player of players) {
                    //console.log(player)
                    if(player.time == $('#TimeNome').val()){
                        $('#resultadoTimes').append(`<br>- ${player.jogador}`);
                    };
                };
               
            },
            error: function (erro) {
                console.log(erro);
            },
            dataType: 'JSON'
        });
    });

    //Deleta o time
    $('#botaoTimeDeletar').click(function(){
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/timedelete',
            data: JSON.stringify({
                nome: $('#idTimeDeletar').val()
            }),
            contentType: 'application/json',
            success: function(dados){
                console.log(dados)
            },
            dataType: 'json'
        });
        $('span.deletado').filter('[name="segundo"]').show();
        $('span.deletado').filter('[name="segundo"]').fadeOut(2000);
    });

});