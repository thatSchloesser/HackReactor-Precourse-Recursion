// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  //set elements to loop through based on where it is called from
  var elements;
  var result = [];
  if (arguments[1]) {
  	elements = arguments[1];
  } else {
  	elements = document.body.childNodes;
  	//check body edge case
  	if (document.body.className === className) {
  	  result.push(document.body);
  	}
  }

  //loop through elements and store matches
  for (let i =0; i< elements.length; i++) {
    //check for className
    if (elements[i].className){
      //note: there could be multiple classes
      if (elements[i].className.includes(className)) {  //IMPROVEMENT NOTE: this is a time suck
	    result.push(elements[i]);
	  }
    }

    //recursively check on childNodes
    if (elements[i].childNodes.length > 0) {
      var children = getElementsByClassName(className, elements[i].childNodes);
      //push matching children into array:
      for (let j=0; j<children.length; j++) {
        result.push(children[j]);
      }
    }
  }
  
  return result;
};
