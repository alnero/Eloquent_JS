var dimension = 15;
var line = "";
for(var i = 0; i < dimension; i++){
	if(i%2 == 0){
		line += "#";
	} else {
		line += " ";
	}
}
for(var i = 0; i < dimension; i++){
	if(i%2 == 0){
		console.log(line);
	} else {
		console.log(" " + line);
	}
}
