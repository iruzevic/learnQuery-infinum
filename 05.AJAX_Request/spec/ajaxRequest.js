/*global ajaxReq*/

describe('AjaxRequest', function() {
  'use strict';

  beforeEach(function() {
    jasmine.Ajax.install();

    this.onSuccessSpy = jasmine.createSpy('success');
    this.onFailureSpy = jasmine.createSpy('failure');
    this.onCompleteSpy = jasmine.createSpy('complete');

    jasmine.Ajax.stubRequest('/infinum/index').andReturn({
      status: 200,
      responseText: '{ "response": "incredible cool things" }'
    });
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should make a successful ajax request', function() {
    ajaxReq('/infinum/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy
    });

    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should make POST ajax request', function() {
    var test = ajaxReq('/infinum/index', {
      method: 'POST',
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy
    });

    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should call a custom function with proper context on failure',
    function() {

      var context = {
        newContext: 'Test'
      };

      var onFailure = function(xhr, status, responseText) {
        expect(status).toBe(null);
        expect(responseText).toBe('failure');
        expect(this).toBe(context);
        expect(this.newContext).toBe('Test');
      };

      var methods = {
        onFailure: onFailure
      };

      spyOn(methods, 'onFailure').and.callFake(onFailure);

      ajaxReq('/infinum/notfound', {
        success: this.onSuccessSpy,
        failure: methods.onFailure,
        complete: this.onCompleteSpy,
        context: context
      });

      expect(methods.onFailure).toHaveBeenCalled();
      expect(this.onCompleteSpy).toHaveBeenCalled();
      expect(this.onSuccessSpy).not.toHaveBeenCalled();

    });

  it('should call a custom function with proper context on success',
    function() {
      var context = {
        newContext: 'Test'
      };

      var onSuccess = function(data, status, xhr) {
        expect(status).toBe(200);
        expect(data.response).toBe('incredible cool things');
        expect(this).toBe(context);
        expect(this.newContext).toBe('Test');
      };

      var methods = {
        onSuccess: onSuccess
      };

      spyOn(methods, 'onSuccess').and.callFake(onSuccess);

      ajaxReq('/infinum/index', {
        success: methods.onSuccess,
        failure: this.onFailureSpy,
        complete: this.onCompleteSpy,
        context: context
      });

      expect(methods.onSuccess).toHaveBeenCalled();
      expect(this.onCompleteSpy).toHaveBeenCalled();
      expect(this.onFailureSpy).not.toHaveBeenCalled();
    });

  it(
    'should call a custom function with proper context when request is completed',
    function() {

      var context = {
        newContext: 'Test'
      };

      var onComplete = function() {
        expect(this).toBe(context);
        expect(this.newContext).toBe('Test');
      };

      var methods = {
        onComplete: onComplete
      };

      spyOn(methods, 'onComplete').and.callFake(onComplete);

      ajaxReq('/infinum/index', {
        success: methods.onComplete,
        failure: this.onFailureSpy,
        complete: this.onCompleteSpy,
        context: context
      });

      expect(methods.onComplete).toHaveBeenCalled();
    });
});
