class pattern1 {
  solution () {
    for (let i = 0; i <= 5; i++) {
      let row = '';
      for (let j = 0; j <= 5; j++) {
        row += '* '
      }
      console.log(row)
    }
  }
}
const p1 = new pattern1()
p1.solution()

class pattern2 {
  solution () {
    for (let i = 0; i <= 5; i++) {
      let row = '';
      for (let j = 1; j <= i; j++) {
        row += '* '
      }
      console.log(row)
    }
  }
}
const p2 = new pattern2()
p2.solution()

class pattern3 {
  solution () {
    for (let i = 0; i <= 5; i++) {
      let row = '';
      for (let j = 1; j <= i; j++) {
        row += `${j} `
      }
      console.log(row)
    }
  }
}
const p3 = new pattern3()
p3.solution()


class pattern4 {
  solution () {
    console.log('\n ')
    for (let i = 0; i < 5; i++) {
      let row = '';
      for (let j = 5; j > i; j--) {
        row += `${j} `
      }
      console.log(row)
    }
  }
}
const p4 = new pattern4()
p4.solution()

class pattern5 {
  solution () {
    console.log('\n ')
    for (let i = 0; i < 5; i++) {
      let row = '';
      for (let j = 1; j <= i + 1; j++) {
        row += `${j} `
      }
      console.log(row)
    }
  }
}
const p5 = new pattern5()
p5.solution()



class pattern6 {
  solution () {
    console.log('\n ')
    for (let i = 0; i <= 4; i++) {
      let row = '';
      for (let j = 4; j >= i; j--) {
        row += '  '
      }
      
      for (let j = 1; j <= i + 1; j++) {
        row+= `${j} `
      }
      console.log(row)
    }
  }
}
const p6 = new pattern6()
p6.solution()


class pattern7 {
  solution () {
    console.log('\n ')
    for (let i = 0; i <= 4; i++) {
      let row = '';
      for (let j = 4; j >= i; j--) {
        row += '  '
      }
      
      for (let j = 1; j <= i + 1; j++) {
        row+= `${i+1} `
      }
      console.log(row)
    }
  }
}
const p7 = new pattern7()
p7.solution()

class pattern8 {
  solution () {
    console.log('\n ')
    
    for (let i = 0; i <= 4; i++) {
      let row = '';
      
      for (let j = 4; j >= i; j--) {
        row += '  '
      }
      
      for (let j = i + 1; j > 0; j--) {
        row+= `${j} `
      }
      console.log(row)
    }
  }
}
const p8 = new pattern8()
p8.solution()


//Pattern 9
class pattern9 {
  solution () {
    console.log('\n ')
    
    for (let i = 0; i <= 4; i++) {
      let row = '';
      
      for (let j = 4; j > i; j--) {
        row += '  '
      }
      
      for (let j = 5 - i; j <= 5 + i; j++) {
        row+= `* `
      }
      console.log(row)
    }
  }
}
const p9 = new pattern9()
p9.solution()


//Pattern 10 
class pattern10 {
  solution(n) {
    console.log('\n');
    
    
    for (let i = 0; i < n; i++) {
      let row = '';
      
      for (let j = n; j > i + 1;  j--) {
        row += '  '
      }
      
      for (let j = n - i; j <= n + i; j++) {
        row += `${j} `
      }
      
      console.log(row)
    }
  }
}

p10 = new pattern10()
p10.solution(5)

//Pattern 11
class pattern11 {
  solution (n) {
    console.log('\n ')
    
    for (let i = 0; i < n; i++) {
      let row = '';
      
      //spaces
      for (let j = 0; j < i + 1; j++) {
        row += '  '
      }
      
      //stars (inverted)
      for (let j = 2 * n - 2 * i - 1; j > 0; j--) {
        row += `* `
      }
      console.log(row)
    }
  }
}
const p11 = new pattern11()
p11.solution(5)

//Pattern 12
class pattern12 {
  solution (n) {
    console.log('\n ')
    
    for (let i = 0; i < n; i++) {
      let row = '';
      
      //spaces
      for (let j = 0; j < i + 1; j++) {
        row += '  '
      }
      
      //numbers (inverted)
      for (let j = i + 1; j < 2 * n - i; j++) {
        row += `${j} `
      }
      console.log(row)
    }
  }
}
const p12 = new pattern12()
p12.solution(5)


