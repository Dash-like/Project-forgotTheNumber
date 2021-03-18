class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].y;
        x = allPlayers[plr].x;

        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)
player.health = allPlayers[plr].health;
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }else{

        
        for(var i = 0; i < player.bulletsArr.length; i ++){
          if(player.bulletsArr[i].isTouching(cars[index-1])){
            var health = allPlayers[plr].health-5;
            player.updateEnemyHealth(index, health);
            player.bulletsArr[i].destroy();
          }
          }}
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
   //87 = W
   //65 = A
   //83 = S
   //68 = D
      if(keyIsDown(87)){
        player.makeBullets(0, -5);
      }
      if(keyIsDown(65)){
        player.makeBullets(-5, 0);
      }
      if(keyIsDown(83)){
        player.makeBullets(0, 5);
      }
      if(keyIsDown(68)){
        player.makeBullets(5, 0);
      }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.x +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.x -=10
      player.update();
    }

    if(player.distance > 3860|| player.health <=0 ){
      gameState = 2;
      player.rank = carsAtEnd+1;
Player.updateCarsAtEnd(player.rank);
      player.update();
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        if(allPlayers[plr].rank!= 0){
          var ele = createElement("h3");
          //var display_position = 100;
          ele.position(displayWidth/2, allPlayers[plr].rank*30);
          ele.html(allPlayers[plr].name+": "+ allPlayers[plr].rank)
        
        
        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y =allPlayers[plr].y;
        x =allPlayers[plr].x;

        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          ele.style("color", "yellow")
        }else{
          ele.style("color", "black")
        }
      }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    drawSprites();
  }
}
