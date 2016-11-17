function cssProp( htmlElement, cssProperty, value ) {
  'use strict';

  var el = '';

  //set values from object to style property
  function setStyleObject( htmlElement, propertyObject ) {

    var prop = '';

    for (prop in propertyObject) {
       if (propertyObject.hasOwnProperty(prop)) {
         htmlElement.style[prop] = propertyObject[prop];
       }
     }
  }

  function getPropertyValue(htmlElement, cssProperty){
    return window.getComputedStyle(htmlElement, null).getPropertyValue(cssProperty);
  }

  function getAllElementStyles(htmlElement){
    return htmlElement.style.cssText
  }

  if(!htmlElement){
    throw new Error('HTML Element not provided');
  }

  //check if object or property was passed as argument
  if( typeof cssProperty === 'object') {

    setStyleObject( htmlElement, cssProperty );

  }else{

    var cssPropertyObject = {};
    cssPropertyObject[cssProperty] = value

    if(value) {

      setStyleObject( htmlElement, cssPropertyObject );

    } else {

      if(cssProperty) {

        return getPropertyValue(htmlElement, cssProperty)

      } else {

        return getAllElementStyles(htmlElement);

      }
    }
  }
}
