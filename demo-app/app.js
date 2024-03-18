const math =require("./service/mat.js");

function performMathOperation(){
    console.log('sampleOne');
    console.log(math.sum(2,3,4,5,6,2));

    console.log('sampleTwo');
    console.log(math.devide(2,3));
}

performMathOperation();