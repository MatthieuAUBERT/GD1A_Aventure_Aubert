import Phaser from '../lib/phaser.js'

export default class Story extends Phaser.Scene {
    constructor() {
        super('story')
    }
    preload()
	{
		this.load.image('story', 'assets/Icons/NVL.png')	
	}
    create()
	{

        this.add.image(0, 0, 'story').setOrigin(0).setDepth(0);

        this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('upside_world')
		})
	}
}