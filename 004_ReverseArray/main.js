function reverseArray(arr){
	var resultArray = [];
	for(var i = 0; i < arr.length; i++){
		resultArray[i] = arr[arr.length-1-i];
	}
	return resultArray;
}

var testArray = [1,2,3,4,5];
console.log(reverseArray(testArray));

function reverseArrayInPlace(arr){
	var l = arr.length;
	for(var i = 0; i < l/2; i++){
		var temp = arr[i];
		arr[i] = arr[l-1-i];
		arr[l-1-i] = temp;
	}
	return arr;
}

console.log(reverseArrayInPlace(testArray));

var testArray1 = ["one", "two", "three", "four", "five", "six"];
console.log(reverseArrayInPlace(testArray1));
