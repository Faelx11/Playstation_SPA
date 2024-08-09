import { Home } from './home.js';
import { Contato } from './contato.js';
import { GamesPage } from './games-page.js';

export class Router {
    constructor() {
        this.rotas = {
            '#home': new Home(),
            '#contato': new Contato(),
            '#games': new GamesPage(),
        };

        window.addEventListener('load', this.navegar.bind(this));
        window.addEventListener('hashchange', this.navegar.bind(this));
    }

    navegar() {
        const divConteudo = document.getElementById('conteudo');
        const hash = window.location.hash;
        const pagina = this.rotas[hash] || this.rotas['#home'];
        divConteudo.innerHTML = pagina.carregar();
        pagina.adicionarEventos && pagina.adicionarEventos();
    }
}