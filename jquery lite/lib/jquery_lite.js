/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);


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


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class DOMNodeCollection {
  constructor(htmlelements) {
    this.elements = htmlelements;
  }

  html(string) {
    if(string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = string;
      }
    }
  }
  
  empty() {
    this.html("");
  }
  
  append(arg){
    if (arg instanceof HTMLElement) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML += arg.outerHTML;
      }  
    } else if (typeof arg === "string") {
        for (var j = 0; j < this.elements.length; j++) {
          this.elements[j].innerHTML += arg;
        }
    } else if (arg instanceof DOMNodeCollection ) {
      for (var i = 0; i < arg.elements.length; i++) {
        for (var j = 0; j < this.elements.length; j++) {
          this.elements[j].innerHTML += arg.elements[i];
        }
      }
    }
  }
  
  attr(attribute, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(attribute);
    } else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attribute, value);
      }  
    }
  }
  
  addClass(value){
    for (var i = 0; i < this.elements.length; i++) {
      if (!this.elements[i].className) {
        this.elements[i].className = value;
      } else {
        this.elements[i].className += " " + value;
      }
    }
  }
  
  removeClass(value){
    for (var i = 0; i < this.elements.length; i++) {
      var array = this.elements[i].className.split(' ');
      array = array.filter(function(el) {
        return el !== value;
      })
      this.elements[i].className = array.join(' ');
    }
  }
  
  children() {
    var children = [];
    for (var i = 0; i < this.elements.length; i++) {
      var child = Array.from(this.elements[i].children);
      children = children.concat(child);
    }
    var result = new DOMNodeCollection(children);
    return result;
  }
  
  parent() {
    var parent = [];
    for (var i = 0; i < this.elements.length; i++) {
      var p = [this.elements[i].parentElement];
      if(!parent.some((el) => el.isEqualNode(p[0]))) {
        parent = parent.concat(p);
      }
    }
    var result = new DOMNodeCollection(parent);
    return result;
  }
  
  find(selector) {
    var array = [];
    
    for (var i = 0; i < this.elements.length; i++) {
      var items = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(items);
    }
    
    var result = new DOMNodeCollection(array);
    return result;
  }
  
  remove() {
    this.empty();
    this.elements = undefined;
  }
  
  on(event, cb){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(event, cb);
      this.elements[i].event = cb;
    }
  }
  
  
  
  off(event){
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(event, this.elements[i].event);
      this.elements[i].event = undefined;
    }
  }
  
}



module.exports = DOMNodeCollection;



/***/ })
/******/ ]);