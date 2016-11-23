var cssClass = (function() {
  'use strict';

  function checkRequieredProperties(requiredPropertiesObject) {
    for (var key in requiredPropertiesObject) {
      if (typeof requiredPropertiesObject[key] === 'undefined') {
        switch (key) {
          case 'htmlElement':
            throw new Error('HTML Element not provided');
          case 'className':
            throw new Error('Class Name not provided');
          default:
            break;
        }
      }
    }
  }

  function add(htmlElement, className) {

    var requiredProperties = {
      htmlElement: htmlElement,
      className: className
    };

    checkRequieredProperties(requiredProperties);

    htmlElement.classList.add(className);

  }

  function remove(htmlElement, className) {

    var requiredProperties = {
      htmlElement: htmlElement,
      className: className
    };

    checkRequieredProperties(requiredProperties);

    htmlElement.classList.remove(className);

  }

  function toggle(htmlElement, className) {

    var requiredProperties = {
      htmlElement: htmlElement,
      className: className
    };

    checkRequieredProperties(requiredProperties);

    htmlElement.classList.toggle(className);

  }

  function has(htmlElement, className) {

    var requiredProperties = {
      htmlElement: htmlElement,
      className: className
    };

    checkRequieredProperties(requiredProperties);

    return htmlElement.classList.contains(className);

  }

  return {
    add: add,
    remove: remove,
    toggle: toggle,
    has: has
  };

})();
