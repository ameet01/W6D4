
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

