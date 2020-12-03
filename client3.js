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
            client.write("RESERVAR");

        } else if (comando === "CONCLUIDO") {
            client.write("FINALIZA");
        }
        else if (comando === "COMANDO_INVALIDO") {
            client.write("FINALIZA");
        }
    });
}

client.connect(3000, clientConnected)