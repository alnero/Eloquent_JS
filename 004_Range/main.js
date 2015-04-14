function range(a,b,step){
	step = step || 1;
	var rangeArray = [];
	var arrLength = (b - a)/step;
	if(step < 0){
		-arrLength;
	}
	for(var i = 0; i <= arrLength; i++){
		rangeArray[i] = a;
		a += step;
	}
	return rangeArray;
}

console.log(range(1, 10));
console.log(range(1, 10, 2));
console.log(range(5,2,-1));
console.log(range(5,2));

function sum(arr){
	var sum = 0;
	for(var index in arr){
		sum += arr[index];
	}
	return sum;
}

console.log(sum(range(1,10)));
console.log(sum(range(5,2,-1)));
