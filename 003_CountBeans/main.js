function countBs(word){
	return countChar(word, "B");
}
console.log(countBs("Bee"));
console.log(countBs("BiBi"));
console.log(countBs("Bonobo"));

function countChar(word, char){
	var count=0;
	for(var i = 0; i < word.length; i++){
		if(word.charAt(i) === char){
			count++;
		}
	}
	return count;
}
