define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {

        },
        urlRoot: "/Notifications/Notifications"
    });
    return Model;
});