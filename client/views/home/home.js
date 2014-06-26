Template.home.helpers({
  'notPerformedSearch' : function () {
    return Session.equals('searchMode', 'initial');
  },
  'resourcesCount' : function () {
    return Resources.find().count();
  }
});

Template.home.events({
  'click .search-example' : function (e) {
    $('#globalSearchbar input').val($(e.target).html()).keydown().keypress().keyup();
    e.preventDefault();
  }
});

Template.home.rendered = function () {
};
