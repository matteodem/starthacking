var searchTermCache = '';

Session.setDefault('searchMode', 'initial');

Template.searchbar.created = function () {
  Deps.autorun(function () {
    if (EasySearch.ComponentVariables.get('resources', 'searchingDone')) {
      Session.set('searchMode', 'done');
    }
  });
};

Template.searchbar.helpers({
  'inputIconClass' : function () {
    switch (Session.get('searchMode')) {
      case 'initial':
        return 'search';
      case 'searching':
        return 'loading';
      case 'done':
        return 'lightbulb';
    }
  },
  'positionClass' : function () {
    if (Session.equals('searchMode', 'searching') || Session.equals('searchMode', 'done')) {
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
        Session.set('searchMode', 'searching');
        searchTermCache = searchValue;
      } else {
        Session.set('searchMode', 'initial');
      }
  }
});
