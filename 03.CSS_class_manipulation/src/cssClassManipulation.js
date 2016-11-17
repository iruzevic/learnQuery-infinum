var cssClass = (function() {
  'use strict';

  // code goes here
  function add(htmlElement, className) {

    if(!htmlElement){
      throw new Error('HTML Element not provided');
    }

    if(!className){
      throw new Error('Class Name not provided');
    }

    htmlElement.classList.add(className);

  }

  function remove(htmlElement, className) {

    if(!htmlElement){
      throw new Error('HTML Element not provided');
    }

    if(!className){
      throw new Error('Class Name not provided');
    }

    htmlElement.classList.remove(className);

  }

  function toggle(htmlElement, className) {

    if(!htmlElement){
      throw new Error('HTML Element not provided');
    }

    if(!className){
      throw new Error('Class Name not provided');
    }

    htmlElement.classList.toggle(className);

  }

  function has(htmlElement, className) {

    if(!htmlElement){
      throw new Error('HTML Element not provided');
    }

    if(!className){
      throw new Error('Class Name not provided');
    }

    return htmlElement.classList.contains(className);

  }

  return{
    add:    add,
    remove: remove,
    toggle: toggle,
    has:    has
  }

})();
