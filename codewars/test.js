let arr = [1,2,3,4,3,2,1]
let b = 4
console.log(arr.slice(0,1))
console.log(arr.slice(2))

for (let i = 0; i < arr.length; i++) {
    let a = arr.slice(0, i).reduce((prev, curr) => {return prev+curr},0)
    let b = arr.slice(i+1).reduce((prev, curr) => {return prev+curr},0)
    if (a === b) {
        return i
    }
}