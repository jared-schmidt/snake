(function() {
    'use strict';

    var snake, apple, squareSize, score, speed,
        updateDelay, direction, newDirection,
        addNew, cursors, scoreTextValue, speedTextValue,
        textStyleKey, textStyleValue;

    function Game() {}

    Game.prototype = {
        create: function() {
            snake = [];
            apple = {};
            squareSize = 15;
            score = 0;
            speed = 0;
            updateDelay = 0;
            direction = 'right';
            newDirection = null;
            addNew = false;

            cursors = this.game.input.keyboard.createCursorKeys();

            this.game.stage.backgroundColor = '#061f27';

            for (var i = 0; i < 10; i++) {
                snake[i] = this.game.add.sprite(150 + i * squareSize, 150, 'snake');
            }

            this.generateApple();

            textStyleKey = {
                font: 'bold 14px snas-serif',
                fill: '#46c0f9',
                align: 'center'
            };

            textStyleValue = {
                font: 'bold 18px sans-serif',
                fill: '#fff',
                align: 'center'
            };

            this.game.add.text(30, 20, 'SCORE', textStyleKey);
            scoreTextValue = this.game.add.text(90, 18, score.toString(), textStyleValue);

            this.game.add.text(500, 20, 'SPEED', textStyleKey);
            speedTextValue = this.game.add.text(558, 18, speed.toString(), textStyleValue);
        },
        update: function() {
            if (cursors.right.isDown && direction !== 'left') {
                newDirection = 'right';
            } else if (cursors.left.isDown && direction !== 'right') {
                newDirection = 'left';
            } else if (cursors.up.isDown && direction !== 'down') {
                newDirection = 'up';
            } else if (cursors.down.isDown && direction !== 'up') {
                newDirection = 'down';
            }

            speed = Math.min(10, Math.floor(score / 5));

            speedTextValue.text = '' + speed;

            updateDelay++;

            if (updateDelay % (10 - speed) === 0) {
                var firstCell = snake[snake.length - 1],
                    lastCell = snake.shift(),
                    oldLastCellx = lastCell.x,
                    oldLastCelly = lastCell.y;

                if (newDirection) {
                    direction = newDirection;
                    newDirection = null;
                }

                if (direction === 'right') {
                    lastCell.x = firstCell.x + 15;
                    lastCell.y = firstCell.y;
                } else if (direction === 'left') {
                    lastCell.x = firstCell.x - 15;
                    lastCell.y = firstCell.y;
                } else if (direction === 'up') {
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y - 15;
                } else if (direction === 'down') {
                    lastCell.x = firstCell.x;
                    lastCell.y = firstCell.y + 15;
                }

                snake.push(lastCell);
                firstCell = lastCell;

                if (addNew) {
                    snake.unshift(this.game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                    addNew = false;
                }

                this.appleCollision();

                this.selfCollision(firstCell);

                this.wallCollision(firstCell);
            }
        },
        appleCollision: function() {
            for (var i = 0; i < snake.length; i++) {
                if (snake[i].x === apple.x && snake[i].y === apple.y) {
                    addNew = true;

                    apple.destroy();
                    this.generateApple();
                    score++;
                    scoreTextValue.text = score.toString();
                }
            }
        },
        selfCollision: function(head) {
            for (var i = 0; i < snake.length - 1; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    this.game.state.start('gameOver', true, false, score);
                }
            }
        },
        wallCollision: function(head) {
            if (head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0) {
                this.game.state.start('gameOver', true, false, score);
            }
        },
        generateApple: function() {
            var randomX = Math.floor(Math.random() * 40) * squareSize,
                randomY = Math.floor(Math.random() * 30) * squareSize;

            apple = this.game.add.sprite(randomX, randomY, 'apple');
        }
    };

    window['snake'] = window['snake'] || {};
    window['snake'].Game = Game;
}());
