var box = {
	locked: true,
	lock: function(){ this.locked = true; },
	unlock: function(){ this.locked = false; },
	_content: ["secret"],
	getContent: function() {
		if(this.locked){
			throw new Error("Locked!");
		} else {
			return this._content;
		}
	}
};

function withBoxUnlocked(f){
	box.unlock();
	try {
		return f.call(box);
	} finally {
		box.lock();
	}
}

console.log(withBoxUnlocked(box["getContent"]));
console.log(box.locked);

withBoxUnlocked(function(){
	box._content.push("goldy");
});

try {
	withBoxUnlocked(function(){
		throw new Error("Pirates! Abort!");
	});
} catch (e) {
	console.log("Error rised: " + e);
}

console.log(withBoxUnlocked(box["getContent"]));
console.log(box.locked);

