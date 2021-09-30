class Game {
  constructor() {
    this.currentTime = 0;
    this.car = null;
  }
  startGame() {
    this.car = new Car();
    this.car.create();
    this.addEventListeners();
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

class Car {
  constructor() {
    this.x = 50;
    this.y = 100;
    this.width = 10;
    this.height = 15;
    this.domElm = null;
  }

  moveLeft() {
    // console.log("move left");
    this.x--;
  }
  moveRight() {
    // console.log("move right");
    this.x++;
  }
  create() {
    //   create element
    this.domElm = document.createElement("div");
    this.domElm.className = "car";
    //   append to dom
    const gameElm = document.getElementById("game");
    gameElm.appendChild(this.domElm);
  }
  draw() {
    this.domElm.style.width = this.width + "%";
    this.domElm.style.height = this.height + "%";
    this.domElm.style.left = this.x + "%";
    this.domElm.style.top = this.y + "%";
    // this.domElm.innerHTML = "Car";
  }
}
