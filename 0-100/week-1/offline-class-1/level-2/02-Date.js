//Date Methods:

function dateMethods() {
  const currentDate = new Date();
  console.log("Current Date:", currentDate);

  console.log("Local Time:", currentDate.toLocaleString());
  console.log("Time in milliseconds:", currentDate.getTime());
  console.log("Date:" + currentDate.getDate());
  console.log("Month:" + (currentDate.getMonth() + 1)); // Months are zero-indexed
  console.log("Year:", currentDate.getYear() + 1900);
  console.log("Year:", currentDate.getFullYear());

  console.log("Hours: " + currentDate.getHours());
  console.log("Minutes: " + currentDate.getMinutes());
  console.log("Seconds: " + currentDate.getSeconds());

  //After setting components of date
  currentDate.setMonth(5);
  console.log("After setting month: " + currentDate);

  currentDate.setFullYear(2023);
  console.log("After setting year: " + currentDate);

  const newDate = new Date(2024, 3, 12);
  console.log("New Date: " + newDate);
}

const Before = new Date();
console.log("time before using Date():", Before);

console.log(
  "Current Time: " +
    Before.getHours() +
    " : " +
    Before.getMinutes() +
    " : " +
    Before.getSeconds()
);

dateMethods();

const After = new Date();
console.log("time before using Date()", After);

console.log(
  "Time taken in milliseconds: " + (After.getTime() - Before.getTime())
);
