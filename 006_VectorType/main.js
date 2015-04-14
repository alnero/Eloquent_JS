function Vector(x, y){
	this.x = x;
	this.y = y;
}

Vector.prototype.toString = function(){
	return "Vector{x: " + this.x + ", y: " + this.y +"}";
};

Vector.prototype.plus = function(other){
	return new Vector(this.x + other.x, this.y + other.y);
};

Vector.prototype.minus = function(other){
	return new Vector(this.x - other.x, this.y - other.y);
};

Object.defineProperty(Vector.prototype, 
					  "length", 
					  {get: function(){
						  		return Math.pow(this.x * this.x + this.y * this.y, 0.5);
					  		}
					  });

var vec = new Vector(1,1);
console.log(typeof vec);
console.log(vec.x);
console.log(vec);

var vecSum = vec.plus( new Vector(3, 2) );
var vecDiff = vec.minus( new Vector(2, 3) );
console.log(vecSum);
console.log(vecDiff);

console.log(vecSum.length);
vecSum.length = 10;
console.log(vecSum.length);
