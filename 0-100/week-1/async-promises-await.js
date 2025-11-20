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
//Wrapper around an async funciton
function asyncWrapper(fn) {
  let r = setTimeout(function () {
    fn();
  }, 1000);
}

asyncWrapper(countTill100);

console.log("should print later");

//AsyncWrapper with Promises
function asyncWrapperProm() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(100), 2000);
  });
}

let a = asyncWrapperProm();
console.log(a);
a.then(function () {
  //Whatever the Promise is resolving with gets passing down to .then() callback as data or can be used the as data directly by storing it in a vairable in async await
  countTill100();
});

console.log("should print later");

// HERE, in the callback we are having to passing callback funciton in the asyncwrapper funciton
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
  asyncWrapperProm().then(function (data) {
    console.log("Promise with .then");
    countTill100(data); // Using the data Promise resolved with in the asyncWrapperProm() as "data" variable to pass it the .then(callback)
  });
}

mainWithDotThen();

async function mainAsyncAwait() {
  let value = await asyncWrapperProm();
  console.log("Promise with async-await");
  countTill100(value);
}

mainAsyncAwait();
console.log("after main");
