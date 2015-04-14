function primitiveMultiply(){
	if(Math.floor(Math.random()	* 2) == 1){
		return Math.random() * Math.random();
	} else {
		throw new MultiplicationUnitFailure();
	}
}

function MultiplicationUnitFailure(message){
	this.message = message;
	this.stack = (new Error()).stack;
}

MultiplicationUnitFailure.prototype = 
	Object.create(Error.prototype);
MultiplicationUnitFailure.prototype.name = 
	"MultiplicationUnitFailure";
	
function getMultiplicatonResult(){
	while(true){
		try {
			var result = primitiveMultiply();
			return result;
		} catch (e) {
			if(e instanceof MultiplicationUnitFailure){
				console.log("Trying again");
				continue;
			} else {
				throw e;
			}
		}
	}
}

for(var i = 0; i < 25; i++){
	console.log("Attempt #" + i);
	console.log(getMultiplicatonResult());
	console.log("=======================");
}

