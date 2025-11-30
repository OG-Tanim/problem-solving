class AsyncCounter {
  constructor() {
    this.count = 0;
    this.running = false;
    this.intervalId = null;
  }
  start(format = 24) {
    if (this.running) return;

    const now = new Date();

    this.count =
      now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();

    this.running = true;

    this.intervalId = setInterval(() => {
      this.count++;

      let hours = String(Math.floor(this.count / 3600) % 24).padStart(2, "0");

      let minutes = String(Math.floor((this.count % 3600) / 60)).padStart(
        2,
        "0"
      );

      let seconds = String(this.count % 60).padStart(2, "0");

      if (format === 24) {
        console.log(`Time: ${hours}:${minutes}:${seconds}`);
      } else {
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? "PM" : "AM";
        const displayHour =
          hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
        console.log(
          `Time: ${String(displayHour).padStart(
            2,
            "0"
          )}:${minutes}:${seconds} ${period}`
        );
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      this.running = false;
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    // console.log(`Final Count: ${this.count}`);
    this.count = 0;
  }
}

let clock = new AsyncCounter();

clock.start(12);

setTimeout(() => {
  clock.stop();
  console.log("clock stopped");
}, 10500);
