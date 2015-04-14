var arrayGroup = [
	[1, 2, 3]
   ,["d", "e", "f"]
   ,[7, 8, 9]
   ,["j", "k", "l"]
   ,[13, 14, 15]
];

var joinedArrays = arrayGroup.reduce(function(a,b){
	return a.concat(b);
});
console.log(joinedArrays);
