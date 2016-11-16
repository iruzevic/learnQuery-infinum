function cssProp( htmlElement, cssProperty, value ) {
  'use strict';
  var el = '';

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
        el = window.getComputedStyle(htmlElement, null).getPropertyValue(cssProperty);

      } else {

        //if no property provider, return all style on element
        el = htmlElement.style.cssText;

      }


    }
  }

  return el;

  //set values from object to style property
  function setStyleObject( htmlElement, propertyObject ) {

    var prop = '';

    for (prop in propertyObject) {
       if (propertyObject.hasOwnProperty(prop)) {
         htmlElement.style[prop] = propertyObject[prop];
       }
     }
  }
}
