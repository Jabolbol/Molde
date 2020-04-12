
export default {
    state: {
        notification: {
            display: false,
            text: "Notification placeholder text",
            timeout: 3000,
            class: "success"
        }

    },
    getters: {
        NOTIFICATION: state => {
            return state.notification;
        }

    },
    mutation: {
        SET_NOTIFICATION: (state, {display, text, alertClass}) => {
            state.notification.display = display;
            state.notification.text = text;
            state.notification.class = alertClass;
        }

    },
    action: {

    }
};
