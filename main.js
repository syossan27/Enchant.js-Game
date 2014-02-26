enchant();

window.onload = function() {

	// コアの設定
	var core = new Core(720, 450);
	core.fps = 30;							// FPS設定
	core.preload('chara1.png'); // 画像事前読み込み

	// コア内容
	core.onload = function() {
		// 仮想パッドオブジェクトの生成
		var pad = new Pad();
		// pad.xとpad.yでも表示させる位置を変更できるが、
		// 両方指定する場合はmoveToメソッドの方が楽
		// パッドの画像サイズが100x100pxで、左下に表示したい場合は次のようになる
		pad.moveTo(0, core.rootScene.height - 200);
		core.rootScene.addChild(pad);

		var spliteFrequency = 3; // スプライト描画頻度
		var y_iv = -20; // y軸への初期加速度

		// クマさんの設定
		var Bear = Class.create(Sprite, {
			initialize: function(x,y) {
										Sprite.call(this, 32, 32);
										this.x = x;
										this.y = y;
										this.vy = 0;
										this.jumping = false;
										this.frame = 0;
										this.image = core.assets['chara1.png'];
										this.addEventListener('enterframe', function(){

											if ( core.input.left ){
												this.x -= 5;
												this.frame = this.age % spliteFrequency;
												this.tl.scaleTo(-1,1,0);
												if ( core.input.up && !this.jumping ){
													this.vy =	y_iv;
													this.jumping = true;
												} 
											} else if ( core.input.right ){
												this.x += 5;
												this.frame = this.age % spliteFrequency;
												this.tl.scaleTo(1,1,0);
												if ( core.input.up && !this.jumping ){
													this.vy =	y_iv;
													this.jumping = true;
												} 
											} else if ( core.input.up && !this.jumping ){
												this.vy =	y_iv;
												this.jumping = true;
											} else {
												this.frame = 0;
											}

											if ( this.jumping == true ){
												this.vy += 1;	
												this.y += this.vy;

												if ( this.y >= 418 ){
													this.y = 418;
													this.jumping = false;
												}
											}

										});

										core.rootScene.addChild(this);
									}
		});

			var bear = new Bear(0, 418);

	}

	core.start();

};

function rand(n) {
	return Math.floor(Math.random() * (n+1));
}
