function cssProp(htmlElement, cssProperty, value) {
  'use strict';

  // set values from object to style property
  function setStyleObject(element, propertyObject) {

    var prop = '';

    for (prop in propertyObject) {
      if (propertyObject.hasOwnProperty(prop)) {
        element.style[prop] = propertyObject[prop];
      }
    }
  }

  function getPropertyValue(element, cssPropertyValue) {
    return window.getComputedStyle(element, null).getPropertyValue(
      cssPropertyValue);
  }

  function getAllElementStyles(element) {
    return element.style.cssText;
  }

  if (!htmlElement) {
    throw new Error('HTML Element not provided');
  }

  // check if object or property was passed as argument
  if (typeof cssProperty === 'object') {

    setStyleObject(htmlElement, cssProperty);

  } else {

    var cssPropertyObject = {};
    cssPropertyObject[cssProperty] = value;

    if (value) {

      setStyleObject(htmlElement, cssPropertyObject);

    } else if (cssProperty) {

      return getPropertyValue(htmlElement, cssProperty);

    } else {

      return getAllElementStyles(htmlElement);

    }

  }
}
