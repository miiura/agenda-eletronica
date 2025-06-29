const { connect } = require("./db");
const Logger = require("./logger");

class Usuario {
    constructor(nome, email, senha, avatar = "") {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.avatar = avatar;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    validarCamposObrigatorios() {
        if (!this.nome || !this.email || !this.senha) {
            throw new Error("Campos obrigatórios não preenchidos em Usuario.");
        }
    }

    async inserir() {
        try {
            this.validarCamposObrigatorios();
            const { db, client } = await connect();
            const result = await db.collection("usuarios").insertOne({
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                avatar: this.avatar,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            });
            console.log("Usuário inserido:", result.insertedId);
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao inserir usuário" + error);
            throw error;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const usuarios = await db.collection("usuarios").find(filtro).toArray();
            client.close();
            return usuarios;
        } catch (error) {
            Logger.log("Erro ao buscar usuários: " + error);
            throw error;
        }
    }

    static async deletar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").deleteMany(filtro);
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao deletar usuários: " + error);
            throw error;
        }
    }

    async atualizar(filtro, atualizacao) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").updateMany(filtro, { $set: atualizacao });
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao atualizar usuários: " + error);
            throw error;
        }
    }
}

module.exports = Usuario;