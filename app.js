const Usuario = require("./usuarios");
const Evento = require("./eventos");
const Convite = require("./convites");

async function testarInsercao() {
    try {
        // Insere usuários
        const usuario1 = new Usuario(
            "Fabrício",
            "fabricio@exemplo.com",
            "senhafabricio"
        );
        const resultUsuario1 = await usuario1.inserir();
        
        const usuario2 = new Usuario(
            "Matheus",
            "matheus@exemplo.com",
            "matheus123"
        );
        const resultUsuario2 = await usuario2.inserir();

        const usuario3 = new Usuario(
            "Leda",
            "leda@exemplo.com",
            "leda123"
        );
        const resultUsuario3 = await usuario3.inserir();

        // Evento específico
        const evento = new Evento(
            "Reunião de Projeto",
            "Discussão sobre o andamento do projeto X",
            new Date("2025-05-30T14:00:00Z"),
            new Date("2025-05-30T15:30:00Z"),
            "Sala de Reuniões 3",
            resultUsuario1.insertedId, 
            "#4287f5",
        [ 
            resultUsuario1.insertedId, 
            resultUsuario2.insertedId,
            resultUsuario3.insertedId
        ]                      

        );
        const resultEvento = await evento.inserir();

        // Cria um convite
        const convite = new Convite(
            resultEvento.insertedId,
            resultUsuario1.insertedId,
            resultUsuario2.insertedId,
            resultUsuario3.insertedId
        );
        await convite.inserir();

        console.log("Todos os dados foram inseridos com sucesso!");
    } catch (error) {
        console.error("Erro durante os testes:", error);
    }
}

async function testarUpdateUsuario() {
    try {
        const Usuario = require("./usuarios");
        // Atualiza o nome, email e senha do usuário
        const filtro = { nome: "Matheus" };
        const atualizacao = {
            nome: "Murilo",
            email: "murilo@exemplo.com",
            senha: "murilo123"
        };
        const usuario = new Usuario();
        const resultado = await usuario.atualizar(filtro, atualizacao);
        if (resultado.modifiedCount > 0) {
            console.log("Usuário atualizado com sucesso!");
        } else {
            console.log("Nenhum usuário encontrado para atualizar.");
        }
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
    }
}

async function testarLogger() {
    // Teste: Campos obrigatórios faltando
    try {
        const conviteInvalido = new Convite(null, null, null);
        await conviteInvalido.inserir();
    } catch (error) {
        console.log("Erro esperado capturado (campos obrigatórios). Veja log.txt para o registro.");
    }
}

testarInsercao();

//testarUpdateUsuario();

testarLogger();
