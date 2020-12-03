// JavaScript source code
const net = require("net");
const { isArray } = require("util");

var listaDeImoveis = [["IMOVEL_0", "1", "1", "1"], ["IMOVEL_1", "2", "2", "0"], ["IMOVEL_2", "3", "3", "0"]];

const connectionListener = (socket) => {

    socket.on("data", (data) => {
        //console.log("Cliente conectado");
        
        const comando = data.toString();
        //console.log(comando);

        const parametros = comando.split(" ");
        //for (i = 0; i < parametros.length; i++) {
        //    console.log(parametros[i]);
        //}

        if (parametros[0] === "CONECTAR") {
            console.clear()
            console.log("SERVIDOR: Cliente conectado");
            console.log("SERVIDOR: Qual a requisicao?");
            socket.write("REQUISICAO");

        } else if (parametros[0] === "CADASTRAR") {
            console.log("SERVIDOR: Cadastro");
            console.log("SERVIDOR: Informe o imovel a ser cadastrado");
            socket.write("INCLUIR_IMOVEL");

        } else if (parametros[0] === "INCLUIR_IMOVEL") {
            var temp = [];
            for (i = 1; i < parametros.length; i++) {
                temp.push(parametros[i])
            }
            listaDeImoveis.push(temp);
            //console.log(listaDeImoveis);
            console.log("SERVIDOR: Imovel cadastrado com sucesso: " + temp);
            socket.write("CONCLUIDO");

        } else if (parametros[0] === "LISTAR") {
            console.log("SERVIDOR: Listar Imoveis");
            console.log("SERVIDOR: Os seguintes imoveis estao disponiveis.");
            for (i = 0; i < listaDeImoveis.length; i++) {
                console.log(listaDeImoveis[i]);
            }
            
            socket.write("CONCLUIDO");
        } else if (parametros[0] === "RESERVAR") {
            verificar = false;
            console.log("SERVIDOR: Reservar imovel");
            for (i = 0; i < listaDeImoveis.length; i++) {
                if (listaDeImoveis[i][3] == '0') {
                    listaDeImoveis[i][3] = '1';
                    verificar = true;
                    console.log("SERVIDOR: Reservado com sucesso");
                    break;
                }
            }
            if (!verificar) {
                console.log("SERVIDOR: Não há imóvel disponível");
            }
            socket.write("CONCLUIDO");

        } else if (parametros[0] === "DATAS") {
            console.log("SERVIDOR: Datas disponiveis");
            for (i = 0; i < listaDeImoveis.length; i++) {
                if (listaDeImoveis[i][3] == '0') {
                    console.log(listaDeImoveis[i]);
                }
            }
            socket.write("CONCLUIDO");
        } else if (parametros[0] === "FINALIZA") {
            socket.end();
        } else {
            socket.write("COMANDO_INVALIDO");
        }
    });

    socket.on("end", () => {
        console.log("SERVIDOR: Cliente desconectado!");
    });
}

const server = net.createServer(connectionListener);

server.listen(3000, "0.0.0.0");