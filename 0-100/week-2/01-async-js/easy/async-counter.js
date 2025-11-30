class AsyncCounter {
  constructor() {
    this.count = 0;
    this.running = false;
    this.intervalId = null;
  }
  start() {
    if (this.running) return;

    this.running = true;
    // while (this.running) {
    //   setTimeout(function () {
    //     this.count++;
    //   }, 1000);
    // }

    this.intervalId = setInterval(() => {
      this.count++;
      console.log(`Count : ${this.count}`);
    }, 1000);
  }
  lap() {
    console.log(`Lap: ${this.count}`);
  }
  stop() {
    if (this.intervalId) {
      this.running = false;
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log(`Final Count: ${this.count}`);
    this.count = 0;
  }
}

let c = new AsyncCounter();
c.start();

// for (let i = 0; i < 15; i++) {
//   setTimeout(() => {
//     c.lap();
//   }, 2000);
// }

setTimeout(() => {
  c.stop();
}, 5000);

module.exports = { AsyncCounter };
