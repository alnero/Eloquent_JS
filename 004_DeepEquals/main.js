function deepEqual(a, b){
	console.log("compare: " + a + " " + b);
	if(typeof a === typeof b){
		if(typeof a === "object"){
			if(a == b) return true;
			if(a === null && b === null) return true;
			if(a === null && b !== null) return false;
			if(a !== null && b === null) return false;
			for(var prop in a){
				if(b.hasOwnProperty(prop)){
					if(deepEqual(a[prop], b[prop])){
						continue;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		} else if(a === b){
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}


var test1 = {name: "Dewie",
			 age: 15};
			 
var test2 = {name: "Dewie",
			 age: 12};
			 
var test3 = test1;
console.log(deepEqual(test1, test3)); // true
console.log(deepEqual(test1, test2)); // false
console.log(deepEqual(test1, null)); // false
console.log(deepEqual(null, null)); // true
console.log(deepEqual(null, test1)); // false
console.log(deepEqual(test1, undefined)); // false
console.log(deepEqual(undefined, undefined)); // true

var value1 = 1;
var value2 = 1;
console.log(deepEqual(value1, value2)); // true

var str1 = "unique";
var str2 = "unique";
var str3 = "separate";
console.log(deepEqual(str1,str2)); // true
console.log(deepEqual(str1,str3)); // false
