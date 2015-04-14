console.log("----ca[tr]----");
var expr1 = /ca[tr]/; // cat or car
console.log("cat-" + expr1.test("cat"));
console.log("car-" + expr1.test("car"));
console.log("oncart-" + expr1.test("oncart"));
console.log("decaf-" + expr1.test("decaf"));
console.log("\n");

console.log("----pr?op----");
var expr2 = /pr?op/; // pop or prop
console.log("pop-" + expr2.test("pop"));
console.log("popr-" + expr2.test("popr"));
console.log("prop-" + expr2.test("prop"));
console.log("prrop-" + expr2.test("prrop"));
console.log("trop-" + expr2.test("trop"));
console.log("\n");

console.log("----ferr(et|y|ari)----");
var expr3 = /ferr(et|y|ari)/; // ferret, ferry, ferrari
console.log("ferr-" + expr3.test("ferr"));
console.log("ferret-" + expr3.test("ferret"));
console.log("ferry-"+ expr3.test("ferry"));
console.log("ferrari-" + expr3.test("ferrari"));
console.log("ferro-" + expr3.test("ferro"));
console.log("\n");

console.log("----\\b.*ious\\b----");
var expr4 = /\b.*ious\b/; // any word ending in ...ious
console.log("tedious-" + expr4.test("tedious"));
console.log("credious-" + expr4.test("credious"));
console.log("ious-" + expr4.test("ious"));
console.log("rediounus-" + expr4.test("rediounus"));
console.log("mediouv-" + expr4.test("mediouv"));
console.log("tediouss-" + expr4.test("tediousus"));
console.log("\n");

console.log("----\\s(\\.|,|:|;)----");
var expr5 = /\s(\.|,|:|;)/; // whitespace followed by . , : ;
console.log(" .-" + expr5.test(" ."));
console.log("	.-" + expr5.test("	."));
console.log("\\n.-" + expr5.test("\n."));
console.log(" *-" + expr5.test(" *"));
console.log(" *.-" + expr5.test(" *."));
console.log(" ,-" + expr5.test(" ,"));
console.log(" :-" + expr5.test(" :"));
console.log(" ;-" + expr5.test(" ;"));
console.log("\n");

console.log("---- ----");
var expr6 = /\b\w{6,}\b/; // word longer than 
console.log("milk-" + expr6.test("milk"));
console.log("tools-" + expr6.test("tools"));
console.log("script-" + expr6.test("script"));
console.log("maraphone-" + expr6.test("maraphone"));
console.log("norsepower-" + expr6.test("norsepower"));
console.log("\n");

console.log("---- ----");
var expr7 = /\b^[^e]*$\b/g; // words without letter e
console.log("milk-" + expr7.test("milk"));
console.log("eclipse-" + expr7.test("eclipse"));
console.log("melk-" + expr7.test("melk"));
console.log("e-" + expr7.test("e"));
