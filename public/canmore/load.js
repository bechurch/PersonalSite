var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('backgroundImage', 'canmore/assets/parallax.png');
        this.game.load.image('bird', 'canmore/assets/car.png');
        this.game.load.image('pipe', 'canmore/assets/canmore.png');
        this.game.load.image('sign', 'canmore/assets/banff.png');
        this.game.load.audio('fthat', 'canmore/assets/fthat.wav');
        this.game.load.audio('eww', 'canmore/assets/eww.wav');
        this.game.load.audio('nope', 'canmore/assets/nope.wav');
        this.game.load.audio('gross', 'canmore/assets/gross.wav');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};