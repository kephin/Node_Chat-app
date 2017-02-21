const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

const vm = new Vue({
  el: '#app',
  data: {
    sendingMessage: '',
    receivingMessages: [],
    sendLocationButtonText: 'Send location',
    sendLocationButtonDisabled: false,
  },
  methods: {
    send_message() {
      socket.emit('createMessage', {
        from: 'User',
        text: this.sendingMessage,
      }, () => {
        this.sendingMessage = '';
      });
    },
    send_location() {
      if (!navigator.geolocation) return alert('Geolocation not supported!');
      this.sendLocationButtonDisabled = true;
      this.sendLocationButtonText = 'Send location...';
      navigator.geolocation.getCurrentPosition(position => {
        this.sendLocationButtonDisabled = false;
        this.sendLocationButtonText = 'Send location';
        socket.emit('createLocationMessage', {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }, () => {
        this.sendLocationButtonDisabled = false;
        this.sendLocationButtonText = 'Send location';
        alert('Unable to fetch location');
      });

    },
  },
});

socket.on('newMessage', message => {
  message.createdAt = moment(message.createdAt).format('h:mm a');
  vm.receivingMessages.push(message);
});

socket.on('newLocationMessage', message => {
  message.createdAt = moment(message.createdAt).format('h:mm a');
  vm.receivingMessages.push(message);
});
