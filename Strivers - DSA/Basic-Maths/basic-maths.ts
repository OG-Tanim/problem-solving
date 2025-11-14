//extract all the digits
class Practice {
  extractDigits(n: number): number[] {
    let digits: number[] = [];
    if (n === 0) {
      digits.push(n);
    } else {
      let abs_n: number = Math.abs(n);
      while (abs_n > 0) {
        let ld: number = abs_n % 10;
        digits.push(ld);
        abs_n = Math.trunc(abs_n / 10);
      }
    }

    return digits.reverse();
  }
}
const practice = new Practice();
console.log(practice.extractDigits(345));

//check for prime

class Practice1 {
  checkPrime(n: number): boolean {
    if (n < 2) {
      return false;
    }
    for (let i: number = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}

const practice1 = new Practice1();
console.log(practice1.checkPrime(345));

//divisors

let divisors: number[] = [23, 12, 45, 54, 53];
let sorted: number[] = divisors.sort((a, b) => b - a);
console.log(sorted);

class Practice2 {
  findGCD(n1: number, n2: number): number {
    while (n1 > 0 && n2 > 0) {
      if (n1 > n2) {
        n1 = n1 % n2;
      } else {
        n2 = n2 % n1;
      }
    }

    return n1 === 0 ? n2 : n1;
  }
}

const practice2 = new Practice2();
console.log(practice2.findGCD(32, 48));
