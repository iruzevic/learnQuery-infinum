// set values from object to style property
function setStyleObject(element, propertyObject) {
  'use strict';

  var prop = '';

  for (prop in propertyObject) {
    if (propertyObject.hasOwnProperty(prop)) {
      element.style[prop] = propertyObject[prop];
    }
  }
}

function getPropertyValue(element, cssPropertyValue) {
  'use strict';

  return window.getComputedStyle(element, null).getPropertyValue(
    cssPropertyValue);
}

function getAllElementStyles(element) {
  'use strict';

  return element.style.cssText;
}

function cssProp(htmlElement, cssProperty, value) {
  'use strict';

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
