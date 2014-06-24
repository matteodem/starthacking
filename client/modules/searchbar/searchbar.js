var searchTermCache = '';

Template.searchbar.created = function () {
  Session.setDefault('searchMode', 'search');
};

Template.searchbar.helpers({
  'interaction' : function () {
    return Session.get('searchMode');
  },
  'positionClass' : function () {
    if (Session.equals('searchMode', 'loading') || Session.equals('searchMode', 'lightbulb')) {
      return 'left';
    }
  }
});

Template.searchbar.events({
  'keyup #globalSearchbar input' : function (e) {
    var searchValue = $(e.target).val().compact();

    if (searchTermCache === searchValue) {
      return;
    }

    if (searchValue.length > 0) {
      Session.set('searchMode', 'loading');
      searchTermCache = searchValue;
      // TODO: Meteor.Collection.initEasySearch(fields, limit) ?
      // TODO: Meteor.Collection.easySearchCallbacks() ?
      setTimeout(function () { Session.set('searchMode', 'lightbulb'); }, 1000);
    } else {
      Session.set('searchMode', 'search');
    }
  }
});
