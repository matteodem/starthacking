Resources = new Meteor.Collection('resources', {
  schema : new SimpleSchema({
    name : {
      type : String
    },
    link : {
      type : String
    },
    type : {
      type : String
    },
    category : {
      type : String
    },
    likesCount : {
      type : Number,
      optional : true,
      autoValue : function () {
        return this.field('likes').length;
      }
    },
    likes :  {
      type : [String],
      autoValue : function () {
        if (this.isInsert) {
          return [];
        }
      }
    }
  })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
Resources.allow({
  insert : function () {
    return false;
  },
  update : function () {
    return false;
  },
  remove : function () {
    return false;
  }
});

Resources.addLike = function (docId) {
  Meteor.call('addLike', docId);
};

Resources.removeLike = function (docId) {
  Meteor.call('removeLike', docId);
};

Meteor.methods({
  'addLike' : function (id) {
    check(id, String);

    var userId = Meteor.userId();

    if (!userId || Resources.findOne({ _id : id, likes : userId })) {
      return;
    }

    Resources.update(id, { $push: { likes: userId }, $set : { likesCount: Resources.findOne({ _id : id }).likes.length + 1 } });
  },
  'removeLike' : function (id) {
    check(id, String);

    var userId = Meteor.userId();

    if (!userId || !Resources.findOne({ _id : id, likes : userId })) {
      return;
    }

    Resources.update(id, { $pull: { likes: userId }, $set : { likesCount: Resources.findOne({ _id : id }).likes.length - 1 } });
  }
});

// Easy Search Configuration
Resources.initEasySearch(['name', 'link'], {
  limit : 10,
  query: function (searchString) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    // Only completely match the link
    query.$or[1] = { 'link' : searchString };

    return query;
  },
  sort : function () {
    return { 'likesCount' : -1, 'name' : 1 };
  }
});