	/*
	*
	* Notifications */

	// Request permission for notifications
	// Notification.requestPermission((status) => console.log('Notification permission status: ', status))

	// Close the notification
	self.addEventListener('notificationclose', (event) => {
		var notification = event.notification
		var primaryKey = notification.data.primaryKey
		console.log('Closed notification: ', primaryKey)
	})

	// Notification Click
	self.addEventListener('notificationclick', (event) => {
		var notification = event.notification
		var action = event.action

		if (action === 'close') {
			notification.close()
		} else {
			clients.openWindow('https://music.black.co.ke')
		}
	})

	// Check if user is subscribed to push notifications
	navigator.serviceWorker.ready
		.then((reg) => {
			reg.pushManager.getSubscription()
				.then((sub) => {
					if (sub == 'undefined') {
						// Ask user to register for push
						console.log("Not")
					} else {
						// You have subscription update server
						console.log("Yes")
					}
				})
		})

	// self.addEventListener('push', () => self.registration.sendNotification('Push Notification', {}))