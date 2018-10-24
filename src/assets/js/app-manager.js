const app = new Vue({
	el: '#app',
	data: {
		testVal: 'Hello World!',
		context: {},
		hands: [],
	},
	mounted() {
		axios.get('http://localhost:25486/api/')
		.then(response => {
			this.context = response.data.context;
			this.hands = this.context.hands[0];
		})
	},
	methods: {
		buildTileImagePath: function(tile) {
			return `/assets/image/tiles/${tile}.png`;
		}
	},
});