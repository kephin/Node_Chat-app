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
    submit() {
      socket.emit('createMessage', {
        from: 'User',
        text: this.sendingMessage,
      }, () => {
        // callback();
      });
      // clear input
      this.sendingMessage = '';
    },
  },
});

socket.on('newMessage', message => {
  vm.receivingMessages.push(message);
});
