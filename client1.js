// JavaScript source code
const net = require('net');
const { isBoolean, isString } = require('util');

const client = net.Socket();

const clientConnected = () => {
    //console.log("Cliente conectado");

    //console.log(isBoolean(true))
    //console.log(isString("oi"))
    console.clear()
    client.write("CONECTAR");

    client.on("data", (data) => {
        //console.log("Número aleatório: " + data.toString());
        const comando = data.toString();

        if (comando === "REQUISICAO") {
            console.log("CLIENTE: Cadastrar imovel.");
            client.write("CADASTRAR");

        } else if (comando === "INCLUIR_IMOVEL") {
            var listaEndereco = ["INCLUIR_IMOVEL IMOVEL_0 1 1 0", "INCLUIR_IMOVEL IMOVEL_1 2 2 0", "INCLUIR_IMOVEL IMOVEL_2 3 3 0"];
            const random = Math.floor(Math.random() * listaEndereco.length);
            console.log(random, listaEndereco[random]);
            client.write(listaEndereco[random]);

        } else if (comando === "CONCLUIDO") {
            client.write("FINALIZA");
        }
        else if (comando === "COMANDO_INVALIDO") {
            client.write("FINALIZA");
        }
    });
}

client.connect(3000, clientConnected)