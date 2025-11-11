/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  // if (str1.length !== str2.length) {
  //   return false;
  // }
  // for (let i = 0; i < str1.length; i++) {
  //   if (!str2.includes(str1[i])) {
  //     return false;
  //   }
  // }
  // return true;
  //return str1.split("").sort().join("") === str2.split("").sort().join("");

  let freqMap1 = {};
  let freqMap2 = {};

  for (let ch of str1) {
    freqMap1[ch] = (freqMap1[ch] || 0) + 1;
  }
  for (let ch of str2) {
    freqMap2[ch] = (freqMap2[ch] || 0) + 1;
  }

  if (Object.keys(freqMap1).length !== Object.keys(freqMap2).length) {
    return false;
  }

  for (let key in freqMap1) {
    if (freqMap1[key] !== freqMap2[key]) {
      return false;
    }
  }

  return true;
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("aab", "abb"));
module.exports = isAnagram;
