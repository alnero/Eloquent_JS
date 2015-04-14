function Iterator(sequence){
	this.sequence = sequence;
}
Iterator.prototype.next = function(){
	return this.hasNext() ? sequence.next() : null;
};
Iterator.prototype.hasNext = function(){
	return sequence.hasNext();
};

function ArraySeq(arr){
	this.arr = arr;
	this.index = 0;
}
ArraySeq.prototype.hasNext = function(){
	return this.index < this.arr.length;
};
ArraySeq.prototype.next = function(){
	return this.hasNext() ? this.arr[this.index++] : null;
};


function RangeSeq(from, to){
	this.from = from;
	this.to = to;
	this.currentValue = from;
}
RangeSeq.prototype.hasNext = function(){
	return this.currentValue < this.to;
};
RangeSeq.prototype.next = function(){
	return this.hasNext() ? this.currentValue++ : null;
};


var arrseq = new ArraySeq([1,2,3]);

var rangeseq = new RangeSeq(100, 1000);

function logFive(sequence){
	for(var i = 0; i < 5; i++){
		if(sequence.hasNext()){
			console.log(sequence.next());
		} else {
			return;
		}
	}
}

logFive(arrseq);
logFive(rangeseq);

// head and tail idea for iteration
function ArraySeq2(arr, offset){
	this.arr = arr;
	this.offset = offset;
}
ArraySeq2.prototype.head = function(){
	return this.arr[this.offset];
};
ArraySeq2.prototype.tail = function(){
	return ArraySeq2.make(this.arr, this.offset + 1);
};
ArraySeq2.make = function(array, offset){
	if(offset == null) { offset = 0; }
	if(offset >= array.length){
		return null;
	} else {
		return new ArraySeq2(array, offset);
	}
};


function RangeSeq2(from, to){
	this.from = from;
	this.to = to;
}
RangeSeq2.prototype.head = function(){
	return this.from;
};
RangeSeq2.prototype.tail = function(){
	return RangeSeq2.make(this.from + 1, this.to);
};
RangeSeq2.make = function(from, to){
	if(from > to) {
		return null;
	} else {
		return new RangeSeq2(from, to);
	}
};

function logFive2(sequence) {
	for(var i = 0; i < 5; i++){
		if(sequence ==  null) return;
		console.log(sequence.head());
		sequence = sequence.tail();
	}
}

logFive2(new ArraySeq2.make([1, 2, 3, 4]));
logFive2(new RangeSeq2.make(-3, 3));

