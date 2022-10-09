'use strict';
const conexao = require('../database/conection');

exports.list = async (req, res, callback) => {
	try {
		const findAll = "MATCH (s :Usuario)-[r : Pertence]->(c :Apontamento) RETURN c,s"
		let result = await conexao.run(findAll,{});

        
		result = result.records.map(el => ({
            ...el.get(0).properties,
            ...el.get(1).properties,
			id: el.get(0).identity.low
		}));
        console.log(result)
		callback(null, 200, result);
	} catch (e) {
		console.log(e)
		callback({
			errorMessage: 'Falha desconhecida ao tentar listar usuários'
		}, 500);
	}
};

exports.insert = async (req, res, callback) => {
    try {
        const { id_usuario, dataEntrada, dataSaida } = req.body;
        const insert = `CREATE (a:Apontamento { id_usuario: "${id_usuario}", dataEntrada: "${dataEntrada}", dataSaida: "${dataSaida}"})`
        await conexao.run(insert,{});
        const relacao = `MATCH (u :Usuario),(a :Apontamento)
        WHERE ID(u) = ${id_usuario} and a.id_usuario = '${id_usuario}'
        CREATE (u)-[r : Pertence]->(a)
        RETURN u, a`
        let result = await conexao.run(relacao,{});
        callback(null, 200, result)
    } catch (e) {
        console.log(e)
		callback({
			errorMessage: 'Falha desconhecida ao tentar adicionar usuários'
		}, 500);
    }
};

exports.delete = async (req, res, callback) => {

    try {
        const { id } = req.params;
        const removeRelacionamento = `MATCH (s :Usuario)-[r :Pertence]->(c :Apontamento)
        WHERE ID(c) = ${id}
        DELETE r
        RETURN s, c`
        await conexao.run(removeRelacionamento,{});

        const remove = `MATCH (a:Apontamento) WHERE ID(a) = ${id} DELETE a`
        let result = await conexao.run(remove,{});
        callback(null, 200, result)
    } catch (e) {
        console.log(e)
		callback({
			errorMessage: 'Falha desconhecida ao tentar deletar usuários'
		}, 500);
    }
};

exports.update = async (req, res, callback) => {
    try {
        const { id_usuario, dataEntrada, dataSaida, id } = req.body;
        const update =  `MATCH (a:Apontamento) WHERE ID(a) = ${id} 
            SET  a.id_usuario = "${id_usuario}",
            a.dataEntrada = "${dataEntrada}",
            a.dataSaida = "${dataSaida}"
            RETURN a:Apontamento
        `
        let result = await conexao.run(update,{});
        callback(null, 200, result)
    } catch (e) {
        console.log(e)
		callback({
			errorMessage: 'Falha desconhecida ao tentar atualizar usuários'
		}, 500);
    }
};