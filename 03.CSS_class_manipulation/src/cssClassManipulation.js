var cssClass = (function() {
  'use strict';

  function checkRequiredProperties(htmlElement, className) {
    if (typeof htmlElement === 'undefined') {
      throw new Error('HTML Element not provided');
    }
    if (typeof className === 'undefined') {
      throw new Error('Class Name not provided');
    }
  }

  function add(htmlElement, className) {

    checkRequiredProperties(htmlElement, className);

    htmlElement.classList.add(className);

  }

  function remove(htmlElement, className) {

    checkRequiredProperties(htmlElement, className);

    htmlElement.classList.remove(className);

  }

  function toggle(htmlElement, className) {

    checkRequiredProperties(htmlElement, className);

    htmlElement.classList.toggle(className);

  }

  function has(htmlElement, className) {

    checkRequiredProperties(htmlElement, className);

    return htmlElement.classList.contains(className);

  }

  return {
    add: add,
    remove: remove,
    toggle: toggle,
    has: has
  };

})();
