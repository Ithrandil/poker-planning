const choiceCard = new Vue({
  el: 'choice-card',
  props: ['cardValue'],
  data: () => {
    const data = {
      value: this.cardValue,
      // other object attributes
    };

    return data;
  },
  template: `
  <div class="card">
    <div class="card-body">
    {{cardValue}}
    <span v-if="value">{{value}}</span>
        This is some text within a card body.
    </div>
  </div>`,
});

const app = new Vue({
  el: '#app',
  data: {
    title: 'Poker planning',
    suiteCard: [0, 1, 2, 3, 5],
    name: '',
    text: '',
    messages: [],
    socket: null,
  },
  components: {
    'choice-card': choiceCard,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
  },
});

// const choosenCard = new Vue({
//   el: '#choosenCard',
//   props: ['value'],
//   template: `
//   <div class="card">
//     <div class="card-body">
//     <span v-if="value">Now you see me</span>
//         This is some text within a card body.
//     </div>
//   </div>`,
// });
