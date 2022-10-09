'use strict';
const conexao = require('../database/conection');

exports.list = async (req, res, callback) => {
	try {
		const findAll = "MATCH (n:Usuario) return n"
		let result = await conexao.run(findAll,{});

		result = result.records.map(el => ({
			...el.get(0).properties,
			id: el.get(0).identity.low
		}));

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
        const { nome, email, senha, cargo, salario, setor } = req.body;
        const insert = `CREATE (n:Usuario { nome: "${nome}", email: "${email}", senha: "${senha}", cargo: "${cargo}", salario: "${salario}", setor: "${setor}" })`
        let result = await conexao.run(insert,{});
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
        const remove = `MATCH (n:Usuario) WHERE ID(n) = ${id} DELETE n`
        let result = await conexao.run(remove,{});
        callback(null, 200, result)
    } catch (e) {
        console.log(e)
		callback({
			errorMessage: e ? e : 'Falha desconhecida ao tentar deletar usuários'
		}, 500);
    }
};

exports.update = async (req, res, callback) => {
    try {
        const { nome, email, senha, cargo, salario, setor, id } = req.body;
        const update =  `MATCH (n:Usuario) WHERE ID(n) = ${id} 
            SET  n.nome = "${nome}",
            n.email = "${email}", n.senha = "${senha}", 
            n.cargo = "${cargo}",
            n.salario = "${salario}",
            n.setor = "${setor}"
            RETURN n:Usuario
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