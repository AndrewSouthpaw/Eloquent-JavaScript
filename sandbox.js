


/****************************************************************
Eloquent JavaScript: Chapter 3
****************************************************************/


/*
Exercise: 3.1
=======================================
Write a function called absolute, which returns the absolute value of the number
it is given as its argument.  The absolute value of a negative number is the
positive version of that same number, and the absolute value of a positive
number (or zero) is that number itself.
*/

function absolute(num) {
	if (num < 0) return -num;
	return num;
}


/* Looking at closures */

// var variable = "top-level";
// 
// function printVariable() {
//   console.log("inside printVariable, the variable holds '" +
//         variable + "'.");
// }
// 
// function test() {
//   var variable = "local";
//   console.log("inside test, the variable holds '" + variable + "'.");
//   printVariable();
// }
// 
// test();

var variable = "top-level";
function parentFunction() {
  var variable = "local";
  function childFunction() {
    console.log(variable);
  }
  childFunction();
}
parentFunction();



/*
Exercise 3.2
=======================================
Write a function greaterThan, which takes one argument, a number, and returns a
function that represents a test.  When this returned function is called with a
single number as argument, it returns a boolean: true if the given number is
greater than the number that was used to create the test function, and false
otherwise.
*/

function greaterThan(testNum) {
	return function(num) {
		return num > testNum;
	};
}

















/****************************************************************
Eloquent JavaScript: Chapter 4
****************************************************************/


/*
You can use variables as property names!
*/
// var propertyName = "length"; 
// var text = "hello world";
// console.log(text[propertyName]);
















/****************************************
Eloquent JavaScript: Chapter 6
*****************************************/


function reduce(combine, base, array) {
  forEach(array, function (element) {
    base = combine(base, element);
  });
  return base;
}


function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function map(func, array) {
  var result = [];
  forEach(array, function (element) {
    result.push(func(element));
  });
  return result;
}

function countZeros(numbers) {
	function counter(total, num) {
		return total + ((num === 0) ? 1 : 0);
	}
	return reduce(counter, 0, numbers);
}

// function count(test, array) {
// 	var total = 0;
// 	forEach(array, function (element) {
// 		if (test(element)) total++;
// 	});
// 	return total;
// }

function count(test, array) {
	return reduce(function(total, elem) {
		return total += (test(elem) ? 1 : 0);
	}, 0, array);
}

function countZeros2(numbers) {
	return count(function(x) { return (x === 0); }, numbers);
}




/*
Partially applied functions
*/

var op = {
  "+": function(a, b){return a + b;},
  "==": function(a, b){return a == b;},
  "===": function(a, b){return a === b;},
  "!": function(a){return !a;}
  /* and so on */
};

var equals3 = function(x) { return op['=='](3, x);};






// function partial(fn) {	// comes with potential arguments
//   // A reference to the Array#slice method.
//   var slice = Array.prototype.slice;
//   // Convert arguments object to an array, removing the first argument.
//   var args = slice.call(arguments, 1);
// 
//   return function() {
//     // Invoke the originally-specified function, passing in all originally-
//     // specified arguments, followed by any just-specified arguments.
//     return fn.apply(this, args.concat(slice.call(arguments, 0)));
//   };
// }

// function add(a,b) {return a + b;}
// 
// var addOne = partial(add, 1);
// console.log(addOne(2));	// > 3




// function compose(f,g) {
// 	return function () {
// 		return f(g.apply(null, arguments));
// 	}
// }


function partial(f) {
	var slice = Array.prototype.slice;
	var args = slice.call(arguments, 1);
	return function () {
		return f.apply(this, args.concat(slice.call(arguments, 0)));
	}
}



// console.log([1,2,3].map(partial(function (a,b) { return a + b;}, 1)));

// Partial functions allow you to pass an "incomplete" function into an iterator without
// building a specific function for it. Without partial functions, the above would be
// accomplished this way:

// var addOne = function (x) { return 1 + x;};
// console.log([1,2,3].map(addOne));

// Notice that you had to build a whole new variable binding... What a pain.

// Squaring an array of array of numbers

function square (x) { return x * x;};
console.log( map(partial(map, square), [[10, 100], [12, 16], [0, 1]]) );

