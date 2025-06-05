const { connect } = require("./db");
const { logError } = require("./log");

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

    validarCamposObrigatorios() {
        if (!this.titulo || !this.inicio || !this.fim || !this.local || !this.criadorId) {
            throw new Error("Campos obrigatórios não preenchidos em Evento.");
        }
    }

    async inserir() {
        try {
            this.validarCamposObrigatorios();
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
            logError(error);
            throw error;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const eventos = await db.collection("eventos").find(filtro).toArray();
            client.close();
            return eventos;
        } catch (error) {
            logError(error);
            throw error;
        }
    }

    static async deletar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("eventos").deleteMany(filtro);
            client.close();
            return result;
        } catch (error) {
            logError(error);
            throw error;
        }
    }
}

module.exports = Evento;