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

//Event Listeners
var setEventListenersList = function(element, eventList, event, callback) {
  'use strict';
  if (!eventList[element]) {
    eventList[element] = [];
  }
  if (!eventList[element][event]) {
    eventList[element][event] = [];
  }
  eventList[element][event].push(callback);
};

var getEventTarget = function(e) {
  'use strict';
  return e.target || e.srcElement;
};

var getEventPath = function(e) {
  'use strict';
  return e.path;
};


function learnQuery(elementsSelector) {
  'use strict';

  if (!elementsSelector) {
    throw new Error('Selector not provided!');
  }

  var eventList = [];

  var htmlElement = domSelector(elementsSelector);
  htmlElement = htmlElement[0];

  return {

    // CSS manipulation functions
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

    // CSS Class Manipulation functions
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

    //DOM Manipulation
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

    //Ajax Request
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
    },

    //Event Listeners
    on: function(event, callback) {

      if (!htmlElement) {
        throw new Error('Element not provided');
      }

      if (!eventList || !eventList[htmlElement] || !eventList[htmlElement][
          event
        ]) {

        htmlElement.addEventListener(event, function(e) {
          if (typeof eventList[htmlElement][event] !== 'undefined') {
            eventList[htmlElement][event].forEach(function(call) {
              call(e);
            });
          }
        });

      }

      setEventListenersList(htmlElement, eventList, event, callback);
      return this;
    },
    trigger: function(event) {

      var eventObject = new Event(event);
      htmlElement.dispatchEvent(eventObject);
      return this;

    },
    off: function(event, callback) {

      if (!htmlElement) {
        throw new Error('Element not provided');
      }

      if (!callback && !event) {

        eventList[htmlElement] = {};

      } else if (!callback) {

        eventList[htmlElement][event] = [];

      } else {

        var callbackIndex = eventList[htmlElement][event].indexOf(callback);

        if (callbackIndex !== -1) {
          eventList[htmlElement][event].splice(callbackIndex, 1);
        }

      }
      return this;
    },
    delegate: function(className, event, callback) {
      learnQuery(elementsSelector).on(event, function(e) {

        var path = getEventPath(e);
        var target = getEventTarget(e);

        if (className === '') {
          return false;
        }

        for (var pathItem of path) {
          if (pathItem === htmlElement) {
            break;
          }

          if (pathItem.classList.contains(className)) {
            return callback(e);
          }
        }
      });
    }

  };

}
