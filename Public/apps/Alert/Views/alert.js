define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/alert.html'
], function ($, _, Backbone, alert_template) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "notif_alert cache",
        initialize: function () {
            var base = this;
        },
        init: function (message) {
            var base = this;
            base.message = message;
            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(alert_template, {
                message: base.message
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('.ok_button', 'click', function () {
                base.$el.remove();
            });
        }
    });

    return View;
});