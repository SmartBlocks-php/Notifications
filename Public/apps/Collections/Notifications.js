define([
    'jquery',
    'underscore',
    'backbone',
    '../Models/Notification'
], function ($, _, Backbone, Notification) {
    var Collection = Backbone.Collection.extend({
        model: Notification,
        url: "/Notifications/Notifications"
    });

    return Collection;
});