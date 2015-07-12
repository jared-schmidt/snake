(function() {
    'use strict';

    function GameOver() {}

    GameOver.prototype = {
        init: function(score){
            this.score = score;
        },
        create: function() {
            this.add.button(0, 0, 'gameover', this.startGame, this);

            this.game.add.text(235, 350, 'LAST SCORE', {
                font: 'bold 16px sans-serif',
                fill: '#46c0f9',
                align: 'center'
            });

            this.game.add.text(350, 348, this.score.toString(), {
                font: 'bold 20px sans-serif',
                fill: '#fff',
                align: 'center'
            });
        },
        startGame: function() {
            this.state.start('game');
        }
    };
    window['snake'] = window['snake'] || {};
    window['snake'].GameOver = GameOver;
}());
