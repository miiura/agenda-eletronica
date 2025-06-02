const { connect } = require("./db");

class Evento {
    constructor(titulo, descricao, inicio, fim, local, criadorId, cor = "#4287f5", participantes = []) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.inicio = inicio;
        this.fim = fim;
        this.local = local;
        this.criadorId = criadorId;
        this.participantes = participantes;
        this.cor = cor;
        this.recorrente = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("eventos").insertOne({
                titulo: this.titulo,
                descricao: this.descricao,
                inicio: this.inicio,
                fim: this.fim,
                local: this.local,
                criadorId: this.criadorId,
                participantes: this.participantes,
                cor: this.cor,
                recorrente: this.recorrente,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            });
            console.log("Evento inserido:", result.insertedId);
            client.close();
            return result;
        } catch (error) {
            console.log("Erro ao inserir evento:", error);
            throw error;
        }
    }
}

module.exports = Evento;