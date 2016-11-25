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

    jasmine.Ajax.stubRequest('/infinum/notfound').andReturn({
      status: 404,
      responseText: '{ "response": "not found" }'
    });
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should make a successful ajax request', function() {
    var ajax = ajaxReq('/infinum/index', {
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy
    });

    expect(ajax.status).toBe(200);
    expect(ajax.responseText).toBe(
      '{ "response": "incredible cool things" }');
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should make POST ajax request', function() {
    ajaxReq('/infinum/index', {
      method: 'POST',
      success: this.onSuccessSpy,
      complete: this.onCompleteSpy,
      failure: this.onFailureSpy,
      data: {
        response: 'incredible cool things'
      }
    });

    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(jasmine.Ajax.requests.mostRecent().params.response).toBe(
      'incredible cool things');
    expect(this.onSuccessSpy).toHaveBeenCalled();
    expect(this.onFailureSpy).not.toHaveBeenCalled();
    expect(this.onCompleteSpy).toHaveBeenCalled();
  });

  it('should call a custom function with proper context on failure',
    function(done) {

      var context = {
        test: 'test'
      };

      var onFailureCall = function(data, textStatus) {
        expect(textStatus).toBe(404);
        expect(data.response).toBe('not found');
        expect(this).toBe(context);
        done();
      };

      ajaxReq('/infinum/notfound', {
        context: context,
        success: this.onSuccessSpy,
        failure: onFailureCall,
        complete: this.onCompleteSpy
      });

      expect(this.onSuccessSpy).not.toHaveBeenCalled();
      expect(this.onCompleteSpy).toHaveBeenCalled();

    });

  it('should call a custom function with proper context on success',
    function(done) {

      var context = {
        test: 'test'
      };

      var onSuccessCall = function(data, textStatus) {
        expect(textStatus).toBe(200);
        expect(data.response).toBe('incredible cool things');
        expect(this).toBe(context);
        done();
      };

      ajaxReq('/infinum/index', {
        context: context,
        success: onSuccessCall,
        failure: this.onFailureSpy,
        complete: this.onCompleteSpy
      });

      expect(this.onCompleteSpy).toHaveBeenCalled();
      expect(this.onFailureSpy).not.toHaveBeenCalled();
    });

  it(
    'should call a custom function with proper context when request is completed',
    function(done) {

      var context = {
        test: 'test'
      };

      var onCompleteCall = function(data) {
        expect(data.response).toBe('incredible cool things');
        expect(this).toBe(context);
        done();
      };

      ajaxReq('/infinum/index', {
        context: context,
        success: this.onSuccessSpy,
        failure: this.onFailureSpy,
        complete: onCompleteCall
      });

      expect(this.onSuccessSpy).toHaveBeenCalled();
      expect(this.onFailureSpy).not.toHaveBeenCalled();
    });
});
