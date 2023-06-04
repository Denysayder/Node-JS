//Завдання 2
function arrayChangeDelete(array, rule) {
    var deletedElements = [];
    var i = 0;
    while (i < array.length) {
        if (rule(array[i])) {
            var deletedElement = array.splice(i, 1)[0];
            deletedElements.push(deletedElement);
        }
        else {
            i++;
        }
    }
    return deletedElements;
}
//Завдання 2
var test_array = [1, 2, 3, 6, 7, 9];
var deletedElements = arrayChangeDelete(test_array, function (item) { return item % 2 === 0; });
console.log("array:", test_array);
console.log("deletedElements:", deletedElements);
