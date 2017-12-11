import {AsyncStorage} from "react-native";
import {Permissions, Notifications} from 'expo';

function clearLocalNotification() {
    return AsyncStorage.removeItem('flashcards:notification');
}

function createNotification() {
    return {
        title: 'It is quiz time!',
        body: "Don't forget to complete a quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
    };
}

function setLocalNotification() {
    AsyncStorage.getItem('flashcards:notification')
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(21);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: 'day',
                        });
                        AsyncStorage.setItem('flashcards:notification', JSON.stringify(true));
                    }
                });
            }
        });
}

export {
    clearLocalNotification,
    setLocalNotification,
    createNotification
}