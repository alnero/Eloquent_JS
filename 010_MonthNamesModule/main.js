(function(exports){
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	exports.getMonthName = function(id){
		return monthNames[id];
	};
	
	exports.getMonthId = function(name){
		return monthNames.indexOf(name);
	};
	
})(this.month = {});

console.log(month.getMonthName(1));
console.log(month.getMonthId("Jan"));
console.log(month.MonthNames); // only available in function namespace
