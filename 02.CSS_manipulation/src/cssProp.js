function cssProp( htmlElement, cssProperty, value ) {
  'use strict';
  var el = getHtmlSelector( htmlElement );

  //check if object or property was passed as argument
  if( typeof cssProperty === 'object'){
    setStyleObject( htmlElement, cssProperty );
  }else{

    var cssPropertyObject = new Object();
    cssPropertyObject[cssProperty] = value

    //check if value isset
    if(typeof value !== 'undefined'){

      setStyleObject( htmlElement, cssPropertyObject );

    }else{

      el = getStylePropertyValue(htmlElement, cssProperty);

    }
  }
 
  return el;

  //set values from object to style property
  function setStyleObject( htmlElement, propertyObject ){

   var el = getHtmlSelector( htmlElement )[0];
   var prop = '';

   for (prop in propertyObject) {
      if (propertyObject.hasOwnProperty(prop)) {
        el.style[prop] = propertyObject[prop];
      }
    }
  }

  //get style value from property key
  function getStylePropertyValue(htmlElement, cssProperty){
    var el = getHtmlSelector( htmlElement )[0];
    return el.style[cssProperty]
  }
}


function toArray(nl) {
    for(var a=[], l=nl.length; l--; a[l]=nl[l]);
    return a;
}

function getHtmlSelector( selectors ){

  var selector = document.querySelectorAll( selectors );

  return toArray(selector);
}
