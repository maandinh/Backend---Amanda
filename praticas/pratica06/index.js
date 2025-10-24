const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
    console.log("1 - Adicionar tarefa");
    console.log("2 - Buscar tarefa");
    console.log("3 - Atualizar tarefa");
    console.log("4 - Remover tarefa");
    console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
    if (opcao === "1") {
        const nome = readline.question("Nome da tarefa: ");
        await controlador.adicionarTarefa(nome);
    } else if (opcao === "2") {
        const nome = readline.question("Nome da tarefa: ");
        const tarefa = await controlador.buscarTarefa(nome);
        console.log(tarefa);
    } else if (opcao === "3") {
        const nome = readline.question("Nome da tarefa: ");
        const concluida = readline.question("Concluida? (true/false): ") === "true";
        await controlador.atualizarTarefa(nome, concluida);
    } else if (opcao === "4") {
        const nome = readline.question("Nome da tarefa: ");
        await controlador.removerTarefa(nome);
    } else if (opcao === "5") {
        process.exit();
    }
}

async function main() {
    while (true) {
        menu();
        const opcao = readline.question("Escolha uma opcao: ");
        await escolherOpcao(opcao);
    }
}

main();
