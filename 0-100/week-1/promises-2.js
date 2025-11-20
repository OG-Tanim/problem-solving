function setTimeoutPromisified(delay) {
  return new Promise((res, rej) => setTimeout(res, delay));
}

console.log(setTimeoutPromisified());

setTimeoutPromisified(3000).then(function () {
  console.log("5s have passed");
  console.log(a);
});
console.log("should log after the promise");

function countTill100(n) {
  let ans = 0;
  for (let i = 0; i <= n; i++) {
    ans += i;
  }
  console.log(ans);
}

//AsyncWrapper with Promises
function asyncWrapperProm() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(100), 2000);
  });
}

let a = asyncWrapperProm();
a.then(function (data) {
  //Whatever the Promise is resolving with gets passing down to .then() callback or can be used the as value directly by storing it in a vairable
  countTill100(data);
});
