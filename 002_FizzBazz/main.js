for(var i = 0; i < 100; i++){
	if(i % 3 == 0){
		if(i % 5 == 0){
			console.log(" - fizzbazz");
			continue;
		}
		console.log(" - fizz");
		continue;
	}

	if(i % 5 == 0){
		console.log(" - bazz");
		continue;
	}

	console.log(i);
}
