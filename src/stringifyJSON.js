// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  //if number
  if (typeof obj === 'number') {
    return ('' + obj);
  }

  //if string
  if (typeof obj === 'string') {
    return ('"' + obj + '"');
  }
  
  if (obj === true || obj === false || obj === null) {
    return '' + obj + '';
  }

  //note different than null
  if (obj === undefined) {
    return obj;
  }

  // the actual interesting stuff
  if (typeof obj === 'object') {

    if (Array.isArray(obj)) {
      //check emptiness
      if (obj.length === 0) {
        return '[]';
      }
      //loop through array and append values
      let arr = '[';
      for (let i = 0; i < obj.length; i++) {
        arr += stringifyJSON(obj[i]);
        //add comma
        if (i !== obj.length - 1) {
          arr += ',';
        }
      }
      return arr += ']';
    } else {
    //object
      //empty object
      if (Object.entries(obj).length === 0) {
        return '{}';
      }

      let objStr = '{';
      let hasItem = false;
      for (let key in obj) {
        //check undefined
        if (stringifyJSON(obj[key]) !== undefined) {
          hasItem = true;
          objStr += '"' + key + '":' + stringifyJSON(obj[key]) + ',';
        }
      }
      if (hasItem) {
        //remove last comma
        objStr = objStr.substring(0, objStr.length - 1); 
      }
      return objStr += '}';
    }
  }
};