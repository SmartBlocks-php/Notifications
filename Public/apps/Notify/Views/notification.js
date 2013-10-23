define([
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/notification.html'
], function ($, _, Backbone, notification_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "notify_block",
        initialize: function () {
            var base = this;
        },
        init: function (title, content, callbacks, tag) {
            var base = this;
            base.callbacks = callbacks;
            base.title = title;
            base.content = content;
            base.tag = tag;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(notification_tpl, {
                title: base.title,
                content: base.content
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate(".ok_button", "click", function () {
                SmartBlocks.Blocks.Notifications.Main.notified[base.tag] = false;
                if (base.callbacks && base.callbacks.ok) {
                    base.callbacks.ok();
                }
                base.$el.remove();
            });

            base.$el.delegate(".ignore_button", "click", function () {
                SmartBlocks.Blocks.Notifications.Main.notified[base.tag] = false;
                if (base.callbacks && base.callbacks.ignore) {
                    base.callbacks.ignore();
                }
                base.$el.remove();
            });

            base.$el.delegate(".remind_me_button", "click", function () {
                SmartBlocks.Blocks.Notifications.Main.notified[base.tag] = false;
                if (base.callbacks && base.callbacks.remind_me) {
                    base.callbacks.remind_me();
                }
                base.$el.remove();
            });

        }
    });

    return View;
});