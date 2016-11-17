var eventListener = (function() {
  'use strict';

  var eventList = {};

	var setAddEventListenerList = function(element, event, callback){

		if(!eventList[element]){
			eventList[element]=[];
		}
    console.log(eventList);
		if(!eventList[element][event]){
			eventList[element][event]=[];
		}
		eventList[element][event].push(callback);
	};

  var checkForEventListener = function(element, event, fun){
		if(!eventList || !eventList[element] || !eventList[element][event]){
			return false;
		}
		for(var i=0; i<eventList[element][event].length; i++){
			if(eventList[element][event][i]===fun){
				return true;
			}
		}
		return false;
	};

	var addTheSameEventListener = function(element, event, fun){
		var old;
		if(!element["on"+event]){
			old=function(){};
		}else{
			old = element["on"+event];
		}
		element["on"+event]=function(){
			old(); fun();
		};
	};

  return {
    on: function(element, event, callback){

      element.addEventListener(event, callback);

      setAddEventListenerList(element,event, callback);

      // if(checkForEventListener(element, event, callback)){
			// 	addTheSameEventListener(element, event, callback);
			// }else{
			// 	element.addEventListener(event, callback);
			// }
			// addEventListenerList(element,event,callback);
    }
  }
})();
