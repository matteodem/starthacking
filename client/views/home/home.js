Template.home.helpers({
  'notPerformedSearch' : function () {
    return Session.equals('searchMode', 'initial');
  },
  'resourcesCount' : function () {
    return Resources.find().count();
  },
  'iconClass' : function () {
    switch (this.type) {
      case 'interactive':
        return 'browser';
      case 'course':
        return 'archive';
      case 'podcast':
        return 'play sign';
      default:
        return this.type;
    }
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
