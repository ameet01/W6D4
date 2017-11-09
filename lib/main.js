const DOMNodeCollection = require('./dom_node_collection');


window.$l = function(selector) {
  if(typeof selector === 'string') {
    let nodeList = Array.from(document.querySelectorAll(selector));
    var dom_node = new DOMNodeCollection(nodeList);
    return dom_node;
  } else if(selector instanceof HTMLElement) {
    var nodeList = new DOMNodeCollection([selector]);
    return nodeList;
  }
}