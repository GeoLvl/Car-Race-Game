class Game {
  constructor() {
    this.currentTime = 0;
    this.car = null;
    this.obstaclesArr = [];
  }
  startGame() {
    this.car = new Car();
    this.car.create();
    this.addEventListeners();

    setInterval(() => {
      // update timer
      this.currentTime++;

      // update obstacle position
      this.obstaclesArr.forEach((obstacle) => {
        obstacle.moveDown();
        obstacle.draw();
      });
      // collision detection
      this.obstaclesArr.forEach((obstacle) => {
        if (obstacle.y === 100) {
          if (
            this.car.x < obstacle.x + obstacle.width &&
            this.car.x + this.car.width > obstacle.x
          ) {
            alert("game over");
          } else if (obstacle.y > 100) {
            obstacle.remove(); //remove from dom
            this.obstaclesArr.shift(); // remove from array
          }
        }
      });

      // create new obstacles
      if (this.currentTime % 6 === 0) {
        const newObstacle = new Obstacle();
        newObstacle.create();
        newObstacle.draw();
        this.obstaclesArr.push(newObstacle);
      }
    }, 100);
  }
  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.car.moveLeft();
        // console.log(this.car);
        this.car.draw();
      } else if (event.key === "ArrowRight") {
        this.car.moveRight();
        // console.log(this.car);
        this.car.draw();
      }
    });
  }
}

class Thing {
  constructor() {
    // this.className = className;
    // this.x = 50;
    // this.y = 100;
    // this.width = 10;
    // this.height = 15;
    this.domElm = null;
  }
  create() {
    //   create element
    this.domElm = document.createElement("div");
    this.domElm.className = this.className;
    //   append to dom
    const gameElm = document.getElementById("game");
    gameElm.appendChild(this.domElm);
  }
  remove() {
    const gameElm = document.getElementById("game");
    gameElm.removeChild(this.domElm);
  }
  draw() {
    this.domElm.style.width = this.width + "%";
    this.domElm.style.height = this.height + "%";
    this.domElm.style.left = this.x + "%";
    this.domElm.style.top = this.y + "%";
    // this.domElm.innerHTML = "Car";
  }
}

class Car extends Thing {
  constructor() {
    super();
    this.x = 50;
    this.y = 100;
    this.width = 10;
    this.height = 15;
    this.className = "car";
  }
  moveLeft() {
    // console.log("move left");
    this.x -= 2;
  }
  moveRight() {
    // console.log("move right");
    this.x += 2;
  }
}

class Obstacle extends Thing {
  constructor() {
    super();
    this.width = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    this.height = 5;
    this.x = Math.floor(Math.random() * (100 - this.width + 1));
    this.y = 0;
    this.className = "obstacle";
  }
  moveDown() {
    this.y = this.y + 5;
  }
}
