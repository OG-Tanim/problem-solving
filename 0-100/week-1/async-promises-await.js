// let p = new promise(function(resolve) {
//   resolve("async data")
// })

function countTill100(n) {
  let ans = 0;
  for (let i = 0; i <= n; i++) {
    ans += i;
  }
  console.log(ans);
}

function asyncWrapper(fn) {
  let r = setTimeout(function () {
    fn();
  }, 1000);
}

asyncWrapper(countTill100);

console.log("should print later");

function asyncWrapperProm() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
}

let a = asyncWrapperProm();
console.log(a);
a.then(function () {
  countTill100(100);
});

console.log("should print later");

function asyncFunciton(callback) {
  setTimeout(callback, 1000);
}

async function mainCallback() {
  asyncFunciton(function () {
    console.log("callback async funciton");
    countTill100(12);
  });
}

mainCallback();

function mainWithDotThen() {
  asyncWrapperProm().then(function () {
    console.log("Promise with .then");
    countTill100(12);
  });
}

mainWithDotThen();

async function mainAsyncAwait() {
  let value = await asyncWrapperProm();
  console.log("Promise with async-await");
  countTill100(12);
}

mainAsyncAwait();
console.log("after main");
