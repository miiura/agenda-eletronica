const { connect } = require("./db");

class Convite {
    constructor(eventoId, remetenteId, destinatarioId) {
        this.eventoId = eventoId;
        this.remetenteId = remetenteId;
        this.destinatarioId = destinatarioId;
        this.status = "pendente";
        this.createdAt = new Date();
    }

    async inserir() {
        try {
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
            console.log("Erro ao inserir convite:", error);
            throw error;
        }
    }
}

module.exports = Convite;