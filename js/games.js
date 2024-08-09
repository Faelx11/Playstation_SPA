export class Games {
    constructor() {
        this.jogos = [];
    }

    adicionarJogo(jogo) {
        const index = document.getElementById('form-jogo').getAttribute('data-index');
        if (index !== null) {
            this.jogos[index] = jogo; // Atualiza o jogo existente
        } else {
            this.jogos.push(jogo); // Adiciona um novo jogo
        }
    }

    listarJogos() {
        return this.jogos;
    }

    removerJogo(index) {
        this.jogos.splice(index, 1);
    }
}