import Phaser from '../lib/phaser.js'

export default class Forest extends Phaser.Scene {
    constructor() {
        super('forest')
    }
    preload(){

        //Images Preloaders


    }
    create(){

        //Settings

        //Mapping

        //Colliders

        //Animations
        
        //Variables

        //Camera
        this.cameras.main.startFollow(this.player)

        //Manette

        this.paddleConnected=false;

		this.input.gamepad.once('connected', function (pad) {
			this.paddleConnected = true;
			paddle = pad;
			});


    }
    update(t,dt){

        if (!this.player)
		{
			return
		}

        //KeyEvents

        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(160);
            	this.player.anims.play('right', true);
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-160);
            	this.player.anims.play('left', true);
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-160);
            	//this.player.anims.play('up', true);
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(160);
            	//this.player.anims.play('down', true);
        	}


		}

		else if (this.cursors.up.isDown)
		{
			this.player.setVelocityY(-160)
			//this.player.anims.play('up', true);
		}


		else if (this.cursors.left.isDown)
		{
            this.player.setVelocityX(-160)
			this.player.anims.play('left', true)
		}

		else if (this.cursors.right.isDown)
		{
            this.player.setVelocityX(160)
			this.player.anims.play('right', true)	
		}
        else if (this.cursors.down.isDown)
		{
            this.player.setVelocityY(160)
			//this.player.anims.play('down', true)	
		}

		else
		{
			this.player.setVelocityX(0)
			this.player.anims.play('normal')
			
		}
    }
}