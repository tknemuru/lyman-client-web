<template>
<modal name="room-manage-dialog">
	<div v-if="'registerName' === target" class="contents-container">
		<div class="primary-text">名前を入力してください。</div>
		<el-input placeholder="Please input" v-model="playerName" class="text-input"></el-input>
		<el-button type="primary" v-on:click="setShowTarget('enterRoom')">決定</el-button>
	</div>
	<div v-else-if="'enterRoom' === target" class="contents-container">
		<el-button type="primary" v-on:click="searchRoom">部屋を探す</el-button>
		<el-button type="primary" v-on:click="setShowTarget('createRoom')">部屋をつくる</el-button>
	</div>
	<div v-else-if="'createRoom' === target" class="contents-container">
		<div class="primary-text">新しい部屋名を入力してください。</div>
		<el-input placeholder="Please input" v-model="roomName" class="text-input"></el-input>
		<el-button type="primary" v-on:click="createRoom">決定</el-button>
	</div>
	<div v-else-if="'selectRoom' === target" class="contents-container table-container">
		<div class="primary-text">入室する部屋を選んでください。</div>
		<el-table :data="rooms" highlight-current-row @current-change="enterRoom" height="240">
			<el-table-column type="index">				
			</el-table-column>
			<el-table-column property="name" label="部屋名">
			</el-table-column>
		</el-table>
	</div>
</modal>
</template>

<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VModal);
Vue.use(Element);

export default {
	name: 'room-manage-dialog',
	data() {
		return {
			origin: 'http://localhost:25486',
			// origin: 'https://lyman-api.appspot.com',
			target: undefined,
			roomName: undefined,
			playerName: undefined,
			roomKey: undefined,
			wind: undefined,
			rooms: [],
		}
	},
	methods: {
		show() {
			this.test();
			this.setShowTarget('registerName');
			this.$modal.show('room-manage-dialog');
		},
		hide() {
			this.$modal.hide('room-manage-dialog');
		},
		setShowTarget(target) {
			this.target = target;
		},
		test() {
			axios.get(`${this.origin}/api/`)
			.then(response => {
				this.$log.debug(response.data.context);
			})
		},
		createRoom() {
			this.$log.debug('roomName', this.roomName);
			axios.post(`${this.origin}/api/createroom/`, {
				roomName: this.roomName,
			})
			.then(response => {
				this.$log.debug('roomKey', response.data.roomKey);
				this.roomKey = response.data.roomKey;
				this.enterRoom();
			})
		},
		enterRoom(room) {
			this.$log.debug('room', room);
			room = room || {};
			this.roomKey = room.key || this.roomKey;
			this.$log.debug('roomKey', this.roomKey);
			axios.post(`${this.origin}/api/enterroom/`, {
				roomKey: this.roomKey,
				playerName: this.playerName,
			})
			.then(response => {
				this.$log.debug('wind', response.data.wind);
				this.wind = response.data.wind;
				this.hide();
				this.$emit('entered-room', {
					roomKey: this.roomKey,
					roomName: this.roomName,
					wind: this.wind,
					playerName: this.playerName,
				});
			})
		},
		searchRoom() {
			axios.post(`${this.origin}/api/searchroom/`, {})
			.then(response => {
				this.setShowTarget('selectRoom');
				this.rooms = response.data;
			})
		},
	},
}
</script>

<style>
.contents-container {
	text-align: center;
	margin-top: 20%;
}
.contents-container.table-container {
	margin-top: 3%;	
}
.text-input {
	width: 50%;
	margin: 2%;
}
</style>