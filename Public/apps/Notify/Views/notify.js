define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/notify.html'
], function ($, _, Backbone, notify_template) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "notify_block",
        initialize: function (notification) {
            var base = this;
            base.notification = notification;
            base.model = notification;
        },
        init: function (callback) {
            var base = this;
            base.callback = callback;
            base.show_continue = callback !== undefined;
            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(notify_template, {
                notification: base.notification,
                show_continue: base.show_continue
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
            base.$el.delegate(".continue", "click", function () {

                if (base.callback) {
                    base.callback();
                    base.notification.set("seen", true);
                    base.notification.save();
                    base.$el.remove();
                }
            });

            var timer = 0;

            if (!base.notification.get("sticky")) {
                base.$el.mouseover(function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        base.$el.slideUp(function () {
                            base.$el.remove();
                        });
                    }, 5000);
                });
                timer = setTimeout(function () {
                    base.$el.remove();
                }, 5000);
            }
        }
    });

    return View;
});