(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();

      this.ready = true;
    },
    loadResources: function () {
      // load your assets here
      this.game.load.image('menu', './assets/images/menu.png');
      this.game.load.image('gameover', './assets/images/gameover.png');
      this.game.load.image('snake', './assets/images/snake.png');
      this.game.load.image('apple', './assets/images/apple.png');
    },
    create: function () {

    },
    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },
    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['snake'] = window['snake'] || {};
  window['snake'].Preloader = Preloader;
}());
