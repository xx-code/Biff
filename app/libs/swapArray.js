swapArrayElements = (arr, index1, index2) => {
    let newArr = arr;

    let temp = newArr[index1];
    newArr[index1] = newArr[index2];
    newArr[index2] = temp
    return newArr        
}

export default swapArrayElements