Array.prototype.in_array = function(value) {
	var found = false;
	for (var i=0; i<this.length; i++) {
		if (this[i] == value) {
			found = i;
			break; }}
	return found; }
// add Prepare method to strings
String.prototype.Prepare = function() {
	var isostr = this.toUpperCase();
	isostr = isostr.substr(4) + isostr.substr(0,4);
	for (var i = 0; i <= 25; i++) {
		while (isostr.search(String.fromCharCode(i+65)) != -1) {
			isostr = isostr.replace(String.fromCharCode(i+65), String(i+10)); }}
	return isostr; }
// add Mod method to strings
String.prototype.Mod = function() {
	var parts = Math.ceil(this.length/7);
	var remainer = "";
	for (var i = 1; i <= parts; i++) {
		remainer = String(parseFloat(remainer+this.substr((i-1)*7, 7))%97); }
	return remainer; }
// the magic core routine
function checkibancore(iban) {
	var standard = -1;
	illegal = /\W|_/; // contains chars other than (a-zA-Z0-9) 
	if(illegal.test(iban)) { // yes, alert and exit
		illegal = /((\W|_)+)/g;
		var ichars;
		var aliban = "";
		var lindex = -1;
		while (ichars = illegal.exec(iban)) {
		lindex = ichars.index;}
		aliban += iban.substr(lindex+1);
		aliban = aliban.replace(/\|/g, "%7C");
		alert('Invalid!');
		return "0"; }
        else { // no, continue
		illegal = /^\D\D\d\d.+/; // first chars are letter letter digit digit
		if(illegal.test(iban) == false) { // no, alert and exit
			alert('Invalid!'); 
			return "0"; } else { illegal = /.+/; } // or take care of not respected country
				 return iban.Prepare().Mod(); }} // calculate and return the remainer
// perform the check
function checkiban(iban) {
	if (checkibancore(iban) == "1") { alert('IBAN Is Correct'); } // and prompt result
	else { alert('IBAN Is Wrong'); }}
function buildtest(structure,kind) {
	var result = "";
	var testpattern = structure.match(/([ABCFLUW]\d{2})/g);
	var patterncount = testpattern.length;
	for (var i = 0; i < patterncount; ++i) {
		if (((kind >= 0)&&(i != kind))||(kind == -2)) {
			result += testpart(testpattern[i],"any"); }
		else {result += testpart(testpattern[i],"standard"); }}
	return new RegExp(result); }
function testpart(pattern,kind) {
	var testpattern = "(";
	if (kind == "any") {
		testpattern += "."; }
	else {
		testpattern += "[";
		if (kind == "reverse") {
			testpattern += "^"; }
		switch (pattern.substr(0,1)) {
			case "A": testpattern += "0-9A-Za-z"; break;
			case "B": testpattern += "0-9A-Z"; break;
			case "C": testpattern += "A-Za-z"; break;
			case "F": testpattern += "0-9"; break;
			case "L": testpattern += "a-z"; break;
			case "U": testpattern += "A-Z"; break;
			case "W": testpattern += "0-9a-z"; break; }
		testpattern += "]"; }
	if (((pattern.substr(1,2)*1) > 1) && (kind != "reverse")) {
		testpattern += "{"+String(pattern.substr(1,2)*1)+"}"; }
	testpattern += ")";
	return testpattern; }






