class controller {
  strobe = 0;
  lastValue = 0;
  constructor() {
    document.addEventListener("keydown", this.keyManager.bind(this));
    document.addEventListener("keyup", this.keyManager.bind(this));
  }

  keys = {
    a: false,
    b: false,
    select: false,
    start: false,
    up: false,
    down: false,
    left: false,
    right: false,
  };

  keyManager(e) {
    var value;
    value = e.type === "keydown";

    switch (e.keyCode) {
      case 81: //Q A
        this.keys.a = value;
        break;
      case 87: //W B
        this.keys.b = value;

        break;
      case 69: //E select
        this.keys.select = value;

        break;
      case 82: //R start
        this.keys.start = value;

        break;
      case 38: //38 up
        this.keys.up = value;

        break;
      case 39: //39 right
        this.keys.right = value;

        break;
      case 37: // 37 left
        this.keys.left = value;

        break;
      case 40: //40 down
        this.keys.down = value;

        break;
      default:
        break;
    }
  }
  get CTRL1() {
    if (this.strobe === 1) {
      return this.keys.a;
    } else if (this.lastValue <= 7) {
      var key = Object.keys(this.keys)[this.lastValue];

      this.lastValue++;

      return this.keys[key];
    } else {
      console.log("legge");
      return 1;
    }
  }
  set CTRL1(value) {
    this.strobe = value;
    this.lastValue = 0;
  }
}

export default new controller();
