/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  if (str.length <= 1) {
    return true;
  }

  str = str.toLowerCase();

  // const regex = /[^a-zA-Z0-9]/;
  // str = str.split(" ").join("");

  str = str.replace(/[^a-zA-Z0-9]/g, "");

  const size = Math.trunc(str.length / 2);

  for (let i = 0; i < size; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

module.exports = isPalindrome;
