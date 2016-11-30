function learnQuery(elementsSelector) {
  'use strict';

  if (!elementsSelector) {
    throw new Error('Selector not provided!');
  }

  function checkRequiredProperties(className) {
    if (typeof className === 'undefined') {
      throw new Error('Class Name not provided');
    }
  }

  var domSelector = function(selectors) {
    try {
      var selectedElement = document.querySelectorAll(selectors);
      var selectedElementArray = Array.prototype.slice.call(selectedElement);
      return selectedElementArray;
    } catch (e) {
      throw new Error('Invalid or non existing selector');
    }
  };

  var htmlElement = domSelector(elementsSelector);
  htmlElement = htmlElement[0];

  return {
    addClass: function(className) {
      checkRequiredProperties(className);
      htmlElement.classList.add(className);
      return this;
    },
    removeClass: function(className) {
      checkRequiredProperties(className);
      htmlElement.classList.remove(className);
      return this;
    },
    toggleClass: function(className) {
      checkRequiredProperties(className);
      htmlElement.classList.toggle(className);
      return this;
    },
    hasClass: function(className) {
      checkRequiredProperties(className);
      return htmlElement.classList.contains(className);
    },
    remove: function(element) {

      if (document.contains(element) === false) {
        return null;
      }

      element.parentNode.removeChild(element);
    },
    append: function(element) {

      if (document.contains(htmlElement) === false) {
        return null;
      }

      htmlElement.appendChild(element);

      return this;
    },
    prepend: function(element) {

      if (document.contains(htmlElement) === false) {
        return null;
      }

      htmlElement.insertBefore(element, htmlElement.firstChild);

      return this;
    },
    after: function(element) {

      if (document.contains(htmlElement) === false) {
        return null;
      }

      htmlElement.parentNode.insertBefore(element, htmlElement.nextSibling);

      return this;
    },
    before: function(element) {

      if (document.contains(htmlElement) === false) {
        return null;
      }

      htmlElement.parentNode.insertBefore(element, htmlElement);

      return this;
    },
    val: function() {

      if (document.contains(htmlElement) === false) {
        return null;
      }

      var returnValue = '';
      if (typeof htmlElement.value !== 'undefined') {
        returnValue = htmlElement.value;
      }
      return returnValue;
    }
  };

}
