/* function User(name, id) {  // функция конструктор
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

ivan.exit(); */


/* 'use strict';


function showThis(a, b) {
    console.log(this);
    function sum() {
        console.log(this);
        return a + b;
    }
    console.log(sum());
}
showThis(4,5);
showThis(4,6); */


/* let obj = {
    a: 20,
    b: 15,
    sum: function() {
        console.log(this);
        function shout() {
            console.log(this);
        }
        shout(); // вернет window/undefined
    }
};
obj.sum(); */

/* let user = {
    name: "John"
};
function sayName(surname) {
    console.log(this);
    console.log(this.name + surname);
}

console.log(sayName.call(user, ' Smith')); // можно передать только строку
console.log(sayName.apply(user, [' Snow'])); // можно передавать несколько данных в массиве

function count(number) {
    return this*number;
}
let double = count.bind(2);
console.log(double(3));
console.log(double(13)); */

let btn = document.querySelector('button');

btn.addEventListener('click', function() {
    console.log(this);
    this.style.backgroundColor = 'red';
    function showThis() {
        console.log(this);
    }
    showThis();
});

// 1) Просто вызов функции - window/undefined
// 2) Метод обьекта this равен обьекту
// 3) Конструктор (new) - this = новый созданный обьект
// 4) Указание конкретного контекста - call, apply, bind