//Pattern13
class pattern13 {
  solution (n) {
    console.log('\n ');
    
    //Upper Pyramid
    for (let i = 0; i < n; i++) {
      let spaces = '  '.repeat (n - i - 1);
      let stars = '* ' .repeat (2 * i + 1);
      console.log(spaces + stars)
    }
    
    //Lower Pyramid
    for (let i = 0; i < n; i++) {
      let spaces = '  '.repeat (i);
      let stars = '* ' .repeat (2 * (n - i) - 1);
      console.log(spaces + stars)
    }
  }
}
const p13 = new pattern13()
p13.solution(5)

//Pattern13
class pattern14 {
  solution (n) {
    console.log('\n ');
    
    //Upper half
    for (let i = 0; i < n; i++) {
      let stars = '* ' .repeat (i + 1);
      console.log(stars)
    }
    
    //Lower Pyramid
    for (let i = 0; i < n - 1; i++) {
      let stars = '* ' .repeat (n - i - 1);
      console.log(stars)
    }
  }
}
const p14 = new pattern14()
p14.solution(5)

//Pattern15
class pattern15 {
  solution(n) {
    console.log('\nPattern 15');
    
      for (let i = 0; i < n; i++) {
        
        let row = ''
        let start
        
        if (i % 2 !== 0) {
          start = 0
        } else { 
          start = 1
        }
        
      for (let j=0; j < i + 1 ; j++) {
        row += `${start} `;
        start = 1 - start;
      }
      console.log(row);
    }
  }
}

const p15 = new pattern15()
p15.solution(5)

//Pattern16
class pattern16 {
  solution (n) {
    console.log('\nPattern 16');
    //outer loop
    for (let i = 0; i < n; i++) {
      let row = '';
      
      //left numbers
      for (let j = 1; j <= i + 1; j++) {
        row += `${j} `
      } 
      
      // Middle spaces
      for (let j = 0; j < 2 * (n - i) - 2; j++) {
        row += '  ';
      }
      
      //right numebrs reverse
      for (let j = i + 1; j >= 1; j--) {
        row += `${j} `
      }
      
      console.log(row)
    }
  }
}
const p16 = new pattern16()
p16.solution(5)


//Pattern17
class pattern17 {
  solution (n) {
    console.log('\nPattern 17\n');
    
      let start = 1
    //outer loop
    for (let i = 0; i < n; i++) {
      let row = '';
      
      //left numbers
      for (let j = 1; j <= i + 1; j++) {
        row += `${start} `
        start = start + 1
      } 
      
      
      console.log(row)
    }
  }
}
const p17 = new pattern17()
p17.solution(5)

//Pattern18
class pattern18 {
  solution (n) {
    console.log('\nPattern 18\n');
    
    //outer loop
    for (let i = 0; i < n; i++) {
      let row = '';
      
      //left numbers
      for (let j = 0; j <= i; j++) {
        const character = String.fromCharCode('A'.charCodeAt(0) + j)
        row += `${character} `
        
      } 
      console.log(row)
    }
  }
}
const p18 = new pattern18()
p18.solution(5)


//pattern20
class pattern20 {
  solution (n) {
    console.log('\nPattern 20\n');
    
    for (let i = 0; i < n; i++) {
      let row = '';
      
      for (let j = 0; j <= i; j++) {
        row += String.fromCharCode('A'.charCodeAt(0) + i)
      }
      
      console.log(row )
    }
  }
}

const p20 = new pattern20()
p20.solution(5)

//Pattern21
class pattern21 {
  solution (n) {
    console.log('\nPattern 21\n');
    
    //outer loop
    for (let i = 0; i < n; i++) {
      let row = '';
      
      //left numbers
      for (let j = 0; j <= i; j++) {
        const character = String.fromCharCode('A'.charCodeAt(0) + j)
        row += `${character} `
        
      } 
      console.log(row)
    }
  }
}
const p21 = new pattern21()
p21.solution(5)

//Pattern22
class pattern22 {
  solution (n) {
    console.log('\nPattern 22\n');
    
    //outer loop
    for (let i = 0; i < n; i++) {
      let row = '';

      //left numbers
      for (let j = 0; j <= i; j++) {
        const character = String.fromCharCode('A'.charCodeAt(0) + j)
        row += `${character} `
        
      } 
      console.log(row)
    }
  }
}
const p22 = new pattern22()
p21.solution(5)


//Pattern 23
class pattern23 {
  solution(n) {
    console.log('\nPattern 23\n')
    
    
    for (let i = 0; i < n; i++) {
      
      const spaces = '  '.repeat(n - i - 1);
      
      const letters = [];
      for (let j = 0; j <= i; j++) {
        letters.push(String.fromCharCode('A'.charCodeAt(0) + j));
      }
      
      const pattern = [...letters, ...letters.slice(0, -1).reverse()]
      
      console.log(spaces + pattern.join(' '));
    }
  }
}

