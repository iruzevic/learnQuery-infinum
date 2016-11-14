/*global affix, learnQuery*/

describe('LearnQuery', function() {
  'use strict';

  var $selectedElement, selectedElement, methods;

  beforeEach(function() {
    affix('.learn-query-testing #toddler .hidden.toy+h1[class="title"]+span[class="subtitle"]+input[name="toyName"][value="cuddle bunny"]+input[class="creature"][value="unicorn"]+.hidden+.infinum[value="awesome cool"]');

    $selectedElement = $('#toddler');
    selectedElement = $selectedElement.get(0);
  });

  it('should allow cssClass method chaining', function() {
    // code goes here
  });

  it('should allow dom method chaining', function() {
    // code goes here
  });

  it('should allow eventListener method chaining', function() {
    // code goes here
  });

  it('should allow multiple methods chaining', function() {
    // code goes here
  });
});
