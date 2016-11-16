var dom = function(){
  'use strict';

  function remove(element){

    element.parentNode.removeChild(element);

  }

  function append(targetElement, element) {
      var newElement = document.createElement(element);
      targetElement.appendChild(newElement);
  }

  function prepend(targetElement, element) {

      var newElement = document.createElement(element);
      targetElement.insertBefore(newElement, targetElement.firstChild);

  }

  return {
    remove: remove,
    append: append,
    prepend: prepend
  }
};
