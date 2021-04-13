import Phaser from '../lib/phaser.js'

export default class Upside_world extends Phaser.Scene {
    constructor() {
        super('upside_world')
    }
    preload(){

        //Images Preloaders
		this.load.image('hero', 'assets/hero.png')

        this.load.image('Tileset', 'assets/TilesetVillage.png')

        this.load.tilemapTiledJSON('Map', 'assets/Map.json');

		this.cursors = this.input.keyboard.createCursorKeys()

    }
    create(){

        //Settings

        //Mapping
        let Village = this.make.tilemap({key:'Map'});

        let Terrain = Village.addTilesetImage('TilesetVillage','Tileset');

        let Background = Village.createLayer('Bottom', Terrain, 0, 0).setDepth(-2);
        let Layer1 = Village.createLayer('Bot1', Terrain, 0, 0).setDepth(-1);
        let Layer2 = Village.createLayer('Bot 2', Terrain, 0, 0);


		const spawnPoint = Village.findObject("Objects", obj => obj.name === "Spawn Point");
		this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero').setDepth(0);

        //Animations

		//Colliders

        this.physics.add.collider(this.player, Background);
        
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer1);
        
        Layer1.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer2);
        
        Layer2.setCollisionByProperty({collides:true});


		/* const debugGraphics = this.add.graphics().setAlpha(0.75);
		Background.renderDebug(debugGraphics, {
  			tileColor: null, // Color of non-colliding tiles
  			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});
		Layer1.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
	  	});
		Layer2.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
	  	}); */
        
        //Variables

        //Camera
        this.cameras.main.startFollow(this.player)
		this.cameras.main.setBounds(0,0,Village.widthInPixels, Village.heightInPixels);
        this.physics.world.setBounds(0,0, Village.widthInPixels, Village.heightInPixels);
		this.player.setCollideWorldBounds(true);

        //Manette

        this.paddleConnected=false;

		this.input.gamepad.once('connected', function (pad) {
			this.paddleConnected = true;
			paddle = pad;
			});


    }
    update(t,dt){

		const speed = 175;

        if (!this.player)
		{
			return
		}

        //KeyEvents

		this.player.setVelocity(0)
		this.player.anims.play('normal')

        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(speed);
            	//this.player.anims.play('right', true);
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-speed);
            	//this.player.anims.play('left', true);
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-speed);
            	//this.player.anims.play('up', true);
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(speed);
            	//this.player.anims.play('down', true);
        	}


		}

		else if (this.cursors.up.isDown)
		{
			this.player.setVelocityY(-speed)
			//this.player.anims.play('up', true);
		}


		else if (this.cursors.left.isDown)
		{
            this.player.setVelocityX(-speed)
			//this.player.anims.play('left', true)
		}

		else if (this.cursors.right.isDown)
		{
            this.player.setVelocityX(speed)
			//this.player.anims.play('right', true)	
		}
        else if (this.cursors.down.isDown)
		{
            this.player.setVelocityY(speed)
			//this.player.anims.play('down', true)	
		}


    }
}