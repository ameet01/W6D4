const DOMNodeCollection = require('./dom_node_collection');


window.$l = function(selector = undefined) {
  if(typeof selector === 'string') {
    let nodeList = Array.from(document.querySelectorAll(selector));
    var dom_node = new DOMNodeCollection(nodeList);
    return dom_node;
  } else if(selector instanceof HTMLElement) {
    var nodeList = new DOMNodeCollection([selector]);
    return nodeList;
  } else if(typeof selector === 'function') {
    var args = Array.prototype.slice.call(arguments);
    var array = [];
    for (var i = 0; i < args.length; i++) {
      array.push(args[i]);
    }
    if (document.readyState === "complete" || document.readyState === "loaded") {
      for (var i = 0; i < array.length; i++) {
        array[i]();
      }
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        for (var i = 0; i < array.length; i++) {
          array[i]();
        }
      });
    }
  }
}


$l.extend = function() {
  var args = Array.prototype.slice.call(arguments);
  var hash = {};
  
  for(var i = 0; i < args.length; i++) {
    var object = args[i];
    for(var j in object) {
      hash[j] = object[j];
    }
  }
  
  return hash;
}

$l.ajax = function(options) {
  let defaults = {
    method: 'GET',
    success(data) { console.log(data) },
    error() { alert('error') },
    url: location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  
  var options = this.extend(defaults, options);
  console.log(options);
  const xhr = new XMLHttpRequest();
  
  xhr.open(options.method, options.url);
  
  xhr.onload = function () {
    options.success(xhr.response);
    console.log(xhr.status) // for status info
    console.log(xhr.responseType) //the type of data that was returned
  }
  
  xhr.send(options.data);
}
