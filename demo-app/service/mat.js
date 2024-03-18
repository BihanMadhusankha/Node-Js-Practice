// function sum(valOne, valTwo) {
//     return valOne + valTwo;
// }

function sum(...values){
   return values.reduce((previousValue ,currentValue)=> {
      return  previousValue + currentValue
     } );
}

function devide(valOne, valTwo) {
    return valOne / valTwo;
}

 module.exports = {
    sum: sum,
    devide: devide
 };
