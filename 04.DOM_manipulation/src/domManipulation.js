var dom = function() {
  'use strict';

  function remove(element) {

    if (document.contains(element) === false) {
      return null;
    }

    element.parentNode.removeChild(element);
  }

  function append(targetElement, element) {

    if (document.contains(targetElement) === false) {
      return null;
    }

    targetElement.appendChild(element);
  }

  function prepend(targetElement, element) {

    if (document.contains(targetElement) === false) {
      return null;
    }

    targetElement.insertBefore(element, targetElement.firstChild);

  }

  function after(targetElement, element) {

    if (document.contains(targetElement) === false) {
      return null;
    }

    targetElement.parentNode.insertBefore(element, targetElement.nextSibling);
  }

  function before(targetElement, element) {

    if (document.contains(targetElement) === false) {
      return null;
    }

    targetElement.parentNode.insertBefore(element, targetElement);

  }

  function val(targetElement) {

    if (document.contains(targetElement) === false) {
      return null;
    }

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
