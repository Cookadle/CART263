const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(

    mapSquares

);
function mapSquares(num) { 
        return(
        num * num* num
        )}

const numbers_filter = [1, 28, 355, 44, 51, 78];
const evenNumbers = numbers_filter.filter(
    function(num) {
    return  (num % 2 === 0)
})

console.log(evenNumbers); 

const strings_filter = ["banana", "oranges", "peppers", "tamatoes", "peas", "pears", "kiwi"];
const startsWithP = strings_filter.filter(
    function(str) {
    return  (str.startsWith("p"))
})
console.log(startsWithP);

/** REDUCE */
const numbers_n = [11, 2, 32, 4, 5,70];

const sum = numbers_n.reduce(
    function (accum, initval) 
    {
        return(accum + initval)
    },0)

console.log(sum);
 
