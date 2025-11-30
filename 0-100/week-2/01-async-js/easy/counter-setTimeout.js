class counterSTO {
  constructor() {
    this.count = 0;
    this.running = false;
  }

  start() {
    if (this.running) return;
    this.running = true;

    const tick = () => {
      setTimeout(() => {
        if (!this.running) return;
        this.count++;
        console.log(`Count: ${this.count}`);
        tick(); //recursive call
      }, 1000);

      //   tick();  //this is a sync call, won"t work
    };
    tick();
  }

  lap() {
    console.log(`Current count: ${this.count}`);
  }

  stop() {
    this.running = false;
    console.log(`Final Count: ${this.count}`);
    this.count = 0;
  }
}

let c = new counterSTO();

c.start();

setTimeout(() => {
  c.stop();
}, 10100);

module.exports = {
  counterSTO,
};
