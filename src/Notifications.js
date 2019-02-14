import firebase from 'react-native-firebase'
// import { EventEmitter } from 'events'
class Notifications {
  constructor() {
    firebase.notifications().onNotification((notification) => {
      console.log('notification', notification)
      // Process your notification as required
      const initNoti = new firebase.notifications.Notification()
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('test-channel')
  
      firebase.notifications().displayNotification(initNoti)
    })
  }

  checkPermission(){
    const enabled = firebase.messaging().hasPermission()
    const fcmToken = firebase.messaging().getToken()
    console.log('fcmToken', fcmToken)
    if(enabled) {
      this.createChannel()
    } else {
      try {
        firebase.messaging().requestPermission()
      } catch (error) { console.log('error', error)}
    }
  }

  createChannel(){
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max).setDescription('My apps test channel')
    firebase.notifications().android.createChannel(channel)
  }
}

export default Notifications