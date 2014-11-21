Meteor.methods({
    resourcesCount: function () {
        return Resources.find().count();
    }
})