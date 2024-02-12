import { store as NotificationStore } from 'react-notifications-component';

export const Notification = (() => {

    const notification = (title, message, type) => {
        NotificationStore.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: false
            }
        });
    };

    return {
        error: (title, message) => notification(title, message, 'danger'),
        success: (title, message) => notification(title, message, 'success'),
        info: (title, message) => notification(title, message, 'default'),
    };
 })();
