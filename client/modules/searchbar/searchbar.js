Template.searchbar.helpers({
  'interaction' : function () {
    return 'search';
  }
});

Template.searchbar.events({
  'keyup #globalSearchbar' : function (e) {
    Session.set('searchforSites', $(e.target).val());
  }
});
