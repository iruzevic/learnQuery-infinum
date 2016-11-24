var dom = function() {
  'use strict';

  var elementNotFound = 'Element Not Found';

  function remove(element) {

    if (!document.contains(element)) {
      return elementNotFound;
    }

    element.parentNode.removeChild(element);
  }

  function append(targetElement, element) {

    if (!document.contains(targetElement)) {
      return elementNotFound;
    }

    targetElement.appendChild(element);
  }

  function prepend(targetElement, element) {

    if (!document.contains(targetElement)) {
      return elementNotFound;
    }

    targetElement.insertBefore(element, targetElement.firstChild);

  }

  function after(targetElement, element) {

    if (!document.contains(targetElement)) {
      return elementNotFound;
    }

    targetElement.parentNode.insertBefore(element, targetElement.nextSibling);
  }

  function before(targetElement, element) {

    if (!document.contains(targetElement)) {
      return elementNotFound;
    }

    targetElement.parentNode.insertBefore(element, targetElement);

  }

  function val(targetElement) {

    var returnValue = '';
    if (typeof targetElement.value !== 'undefined') {
      returnValue = targetElement.value;
    }
    return returnValue;
  }

  return {
    remove: remove,
    append: append,
    prepend: prepend,
    after: after,
    before: before,
    val: val
  };
};
