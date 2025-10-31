class Solution {
  countFrequencies(nums: number[]) {
    const size: number = Math.max(...nums) + 1;

    const hash: number[] = new Array(size).fill(0);

    for (let num of nums) {
      hash[num] += 1;
    }

    const seen: Set<number> = new Set();
    const l: [number, number][] = [];
    for (let num of nums) {
      if (!seen.has(num)) {
        l.push([num, hash[num]]);
        seen.add(num);
      }
    }
    console.log(l);
  }

  countMaxFrequency(nums: number[]) {
    const size: number = Math.max(...nums) + 1;

    const hash: number[] = new Array(size).fill(0);

    for (let num of nums) {
      hash[num] += 1;
    }

    const l: [number, number][] = [];
    let max_freq: number = 0;

    for (let i = 0; i <= size; i++) {
      if (hash[i] > 0) {
        l.push([i, hash[i]]);
        max_freq = Math.max(max_freq, hash[i]);
      }
    }

    console.log(l);

    let result: number[] = [];
    for (const [num, freq] of l) {
      if (freq === max_freq) {
        result.push(num);
      }
    }
    console.log(Math.min(...result));
  }

  mostFrequentElement(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let r: number = 0;
    let l: number = 0;

    let total: number = 0;
    let result: number = 0;

    while (r < nums.length) {
      total += nums[r];

      while (nums[r] * (r - l + 1) > total + k) {
        total -= l;
        l++;
      }

      result = Math.max(result, r - l + 1);
      r++;
    }

    return result;
  }
}

const c = new Solution();
console.log("Frequency of Elements \n");
c.countFrequencies([1, 2, 2, 3, 1]);

console.log("MaxFrequency of an element \n");
c.countMaxFrequency([2, 2, 2, 3, 1]);

console.log("frequency of MaxFrequency");
c.mostFrequentElement([1, 4, 8, 13], 5);
