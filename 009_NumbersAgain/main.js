var jsNumberExpr = /(^[+-]?\d+$)|(^[+-]?\d+\.\d*$)|(^[+-]?\.\d+$)|(\d+E[+-]?\d+)/i;

console.log(jsNumberExpr.test("5"));
console.log(jsNumberExpr.test("+5"));
console.log(jsNumberExpr.test("-5"));

console.log(jsNumberExpr.test("5."));
console.log(jsNumberExpr.test("+5."));
console.log(jsNumberExpr.test("-5."));

console.log(jsNumberExpr.test(".5"));
console.log(jsNumberExpr.test("+.5"));
console.log(jsNumberExpr.test("-.5"));

console.log(jsNumberExpr.test("5.5"));
console.log(jsNumberExpr.test("+5.5"));
console.log(jsNumberExpr.test("-5.5"));

console.log(jsNumberExpr.test("5E-3"));
console.log(jsNumberExpr.test("5e10"));

console.log(jsNumberExpr.test(".5.5")); // false
console.log(jsNumberExpr.test("5..5")); // false
console.log(jsNumberExpr.test(".")); // false
