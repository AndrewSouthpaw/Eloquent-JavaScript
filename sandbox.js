


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

function forEach(array, func) {
	for (i = 0; i < array.length; i++) {
		func(array[i]);
	}
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


// function asArray(quasiArray, start) {
// 	var result = [];
// 	for (i = (start || 0); i < quasiArray.length; i++)
// 		result.push(quasiArray[i]);
// 	return result;
// }
// 
// function partial(func) {
// 	var fixedArgs = asArray(arguments, 1);
// 	return function() {
// 		return func.apply(null, fixedArgs.concat(arguments));
// 	};
// }


function partial(fn) {	// comes with potential arguments
  // A reference to the Array#slice method.
  var slice = Array.prototype.slice;
  // Convert arguments object to an array, removing the first argument.
  var args = slice.call(arguments, 1);

  return function() {
    // Invoke the originally-specified function, passing in all originally-
    // specified arguments, followed by any just-specified arguments.
    return fn.apply(this, args.concat(slice.call(arguments, 0)));
  };
}

var 







