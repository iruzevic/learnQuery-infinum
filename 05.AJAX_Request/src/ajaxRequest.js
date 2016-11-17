function ajaxReq(url, options) {
  'use strict';

  var method = '';

  if(!options.method){
    method = 'GET'
  }else{
    method = options.method;
  }

  // setup callbacks
  if (typeof options.failure != 'function'){
    options.failure = function () {};
  }

  if (typeof options.complete != 'function'){
    options.complete = function () {};
  }

  // ajax init start
  var httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    return false;
  }

  httpRequest.open(method, url, true);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState == 4){
        if(httpRequest.status === 200){
          options.success(this)
        }else{
          options.failure(this)
        }
        console.log(this);
    }
  }

  options.complete(this);

  httpRequest.send(null);

  return httpRequest;
}
