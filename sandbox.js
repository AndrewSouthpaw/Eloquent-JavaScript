function longestWord(sen) { 
	return sen.match(/\w+/g)
						.sort(function(a, b) { 
							return b.length - a.length; 
						})[0];
}


function LetterCapitalize(str) {
	var words = str.split(" ");
	for (i = 0; i < words.length; i++) {
		words[i] = words[i][0].toUpperCase() + words[i].substr(1, words[i].length);
	}
	return words.join(" ");
}

function LetterCapitalize3(str) {
	return str.replace(/\w\S*/g, function(txt) { return txt[0].toUpperCase() + txt.substr(1); });
}


function LetterCapitalize2(str) { 
//var str = str.replace(/\s/,toUpperCase);
  // code goes here  
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
         
}



function NumberAddition(str) { 

  return str.split(/\D/g)
            .reduce(function(total, cur) {
              return total += (+cur);
            }, 0);
         
}


/**
SimpleSymbols
====================

Using the JavaScript language, have the function SimpleSymbols(str) take the str parameter being passed and determine if it is an acceptable sequence by either returning the string true or false. The str parameter will be composed of + and = symbols with several letters between them (ie. ++d+===+c++==a) and for the string to be true each letter must be surrounded by a + symbol. So the string to the left would be false. The string will not be empty and will have at least one letter. 
*/

function SimpleSymbols(str) { 

  var ch;
  for (i = 0; i < str.length; i++) {
    ch = str[i];
    if (/[A-z]/.test(ch)) {
      if (i == 0 || str[i - 1] !== '+' || str[i + 1] !== '+') {
        return false;
      }
    }
  }
  return true;
         
}

/**
ABCheck
=====================
have the function ABCheck(str) take the str parameter being passed and return the string true if the characters a and b are separated by exactly 3 places anywhere in the string at least once (ie. "lane borrowed" would result in true because there is exactly three characters between a and b). Otherwise return the string false. 
*/

function ABCheck(str) { 

  return /a...b/i.test(str);
         
}



/**
RunLength
=====================
*/

function RunLength(str) { 

  var result = "";
  for (i = 0; i < str.length; ) {
    result += str.slice(i).match(new RegExp(str[i] + '*'))[0].length + str[i];
     i += (+result[result.length - 2]);
  }
  return result;
         
}


function RunLength2(str) {
	return str.replace(/([a-z])\1*/g, function(elem) {
		return elem.length + elem[0];
	});
}




/*
ArithGeoII
=======================
*/

function seqRecur(compare, arr, diff) {
  if (arr.length < 2) return true;
  if (compare(arr[0],arr[1]) === diff) 
    return seqRecur(compare, arr.slice(1), diff);
  else return false;
}

function ArithGeoII(arr) {
  if (arr.length < 3) return -1;
  if (seqRecur(function (a,b) { return b - a; }, arr, (arr[1] - arr[0]))) return "Arithmetic";
  if (seqRecur(function (a,b) { return b / a; }, arr, (arr[1] / arr[0]))) return "Geometric";
  return -1;
}


/****

function numRepeats(str) {
  var charCounts = str
    .split("")
    .map(function(char){
      return str.match(new RegExp(char,'g')).length;
    });

  return Math.max.apply(null, charCounts);
}



function LetterCountI(str) {

  var sortedWords = str
    .replace(/([^\w ])/g, "")
    .split(" ")
    .sort(function(a, b) { return numRepeats(b) - numRepeats(a); });

  return (numRepeats(sortedWords[0]) > 1) ? sortedWords[0] : -1;
         
}


***/




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















