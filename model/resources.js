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
    },
    dislikes :  {
      type : Number
    }
  })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
Resources.allow({
  insert : function () {
    return true;
  },
  update : function () {
    return true;
  },
  remove : function () {
    return true;
  }
});


// Easy Search Configuration
EasySearch.createSearchIndex('resources', {
  'collection'    : Resources,
  'field'         : ['name', 'url'],
  'limit'         : 20,
  'use'           : 'mongo-db'
});