function every(arr, test){
	for(var i = 0; i < arr.length; i++){
		if(test(arr[i])) continue;
		return false;
	}
	return true;
}

function some(arr, test){
	for(var i = 0; i < arr.length; i++){
		if(!test(arr[i])) continue;
		return true;
	}
	return false;
}

var numbers = [10, 20, 30, 40, 50];
console.log( every( numbers, function(a){
	return a < 60;
}));
console.log( some( numbers, function(a){
	return a > 40;
}));
