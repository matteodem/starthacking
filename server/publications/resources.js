Meteor.publish('resources', function () {
  return Resources.find();
});
