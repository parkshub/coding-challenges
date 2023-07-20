// https://dev.to/bchau/factory-functions-vs-constructors-500m

// from what i've gathered so far
// factory function don't use this and just defines everything in return {}
// classes and constructor functions on the other hand use this

// factory functions create a new function for each new object created, so not really inheritance
    // so then how do you pass down prototype functions?
        // since they are prototype object you would have to modify default object prototype DONT DO THIS
    // you can also use Object.create()

const myProto = {
    talk() {
        console.log(`hello i am ${this.name}`)
    }
}

function createPerson (name) {
    return Object.create(myProto, {
        name: { // you can't add methods here
            value: name
        },
    })
}

const person1 = createPerson('Dude')
person1.talk()

// factory functions give you data privacy
    // you dont need to define the variable and still use it and you dont have to worry about accidentally changing it and messing things up

function createPerson2(name) {
    return {
        talk() {return `i am ${name}`},
    }
}

const person2 = createPerson2('Dude2')
console.log(person2.talk())

// also FYI
    // if you're making a constructor function using this.param1 this.param2, you have to invoke new before creating a new variable