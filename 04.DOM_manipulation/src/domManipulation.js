var dom = function() {
  'use strict';

  function checkRequiredProperties(targetElement, element) {
    if (typeof targetElement === 'undefined') {
      throw new Error('not provided');
    }
    if (typeof element === 'undefined') {
      throw new Error('not provided');
    }
  }

  function remove(element) {

    checkRequiredProperties(false, element);

    element.parentNode.removeChild(element);

  }

  function append(targetElement, element) {

    checkRequiredProperties(targetElement, element);

    targetElement.appendChild(element);
  }

  function prepend(targetElement, element) {

    checkRequiredProperties(targetElement, element);

    targetElement.insertBefore(element, targetElement.firstChild);

  }

  function after(targetElement, element) {

    checkRequiredProperties(targetElement, element);

    targetElement.parentNode.insertBefore(element, targetElement.nextSibling);
  }

  function before(targetElement, element) {

    checkRequiredProperties(targetElement, element);

    targetElement.parentNode.insertBefore(element, targetElement);

  }

  function val(targetElement) {

    checkRequiredProperties(targetElement, false);

    return targetElement.value;

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
