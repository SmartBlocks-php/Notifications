define([
    'jquery',
    'underscore',
    'backbone',
    './apps/Alert/Views/alert',
    './apps/Notify/Views/notify'
], function ($, _, Backbone, AlertView, NotifyView) {
    var main = {
        init: function () {
            var base = this;
            //Notification center initialization
            SmartBlocks.basics.show_message = base.methods.show_message;
        },
        methods: {
            createNotification: function (obj) {
                var base = this;
                var notification = new SmartBlocks.Blocks.Notifications.Models.Notification(obj);
                SmartBlocks.Blocks.Notifications.Data.notifications.add(notification);
                notification.save({}, {
                    success: function () {
                        var type = notification.get("type");
                        if (type && type == "information") {
                            base.notify(notification);
                        }
                    }
                });
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
            notify: function (notification) {
                var base = this;

                var notification_container = $(".notification_container");
                if (notification.get("destination")) {
                    var callback = function () {
                        window.location = notification.get("destination");
                    }
                }
                var notifs_blocks = $('.notify_block[id="' + notification.get('id') + '"]');

                if (!notifs_blocks[0] && !notification.get("seen")) {
                    var notify_view = new NotifyView(notification);
                    if (!notification_container[0]) {

                        var div = $(document.createElement("div"));
                        div.addClass("notification_container");
                        $("body").append(div);
                        notification_container = div;

                    }
                    notification_container.append(notify_view.$el);
                    notify_view.init(callback);
                }

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