// Usage
const p23 = new pattern23();
p23.solution(5);

//Pattern24
class pattern24 {
  solution(n) {
    console.log('\nPattern Pattern24\n');
    
    for (let i = 0; i < n; i++) {
      const letters = []
      
      for (let j = n - i - 1; j < n; j++) {
        letters.push(String.fromCharCode('A'.charCodeAt(0) + j))
      }
      
      console.log(letters.join(' '));
    }
  }
}

// Usage
const p24 = new pattern24();
p24.solution(5);


//Pattern25
class pattern25 {
  solution(n) {
    console.log('\nPattern25\n');
    
    //Upper Half
    for (let i = 0; i < n; i++) {
      const letters = [];
      const spaces = [];
      
      
      for (let j = 0; j < n - i; j++) {
        letters.push('* ')
      }
      for (let j = 0; j < i; j++) {
        spaces.push('  ')
      }
      
      const half_row = [...letters, ...spaces]
      //console.log(half_row)
      
      const upper_rows = [...half_row, ...half_row.reverse()]
      
      //onsole.log(upper_rows)
      console.log(upper_rows.join(' '))
    }
    
    //lower Half
    for (let i = 0; i < n; i++) {
      const letters = [];
      const spaces = [];
      
      
      for (let j = 0; j <= i; j++) {
        letters.push('* ')
      }
      for (let j = 0; j < n - i - 1; j++) {
        spaces.push('  ')
      }
      
      const half_row = [...letters, ...spaces]
      //console.log(half_row)
      
      const lower_rows = [...half_row, ...half_row.reverse()]
      
      //onsole.log(upper_rows)
      console.log(lower_rows.join(' '))
    }
  }
}

// Usage
const p25 = new pattern25();
p25.solution(5);

//Pattern26
class pattern26 {
  solution(n) {
    console.log('\nPattern26\n');
    
    //Upper Half
    for (let i = 0; i < n; i++) {
      const letters = [];
      const spaces = [];
      
      
      for (let j = 0; j <= i; j++) {
        letters.push('* ')
      }
      for (let j = 0; j < n - i - 1; j++) {
        spaces.push('  ')
      }
      
      const half_row = [...letters, ...spaces]
      
      const upper_rows = [...half_row, ...half_row.reverse()]

      console.log(upper_rows.join(' '))
    }
    
    //lower Half
    for (let i = 0; i < n; i++) {
      const letters = [];
      const spaces = [];
      
      
      for (let j = 0; j < n - i - 1; j++) {
        letters.push('* ')
      }
      for (let j = 0; j <= i; j++) {
        spaces.push('  ')
      }
      
      const half_row = [...letters, ...spaces]
      
      const lower_rows = [...half_row, ...half_row.reverse()]
      
      console.log(lower_rows.join(' '))
    }
  }
}

// Usage
const p26 = new pattern26();
p26.solution(5);

//Pattern27
class pattern27 {
  solution(n) {
    console.log('\nPattern27\n');
    
    for (let i = 0; i < n; i++) {
      let row = ''
      for (let j = 0; j < n; j++) {
        if (i === 0 || j ===0 || i === n - 1 || j === n - 1) {
          row += `${n} `
        } else {
          row += '  '
        }
      }
      console.log(row)
    }
  }
}

// Usage
const p27 = new pattern27();
p27.solution(4);


//Pattern27 - part 2
class pattern27_2 {
  solution(n) {
    console.log('\nPattern27_2');
    
    for (let i = 0; i < n; i++) {
      let row = ''
      
      for (let j = 0; j < n; j++) {
        if (Math.min(i, j, n - i - 1, n - j - 1) === 0) {
          
          row += `${n} `
          
        } else {
          row += '  '
        }
      }
      console.log(row)
    }
  }
}

// Usage
const p27_2 = new pattern27_2();
p27_2.solution(4);


//Pattern27
class pattern28 {
  solution(n) {
    console.log('\nPattern28\n');
    
    const size = 2 * n - 1
    
    for (let i = 0; i < size; i++) {
      let row = ''
      
      for (let j = 0; j < size; j++) {
        let min_dist = Math.min(i, j, size - i - 1, size - j - 1) //printing the minimun distances of each element from the border 
        
        row += n - min_dist + ' ' //subtracting distance from the border valus gives us the number itself
      }
      console.log(row)
    }
  }
}

// Usage
const p28 = new pattern28();
p28.solution(4);