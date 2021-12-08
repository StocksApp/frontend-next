"use strict";
exports.__esModule = true;
exports.sidebarMenuLinks = exports.links = void 0;
exports.links = {
    landing: '/',
    login: '/login',
    signUp: '/sign-up',
    game: {
        base: '/game',
        browse: '/game',
        overview: function (id) { return "/game/" + id; },
        create: '/game/create',
        join: '/game/join',
        transactions: {
            create: function (id) { return "/game/" + id + "/transaction/create"; },
            browse: function (id) { return "/game/" + id + "/transaction"; },
            history: function (id) { return "/game/" + id + "/transaction/history"; },
            base: function (id) { return "/game/" + id + "/transaction"; }
        },
        wallet: {
            overview: function (id) { return "/game/" + id + "/wallet"; },
            analysis: function (id) { return "/game/" + id + "/wallet/overwiev"; },
            base: function (id) { return "/game/" + id + "/wallet"; }
        },
        strategies: {
            base: function (id) { return "/game/" + id + "/strategies"; },
            overview: function (id) { return "/game/" + id + "/strategies"; },
            offenses: function (id) { return "/game/" + id + "/strategies/offenses"; }
        }
    },
    stocks: {
        base: '/stocks',
        browse: '/stocks',
        analysis: '/stocks/analysis'
    },
    user: {
        overwiev: 'user'
    }
};
// blank means that no children string is blank
exports.sidebarMenuLinks = {
    game: {
        name: 'Gra',
        href: exports.links.game.base,
        links: [
            {
                name: 'Stwórz',
                href: exports.links.game.create
            },
            {
                name: 'Szukaj',
                href: exports.links.game.browse
            },
        ]
    },
    transactions: {
        name: 'Transakcje',
        href: exports.links.game.transactions.base,
        links: [
            {
                name: 'Stwórz',
                href: exports.links.game.transactions.create
            },
            {
                name: 'Aktywne',
                href: exports.links.game.transactions.browse
            },
            {
                name: 'Historia',
                href: exports.links.game.transactions.history
            },
        ]
    },
    wallet: {
        name: 'Portfel',
        href: exports.links.game.wallet.base,
        links: [
            {
                name: 'Przeglądaj',
                href: exports.links.game.wallet.overview
            },
            {
                name: 'Analiza',
                href: exports.links.game.wallet.analysis
            },
        ]
    },
    strategies: {
        name: 'Strategie',
        href: exports.links.game.strategies.base,
        links: [
            {
                name: 'Przeglądaj',
                href: exports.links.game.strategies.overview
            },
            {
                name: 'Wykroczenia',
                href: exports.links.game.strategies.offenses
            },
        ]
    }
};
