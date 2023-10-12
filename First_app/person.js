class Person{
    constructor(name, age, location){
        this.name = name;
        this.age = age;
        this.location = location;
    }

    greeting(){
        console.log(`My name is ${this.name} and am ${this.age} old and I live in ${this.location}`);
    }
}

module.exports = Person;