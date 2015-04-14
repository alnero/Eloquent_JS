var singleQuoteExpr = /(\s+|^)'(.*)'($|\s+|\W)/;
var dialogString = "This text contains some dialog 'which isn't in double quotes' but will be.";
console.log(dialogString.replace(singleQuoteExpr, '$1"$2"$3'));
