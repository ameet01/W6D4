const DOMNodeCollection = require('./dom_node_collection');


window.$l = function(selector) {
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