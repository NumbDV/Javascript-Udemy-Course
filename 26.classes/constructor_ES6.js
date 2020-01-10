class User {
    constructor(name, id) {  // функция конструктор
    this.name = name; // свойство
    this.id = id;
    this.human = true;
    }
    hello() {
        console.log(`Hello! ${this.name}`);
    }
    exit() {
        console.log(`User ${this.name} has left the game`);
    }
}

let ivan = new User('Ivan', 25),
    alex = new User('Alex', 20);

console.log(ivan);
console.log(alex);

alex.hello();
ivan.exit();