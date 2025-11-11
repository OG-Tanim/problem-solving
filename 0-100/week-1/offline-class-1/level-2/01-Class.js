class Animal {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
}

//objects

let fog = {
  name: "fog",
  color: "white",
  madeOf: "water",
  causes: "cold",
};

console.log(fog["color"]);
console.log(fog.color);

console.log(`${fog.color} ${fog.name} causes ${fog.causes}`);

console.log(fog["color"] + " " + fog["name"] + " causes " + fog["causes"]);

class Animal {
  constructor(name, countlegs, sounds) {
    this.name = name;
    this.countlegs = countlegs;
    this.sounds = sounds;
  }

  static myType() {
    console.log("Animal");
  }

  speaks() {
    console.log(this.sounds);
  }
}

let cat = new Animal("cat", 4, "meow");

cat.speaks();
Animal.myType();
