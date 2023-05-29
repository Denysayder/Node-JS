//Завдання 2
function arrayChangeDelete<T>(
    array: T[],
    rule: (item: T) => boolean
): T[] {
    const deletedElements: T[] = [];
    let i = 0;

    while (i < array.length) {
        if (rule(array[i])) {
            const deletedElement = array.splice(i, 1)[0];
            deletedElements.push(deletedElement);
        } else {
            i++;
        }
    }

    return deletedElements;
}

//Завдання 2
const test_array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(test_array, (item) => item % 2 === 0);

console.log("array:", test_array);
console.log("deletedElements:", deletedElements);