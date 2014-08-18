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
    likes :  {
      type : Number
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


// Easy Search Configuration
Resources.initEasySearch(['name', 'link'], {
  limit : 10
});