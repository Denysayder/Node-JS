//Задача 1
function add(num: number): Function {
    let sum = num;

    function addNext(nextNum?: number): Function | number {
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
function isAnagram(first: string, second: string): boolean {
    let a: string = first.toLowerCase();
    let b: string = second.toLowerCase();

    a = a.split("").sort().join("");
    b = b.split("").sort().join("");

    return a === b;
}

console.log(isAnagram('нора', 'рано'));//true
console.log(isAnagram('нора', 'ранок'));//false

//Задача 3
function deepCopying<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

const person = {
    age: 19,
    name: 'Denys',
    lastname: 'Borovyk'
};

const clone = deepCopying(person);
console.log(person);//{ age: 19, name: 'Denys', lastname: 'Borovyk' }
console.log(clone);//{ age: 19, name: 'Denys', lastname: 'Borovyk' }

//Задача 4
const wrapper = <T extends (...args: any[]) => any>(func: T) => {
    const cache: { [key: string]: ReturnType<T> } = {};

    return (...args: Parameters<T>) => {
        const key = JSON.stringify(args);
        if (key in cache) {
            console.log(`Result from cache: ${cache[key]}`);
            return cache[key];
        } else {
            const result = func(...args);
            cache[key] = result;
            console.log(`Result calculated: ${result}`);
            return result;
        }
    };
};

const calc = (a: number, b: number, c: number) => a + b + c;
const cachedCalc = wrapper(calc);
cachedCalc(2, 2, 3);//Result calculated: 7
cachedCalc(5, 8, 1);//Result calculated: 14
cachedCalc(2, 2, 3);//Result from cache: 7