var sum = partial(reduce, function(x,y) {return x+y;}, 0);
console.log(sum([1,2,3]));














/***** Stuff to practice *****

forEach
map
reduce
partial
Partial applications:
	add one to each elem of array
	square elements in array of arrays
negate
compose
op object: +, ==, ===, !
composing test functions
	isDefined
	isUndefined

	


*/












/****************************************************************
Eloquent JavaScript: Chapter 10
****************************************************************/


//   [ ] - "any of these characters"
//   [ ^ ] - invert. E.g. [^ABC] - "not A, B, or C"
//  ^ - at the beginning, $ - at the end
//  + - one or more.  e.g.  /a+/ - a string with one or more a chars
//  e.g. /^a+$/ - word consists entirely of a characters
//  \b - word boundary (punctuation, space, start/end of string)
//				e.g. /\bcat\b/.test('con,cat enate') > true
//  * - zero or more
//  ? - zero or one
//  		e.g. var parenthesizedText = /\(.*\)/;
//  {n} - exactly n times
//  {n1,n2} - between n1 and n2 times, inclusive
//  { , n2} - at most.  {n1, } - at least
//			e.g. var datePattern = /\d{1,2}\/\d\d?\/\d{4}/;
//  () to use on +, * on more than one character
//			in addition to the string, returns the part that matches the pattern in ()
//			IFF the "g" option is not used!
//			e.g. "Giant Ape".match(/giant (\w+)/i)
//  |  - choice between options
// 			e.g. var holyCow = /(sacred|holy) (cow|bovine|bull|taurus)/i;
//
//	$n - refers to the nth pair of ()s, can be used in replace
//			e.g. var names = "Picasso, Pablo\nGauguin, Paul\nVan Gogh, Vincent";
//						print(names.replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));
//	replace() - can pass function to 2nd arg!
//							arguments given: 1st - whole match, then each ()'ed part of pattern


/* Exercise 10.1
Write a RegExp for the form XX/XX/XXXX
*/

// console.log( "born 15/11/2003 (mother Spot): White Fang".match(/\d\d\/\d\d\/\d\d\d\d/) );

/* Exercise 10.2: Write pattern to match email addresses */
// var mailAddress = /\b[\w\.-]+@[\w\.-]+\.\w{2,3}\b/;
//		the second \b is to make sure it's actually 2-3 chars


// var parenthesized = prompt("Tell me something", "").match(/\((.*)\)/);
// if (parenthesized != null)
//   print("You parenthesized '", parenthesized[1], "'");




/* Exercise 10.2
====================
Re-write the function extractDate that we wrote in chapter 4. When given a string, this function looks for something that follows the date format we saw earlier. If it can find such a date, it puts the values into a Date object. Otherwise, it throws an exception. Make it accept dates in which the day or month are written with only one digit. */

// new Date(year, month_index_0, day);

function extractDate(str) {
	var datesExp = /\b(\d{4})\/(\d{1,2})\/(\d{1,2})\b/g
	var date = str.match(datesExp);
	if (date == null) throw new Error('No date found in string.');
	return new Date (Number(date[1]), Number(date[2]-1), Number(date[3]));
}




/* Exercise 10.4
=====================
Make escapeHTML more efficient with regular expressions, calling replace only once:
function escapeHTML(text) {
  var replacements = [["&", "&amp;"], ["\"", "&quot;"],
                      ["<", "&lt;"], [">", "&gt;"]];
  forEach(replacements, function(replace) {
    text = text.replace(replace[0], replace[1]);
  });
  return text;
}
*/

// function escapeHTML(text) { 
// 	var replacements = { "&": "&amp;", "\"": "&quot;",
// 												"<": "&lt;", ">": "&gt;"}; 
// 												
// 	return text.replace( /([&"<>])/g, function(ch) { return replacements[ch]; } );
// }



/*   Building RegExps from variables  */

// var badWords = ["ape", "monkey", "simian", "gorilla", "evolution"];
// var pattern = new RegExp(badWords.join("|"), "i");
// function isAcceptable(text) {
//   return !pattern.test(text);
// }

// var digits = new RegExp("\\d+");
// show(digits.test("101"));

































