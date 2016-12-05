// Dom selector functions
var domSelector = function(selectors) {
  'use strict';
  try {
    var selectedElement = document.querySelectorAll(selectors);
    var selectedElementArray = Array.prototype.slice.call(selectedElement);
    return selectedElementArray;
  } catch (e) {
    throw new Error('Invalid or non existing selector');
  }
};

// CSS manipulation functions
function setStyleObject(element, propertyObject) {
  'use strict';

  var prop = '';

  for (prop in propertyObject) {
    if (propertyObject.hasOwnProperty(prop)) {
      element.style[prop] = propertyObject[prop];
    }
  }
}

function getStylePropertyValue(element, cssPropertyValue) {
  'use strict';

  return window.getComputedStyle(element, null).getStylePropertyValue(
    cssPropertyValue);
}

function getAllElementStyles(element) {
  'use strict';

  return element.style.cssText;
}

// CSS Class Manipulation functions
function checkRequiredProperties(className) {
  'use strict';
  if (typeof className === 'undefined') {
    throw new Error('Class Name not provided');
  }
}



function learnQuery(elementsSelector) {
  'use strict';

  if (!elementsSelector) {
    throw new Error('Selector not provided!');
  }

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

    cssProp: function(htmlElement, cssProperty, value) {
      'use strict';

      if (!htmlElement) {
        throw new Error('HTML Element not provided');
      }

      // check if object or property was passed as argument
      if (typeof cssProperty === 'object') {

        setStyleObject(htmlElement, cssProperty);
        return this;

      } else {

        var cssPropertyObject = {};
        cssPropertyObject[cssProperty] = value;

        if (value) {

          setStyleObject(htmlElement, cssPropertyObject);
          return this;

        } else if (cssProperty) {

          return getStylePropertyValue(htmlElement, cssProperty);

        } else {

          return getAllElementStyles(htmlElement);

        }

      }
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
    },

    ajaxReq: function(url, options) {
      'use strict';

      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return false;
      }

      function doAjaxReq() {

        var ajaxRequest = httpRequest;
        var ajaxStatus = httpRequest.status;
        var context = options.context;

        if (httpRequest.readyState === 4) {
          var data = JSON.parse(ajaxRequest.responseText);
          if (ajaxStatus === 200) {
            if (typeof options.success !== 'undefined') {
              options.success.call(context, data, ajaxStatus, ajaxRequest);
            }
          } else if (typeof options.failure !== 'undefined') {
            options.failure.call(context, data, ajaxStatus, ajaxRequest);
          }
          if (typeof options.complete !== 'undefined') {
            options.complete.call(context, data, ajaxRequest);
          }
        }
      }

      var method = options.method;
      if (options.method !== 'POST') {
        method = 'GET';
      }

      httpRequest.onreadystatechange = doAjaxReq;
      httpRequest.open(method, url);
      httpRequest.send(options.data);

      return httpRequest;
    }


  };

}
