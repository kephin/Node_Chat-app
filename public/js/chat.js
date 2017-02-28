const socket = io();

// const scrollToBottom = () => {
//   const messages = document.querySelector('#messages');
//   const newMessage = messages.lastElementChild;

//   const newMessageHeight = () => {
//     if (newMessage) return newMessage.scrollHeight;
//     return 0;
//   };
//   const lastMessageHeight = () => {
//     if (newMessage && newMessage.previousElementSibling) return newMessage.previousElementSibling.scrollHeight;
//     return 0;
//   };

//   if (messages.scrollHeight <= messages.scrollTop + messages.clientHeight + newMessageHeight() + lastMessageHeight()) {
//     messages.scrollTop = messages.scrollHeight;
//   }
// };

socket.on('connect', () => {
  const params = getParams(window.location.search);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  vm.users = users;
});

const vm = new Vue({
  el: '#app',
  data: {
    users: [],
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
  /*watch: {
    receivingMessages() {
      scrollToBottom();
    },
  },*/
});

socket.on('newMessage', message => {
  message.createdAt = moment(message.createdAt).format('h:mm a');
  vm.receivingMessages.push(message);
});

socket.on('newLocationMessage', message => {
  message.createdAt = moment(message.createdAt).format('h:mm a');
  vm.receivingMessages.push(message);
});
