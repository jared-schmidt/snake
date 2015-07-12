(function() {
    'use strict';

    function Menu() {}

    Menu.prototype = {
        create: function() {
            this.add.button(0, 0, 'menu', this.startGame, this);
        },
        update: function() {

        },
        startGame: function() {
            this.game.state.start('game');
        }
    };

    window['snake'] = window['snake'] || {};
    window['snake'].Menu = Menu;
}());
