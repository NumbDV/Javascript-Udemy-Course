function User(name, id) {  // функция конструктор
    this.name = name; // свойство
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log('Hello! ' + this.name); // обращаемся к свойству name в этом обьекте
    };
}
User.prototype.exit = function(name) {
    console.log('Пользователь ' + this.name + ' ушел');
};


let ivan = new User('Ivan', 25),
    alex = new User('Alex', 20);

console.log(ivan);
console.log(alex);

ivan.exit();