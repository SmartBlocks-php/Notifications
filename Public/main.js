define([
    'jquery',
    'underscore',
    'backbone',
    './apps/Alert/Views/alert',
    './apps/Notify/Views/notify',
    './apps/Notify/Views/notification'
], function ($, _, Backbone, AlertView, NotifyView, NotificationView) {
    var main = {
        notified: [],
        init: function () {
            var base = this;
            //Notification center initialization
            SmartBlocks.basics.show_message = base.methods.show_message;
            SmartBlocks.Blocks.Notifications.Main.notified = [];
        },
        notify: function (title, content, tag, callbacks) {
            var base = this;
            if (!SmartBlocks.Blocks.Notifications.Main.notified[tag]) {
                var notification_view = new NotificationView();
                var notification_container = $(".notification_container");
                if (!notification_container[0]) {

                    var div = $(document.createElement("div"));
                    div.addClass("notification_container");
                    $("body").append(div);
                    notification_container = div;
                }
                notification_container.append(notification_view.$el);
                notification_view.init(title, content, callbacks, tag);

                SmartBlocks.Blocks.Notifications.Main.notified[tag] = true;
            }
        },
        methods: {
            createNotification: function (obj, callbacks) {
                var base = this;
                var notification = new SmartBlocks.Blocks.Notifications.Models.Notification(obj);

                if (obj.persist) {
                    SmartBlocks.Blocks.Notifications.Data.notifications.add(notification);
                    notification.save({}, {
                        success: function () {

                            if (callbacks && callbacks.saved)
                                callbacks.saved(notification);
                        }
                    });
                } else {
                    if (callbacks && callbacks.saved)
                        callbacks.saved(notification);
                }
                var type = notification.get("type");
                return notification;
            },
            showMessage: function (message) {
                var base = this;
                var notification = new SmartBlocks.Blocks.Notifications.Models.Notification();
                notification.set("type", "information");
                notification.set("title", "Information");
                notification.set("content", message);

                base.notify(notification);
            },
            alert: function (message, title) {
                var base = this;
                var alert_view = new AlertView();
                $("body").prepend(alert_view.$el);
                alert_view.init(message, title);
            },
            confirm: function () {

            }
        }
    };

    return main;
});