const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
const logFile = path.join(logDir, 'erros.log');

function logError(error) {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    const logMsg = `[${new Date().toISOString()}] ${error.stack || error}\n`;
    fs.appendFileSync(logFile, logMsg);
}

module.exports = { logError };

// Teste de log de erro
if (require.main === module) {
    try {
        throw new Error("Erro de teste para log!");
    } catch (error) {
        logError(error);
        console.log("Erro registrado no arquivo de log.");
    }
}
