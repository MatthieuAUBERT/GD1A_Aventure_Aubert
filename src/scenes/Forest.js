import Phaser from '../lib/phaser.js'

export default class Forest extends Phaser.Scene {
    constructor() {
        super('forest')
    }
	preload(){

        //Images Preloaders
		this.load.image('hero', 'assets/hero.png')

		//this.load.image('border1','assets/BordureForest.png')
		//this.load.image('warp','assets/WarpToDream.png')

        this.load.image('Tileset', 'assets/TilesetVillage.png')

        this.load.tilemapTiledJSON('Forest', 'assets/Forest.json');

		this.cursors = this.input.keyboard.createCursorKeys()

		this.load.image('life', 'assets/life.png')

    }

    create(){

        this.life1 = this.add.image(10,70,'life').setScrollFactor(0).setDepth(1);
		this.life2 = this.add.image(42,70,'life').setScrollFactor(0).setDepth(1);
		this.life3 = this.add.image(74,70,'life').setScrollFactor(0).setDepth(1);

        //Mapping
        let Forest = this.make.tilemap({key:'Forest'});

        let Terrain = Forest.addTilesetImage('TilesetVillage','Tileset');

        let Background = Forest.createLayer('Bot', Terrain, 0, 0).setDepth(-3);
        let Layer1 = Forest.createLayer('Elements2', Terrain, 0, 0).setDepth(-2);
        let Layer2 = Forest.createLayer('Elements', Terrain, 0, 0).setDepth(-1);
		let Layer3 = Forest.createLayer('Elements3', Terrain, 0, 0);


		const spawnPoint = Forest.findObject("Objects", obj => obj.name === "Spawn Point");
		this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero').setDepth(1);


		/*this.forestborder = this.physics.add.staticGroup();
		this.forestborder.create(1152,16,'border1').setDepth(0);

		this.dreamborder = this.physics.add.staticGroup();
		this.dreamborder.create(127,832,'warp')*/

	
        //Animations

		//Colliders

		//this.physics.add.collider(this.player, this.forestborder, this.warpingPlayerToForest, null, this);
		//this.physics.add.collider(this.player, this.dreamborder, this.warpingPlayerToDream, null, this);

        this.physics.add.collider(this.player, Background);
        
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer1);
        
        Layer1.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer2);
        
        Layer2.setCollisionByProperty({collides:true});

		this.physics.add.collider(this.player, Layer3);
        
        Layer3.setCollisionByProperty({collides:true});


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
		this.cameras.main.setBounds(0,0,Forest.widthInPixels, Forest.heightInPixels);
		this.cameras.main.setZoom(1.5)
        this.physics.world.setBounds(0,0, Forest.widthInPixels, Forest.heightInPixels);
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
/*
	warpingPlayerToForest(){
		this.scene.start('forest')
	}
	warpingPlayerToDream(){
		this.scene.start('downside_world')
	}
*/
}