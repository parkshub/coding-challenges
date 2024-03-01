const arr1 = [-5, 2, 4, 6, 10]
const arr2 = [8, 20, -2, 4, -6]

// do binary search again, but instead of outputting true and false output the index value of the target

// hint: left right
// function binarySearach(arr, target) {
//     console.log(arr)
    
//     let temp = arr

//     while (temp.length > 0) {
        
//         let middle = Math.ceil(temp.length / 2)
//         console.log(middle)

//         if (temp[middle] === target) { return true }
        
//         if (temp[middle] > target) {    
//             temp = temp.slice(0, middle)
//             console.log(temp)
//         } else {
//             temp = temp.slice(middle)
//             console.log(temp)
//         }
//     }

//     return false
// }

// function binarySearchRec(arr, target) {

//     return search(arr, target, 0, arr.length)
    
//     // function search(arr, target) {
//     //     const middle = Math.floor(arr.length / 2)

//     //     if (arr[middle] === target) { return true }
//     //     if (arr.length === 1) { return false }

//     //     if (arr[middle] > target) { return search(arr.slice(0, middle), target) }
//     //     if (arr[middle] < target) { return search(arr.slice(middle), target) }
//     //     // return false
//     // }
// }

// function bubbleSort(arr) {
//     let switched = true
    
//     while (switched) {
//         switched = false
//         for (let i = 0; i < arr.length; i++) {
//             if (arr[i] > arr[i + 1]) {
//                 let temp = arr[i]
//                 arr[i] = arr[i + 1]
//                 arr[i + 1] = temp
//                 switched = true
//             }
//         }
//     }

//     return arr
// }

// function insertionSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let j = i - 1
//         let num = arr[i]
        
//         while (arr[j] < num && j >= 0) {
//             arr[i] = arr[j]
//             j --
//         }

//         arr[j + 1] = num
//     }

//     return arr
// }

// function mergeSort(arr) {
//     if (arr.length < 2) { return arr }

//     const middle = Math.floor(arr.length / 2)
//     const left = arr.slice(0, middle)
//     const right = arr.slice(middle)

//     return merge(mergeSort(left), mergeSort(right))

//     function merge(left, right) {
//         let sortedArr = []

//         while (left.length && right.length) {
//             // why doesn't the below work?
//             // console.log(left, left.length)
//             // console.log(right, right.length)
//             // if (left[left.length - 1] > right[right.length - 1]) {
//             //     sortedArr.push(left.pop())
//             // } else {
//             //     sortedArr.push(right.pop())
//             // }
//             if (left[0] > right[0]) {
//                 sortedArr.push(left.shift())
//             } else {
//                 sortedArr.push(right.shift())
//             }
//         }

//         return [...sortedArr, ...left, ...right]
//     }
// }

// function quickSort(arr) {
//     // const middle = Math.floor(arr.length / 2)
//     const pivot = arr[ arr.length - 1 ]
//     const left = []
//     const right = []

//     for (let i = 0; i < arr.length - 1; i++) {
//         let current = arr.pop()
//         if (current > pivot) { right.push(current) }
//         else { left.push(current) }
//     }

//     return [...quickSort(left), pivot, ...quickSort(right)]
// }



function binarySearch(arr, target) {
    let left = 0
    let right = arr.length - 1

    while (left > right) {
        let mid = Math.floor((left + right) / 2)

        if (arr[mid] === target) { return mid }

        if (arr[mid] > target) { right = mid - 1 }
        if (arr[mid] <= target) { left = mid + 1 }
    }

    return -1
}

function binarySearchRec(arr, target, left, right) {
    if (left > right) { return - 1 }

    const mid = Math.floor((left + right) / 2)
    
    if (arr[mid] === target) { return mid }

    if (arr[mid] > target) { return binarySearchRec(arr, target, left, mid - 1) }
    if (arr[mid] < target) { return binarySearchRec(arr, target, mid + 1, right) }
}

function bubbleSort(arr) {
    let condition = true

    while (condition) {
        condition = false

        for (let i = 0; i < arr.length; i++) {
            if (arr[ i ] > arr[ i + 1 ]) { 
                let temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp

                condition = true
             }
        }
    }

    return arr
}

function insertionSort(arr) {

    for (let i = 1; i < arr.length; i++) {
        let num = arr[i]
        let j = i - 1

        
        while (j >= 0 & num < arr[j]) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = num
    }

    return arr
}
