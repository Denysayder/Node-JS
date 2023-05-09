//Задача 1
function add(num) {
    var sum = num;
    function addNext(nextNum) {
        if (nextNum === undefined) {
            return sum;
        }
        sum += nextNum;
        return addNext;
    }
    return addNext;
}
console.log(add(1)(2)(3)()); // 6
//Задача 2
function isAnagram(first, second) {
    var a = first.toLowerCase();
    var b = second.toLowerCase();
    a = a.split("").sort().join("");
    b = b.split("").sort().join("");
    return a === b;
}
console.log(isAnagram('нора', 'рано')); //true
console.log(isAnagram('нора', 'ранок')); //false
//Задача 3
function deepCopying(obj) {
    return JSON.parse(JSON.stringify(obj));
}
var person = {
    age: 19,
    name: 'Denys',
    lastname: 'Borovyk'
};
var clone = deepCopying(person);
console.log(person); //{ age: 19, name: 'Denys', lastname: 'Borovyk' }
console.log(clone); //{ age: 19, name: 'Denys', lastname: 'Borovyk' }
//Задача 4
var wrapper = function (func) {
    var cache = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = JSON.stringify(args);
        if (key in cache) {
            console.log("Result from cache: ".concat(cache[key]));
            return cache[key];
        }
        else {
            var result = func.apply(void 0, args);
            cache[key] = result;
            console.log("Result calculated: ".concat(result));
            return result;
        }
    };
};
var calc = function (a, b, c) { return a + b + c; };
var cachedCalc = wrapper(calc);
cachedCalc(2, 2, 3); //Result calculated: 7
cachedCalc(5, 8, 1); //Result calculated: 14
cachedCalc(2, 2, 3); //Result from cache: 7
