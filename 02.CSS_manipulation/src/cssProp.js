function cssProp( htmlElement, cssProperty, value ) {
  'use strict';
  var el = getHtmlSelector( htmlElement );

  //check if object or property was passed as argument
  if( typeof cssProperty === 'object') {
    setStyleObject( htmlElement, cssProperty );
  }else{

    var cssPropertyObject = new Object();
    cssPropertyObject[cssProperty] = value

    //check if value isset
    if(typeof value !== 'undefined') {

      setStyleObject( htmlElement, cssPropertyObject );

    } else {

      if(typeof cssProperty !== 'undefined') {

        //get property value
        el = getStylePropertyValue(htmlElement, cssProperty);

      } else {

        //if no property provider, return all style on element
        el = el[0].style.cssText;

      }


    }
  }

  return el;

  //set values from object to style property
  function setStyleObject( htmlElement, propertyObject ) {

    var el = getHtmlSelector( htmlElement )[0];
    var prop = '';

    for (prop in propertyObject) {
       if (propertyObject.hasOwnProperty(prop)) {
         el.style[prop] = propertyObject[prop];
       }
     }
  }

  //get style value from property key
  function getStylePropertyValue(htmlElement, cssProperty) {
    var el = getHtmlSelector( htmlElement )[0];
    return el.style[cssProperty]
  }
}

function getHtmlSelector(selectors) {

  try {
    var selectedElement = document.querySelectorAll(selectors);
    var selectedElementArray = Array.prototype.slice.call(selectedElement);
    return selectedElementArray;
  } catch (e) {
    throw new Error('Invalid or non existing selector');
  }
}
