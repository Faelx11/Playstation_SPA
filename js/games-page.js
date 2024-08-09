import { Games } from './games.js';

export class GamesPage {
    constructor() {
        this.games = new Games();
    }

    carregar() {
        return `
            <div style="background-color: #ffffff; padding: 2rem; border-radius: 10px;">
                <h1>Gerenciar Jogos</h1>
                <form id="form-jogo">
                    <input type="text" id="nome-jogo" placeholder="Nome do Jogo" required>
                    <input type="text" id="descricao-jogo" placeholder="Descrição" required>
                    <button type="submit">Adicionar Jogo</button>
                </form>
                <ul id="lista-jogos"></ul>
            </div>
        `;
    }

    adicionarEventos() {
        document.getElementById('form-jogo').addEventListener('submit', (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome-jogo').value;
            const descricao = document.getElementById('descricao-jogo').value;
            this.games.adicionarJogo({ nome, descricao });
            this.atualizarLista();
            document.getElementById('form-jogo').reset();
            document.getElementById('form-jogo').removeAttribute('data-index');
        });

        this.atualizarLista();
    }

    atualizarLista() {
        const lista = document.getElementById('lista-jogos');
        lista.innerHTML = '';
        const jogos = this.games.listarJogos();
        jogos.forEach((jogo, index) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <span class="nome-jogo">${jogo.nome}</span>
                <span class="descricao-jogo">${jogo.descricao}</span>
                <div>
                    <button data-index="${index}" class="editar-jogo">Editar</button>
                    <button data-index="${index}" class="remover-jogo">Remover</button>
                </div>
            `;
            lista.appendChild(item);
        });

        lista.querySelectorAll('.remover-jogo').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                this.games.removerJogo(index);
                this.atualizarLista();
            });
        });

        lista.querySelectorAll('.editar-jogo').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                this.editarJogo(index);
            });
        });
    }

    editarJogo(index) {
        const jogo = this.games.listarJogos()[index];
        document.getElementById('nome-jogo').value = jogo.nome;
        document.getElementById('descricao-jogo').value = jogo.descricao;
        document.getElementById('form-jogo').setAttribute('data-index', index);
    }
}