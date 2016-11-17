var dom = function(){
  'use strict';

  function remove(element){

    if(!element){
      throw new Error('target element not provided or not in dom');
    }

    element.parentNode.removeChild(element);

  }

  function append(targetElement, element) {

      if(!targetElement){
        throw new Error('target element not provided or not in dom');
      }

      if(!element){
        throw new Error('element not provided');
      }

      var newElement = document.createElement(element);
      targetElement.appendChild(newElement);
  }

  function prepend(targetElement, element) {

      if(!targetElement){
        throw new Error('target element not provided or not in dom');
      }

      if(!element){
        throw new Error('element not provided');
      }

      var newElement = document.createElement(element);
      targetElement.insertBefore(newElement, targetElement.firstChild);

  }

  function after(targetElement, element) {

    if(!targetElement){
      throw new Error('target element not provided or not in dom');
    }

    if(!element){
      throw new Error('element not provided');
    }

    var newElement = document.createElement(element);
    targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);

  }

  function before(targetElement, element) {

    if(!targetElement){
      throw new Error('target element not provided or not in dom');
    }

    if(!element){
      throw new Error('element not provided');
    }

    var newElement = document.createElement(element);
    targetElement.parentNode.insertBefore(newElement, targetElement);

  }

  function val(targetElement) {

    if(!targetElement){
      throw new Error('target element not provided or not in dom');
    }

    return targetElement.value;

  }

  return {
    remove:   remove,
    append:   append,
    prepend:  prepend,
    after:    after,
    before:   before,
    val:      val
  }
};
