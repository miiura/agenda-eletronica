const { connect } = require("./db");
const Logger = require("./logger");

class Convite {
    constructor(eventoId, remetenteId, destinatarioId) {
        this.eventoId = eventoId;
        this.remetenteId = remetenteId;
        this.destinatarioId = destinatarioId;
        this.status = "pendente";
        this.createdAt = new Date();
    }

    validarCamposObrigatorios() {
        if (!this.eventoId || !this.remetenteId || !this.destinatarioId) {
            throw new Logger.log("Campos obrigatórios não preenchidos em Convite." + error);
        }
    }
    async inserir() {
        try {
            this.validarCamposObrigatorios();
            const { db, client } = await connect();
            const result = await db.collection("convites").insertOne({
                eventoId: this.eventoId,
                remetenteId: this.remetenteId,
                destinatarioId: this.destinatarioId,
                status: this.status,
                createdAt: this.createdAt
            });
            console.log("Convite inserido:", result.insertedId);
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao inserir convite: " + error);
            throw error;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const convites = await db.collection("convites").find(filtro).toArray();
            client.close();
            return convites;
        } catch (error) {
            Logger.log("Erro ao buscar convites: " + error);
            throw error;
        }
    }

    static async deletar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("convites").deleteMany(filtro);
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao deletar convites: " + error);
            throw error;
        }
    }

    async atualizar(filtro, atualizacao) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("convites").updateMany(filtro, { $set: atualizacao });
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao atualizar convites: " + error);
            throw error;
        }
    }
}
module.exports = Convite;