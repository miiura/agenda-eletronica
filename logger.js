const fs = require("fs");

class Logger {
    static log(error) {
        const now = new Date();
        const timestamp = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        const message = `[${timestamp}] - ${error}\n`;
        fs.appendFileSync("log.txt", message);
    }
}

module.exports = Logger;