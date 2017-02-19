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
  },
  methods: {
    send_message() {
      socket.emit('createMessage', {
        from: 'User',
        text: this.sendingMessage,
      }, () => {
        // callback();
      });
      // clear input
      this.sendingMessage = '';
    },
    send_location() {
      if (!navigator.geolocation) return alert('Geolocation not supported!');
      navigator.geolocation.getCurrentPosition(position => {
        socket.emit('createLocationMessage', {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }, () => alert('Unable to fetch location'));
    },
  },
});

socket.on('newMessage', message => {
  vm.receivingMessages.push(message);
});

socket.on('newLocationMessage', message => {
  vm.receivingMessages.push(message);
});
