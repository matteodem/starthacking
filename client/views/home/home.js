Template.home.helpers({
  'notPerformedSearch' : function () {
    return Session.equals('searchMode', 'initial');
  },
  'moreThanZeroResources' : function () {
    return Session.get('resourcesCount') > 0;
  },
  'resourcesCount' : function () {
    return Session.get('resourcesCount');
  },
  'hasLiked' : function () {
    return Resources.findOne({ _id : this._id, likes : Meteor.userId() });
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

Template.home.created = function () {
  Meteor.call('resourcesCount', function (err, data) {
    Session.set('resourcesCount', data);
  });
};

Template.home.events({
  'click .search-example' : function (e) {
    $('#globalSearchbar input').val($(e.target).html()).keydown().keypress().keyup();
    e.preventDefault();
  },
  'click .trigger-like' : function (e) {
    Resources.addLike(this._id);
    e.preventDefault();
  },
  'click .trigger-dislike' : function (e) {
    Resources.removeLike(this._id);
    e.preventDefault();
  }
});

Template.home.rendered = function () {
};
