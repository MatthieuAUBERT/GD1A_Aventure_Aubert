import Phaser from './lib/phaser.js'

import Menu from './scenes/Menu.js'
import GameOver from './scenes/gameover.js'
import Upside_world from './scenes/Upside_world.js'
import Downside_world from './scenes/Downside_world.js'
import Commandes from './scenes/Commandes.js'
import Story from './scenes/Story.js'
import Forest from './scenes/Forest.js'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	scene: [Menu, Commandes, Story, GameOver, Upside_world, Downside_world, Forest],
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 0
			},
			debug: false
		}
	},
	input:{gamepad:true},
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
})
