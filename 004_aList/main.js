function prepend(elem, list){
	return {value: elem,
			rest: list};
}

function arrayToList(array){
	if(array.length === 0){
		return null;
	} else {
		return prepend(array.shift(), arrayToList(array));
	}
}

var testList = arrayToList([1,2,3,4,5,6,7]);

function printList(list){
	console.log(list.value);
	return list.rest == null ? null : printList(list.rest);
}

printList(testList);

function listToArray(list){
	var array = [];
	while(list !== null){
		array.push(list.value);
		list = list.rest;
	}
	return array;
}

console.log(listToArray(testList));

function nthElement(list, n){
	return list.value === n ? list : nthElement(list.rest, n);
}

var thirdElement = nthElement(testList, 3);
console.log("Third elem value: " + thirdElement.value);

console.log("The rest after third element:");
printList(thirdElement.rest);
