class Player {
  constructor(){
    this.index = null;
    this.y = 0;
    this.x = 0;
    this.bullets = 100;
    this.name = null;
    this.score = 0;
    this.bulletsArr = [];
    this.health = 200;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      y:this.y,
      x:this.x,
     health:this.health,
      score: this.score
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
   getCarsAtEnd(){
     var cr = database.ref('carsAtEnd');
     cr.on("value",(data)=>{
       carsAtEnd = data.val();
     })
   }
   static updateCarsAtEnd(rank){
     database.ref("/").update({
       carsAtEnd: rank
     });
   }
   makeBullets(x, y){
     if(frameCount%5 === 0 && this.bullets>0){
      var bullet = createSprite(0, 0, 5, 5);
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.lifetime = displayHeight;
      bullet.velocityY = y;
      bullet.velocityX = x;
      bullet.shapeColor = "white";
      this.bulletsArr.push(bullet);
      this.bullets--;
     }
     
     
   }
   updateEnemyHealth(index, health){
var playerIndex = "players/player"+ index;
database.ref(playerIndex).update({
  health:health
})



   }
}
