const { connect } = require("./db");
const { logError } = require("./log");

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
            throw new Error("Campos obrigatórios não preenchidos em Convite.");
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
            logError(error);
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
            logError(error);
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
            logError(error);
            throw error;
        }
    }
}

// Testes de robustez para Convite
if (require.main === module) {
    (async () => {
        // Teste 1: Inserção válida
        try {
            const convite = new Convite("evento123", "remetente123", "destinatario123");
            await convite.inserir();
            console.log("Teste 1 (inserção válida) passou!");
        } catch (e) {
            console.error("Teste 1 falhou:", e.message);
        }

        // Teste 2: Inserção inválida (faltando campo obrigatório)
        try {
            const conviteInvalido = new Convite(null, "remetente123", "destinatario123");
            await conviteInvalido.inserir();
            console.error("Teste 2 falhou: deveria lançar erro de campo obrigatório!");
        } catch (e) {
            console.log("Teste 2 (validação de campos obrigatórios) passou!");
        }

        // Teste 3: Buscar convites
        try {
            const convites = await Convite.buscar({ remetenteId: "remetente123" });
            console.log("Teste 3 (buscar) retornou:", convites.length, "convite(s)");
        } catch (e) {
            console.error("Teste 3 falhou:", e.message);
        }

        // Teste 4: Deletar convites
        try {
            const result = await Convite.deletar({ remetenteId: "remetente123" });
            console.log("Teste 4 (deletar) removeu:", result.deletedCount, "convite(s)");
        } catch (e) {
            console.error("Teste 4 falhou:", e.message);
        }
    })();
}

module.exports = Convite;