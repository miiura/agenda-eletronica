const { connect } = require("./db");

class Usuario {
    constructor(nome, email, senha, avatar = "") {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.avatar = avatar;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    async inserir() {
        try {
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
            console.log("Erro ao inserir usuário:", error);
            throw error;
        }
    }
}

module.exports = Usuario;