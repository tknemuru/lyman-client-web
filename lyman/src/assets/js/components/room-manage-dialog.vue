<template>
<modal name="room-manage-dialog">
	<div v-if="'registerName' === target" class="contents-container">
		<div class="primary-text">名前を入力してください。</div>
		<el-input placeholder="Please input" v-model="playerName" class="text-input"></el-input>
		<el-button type="primary" v-on:click="setShowTarget('enterRoom')">決定</el-button>
	</div>
	<div v-else-if="'enterRoom' === target" class="contents-container">
		<el-button type="primary" v-on:click="setShowTarget('selectRoom')">部屋を探す</el-button>
		<el-button type="primary" v-on:click="setShowTarget('createRoom')">部屋をつくる</el-button>
	</div>
	<div v-else-if="'createRoom' === target" class="contents-container">
		<div class="primary-text">部屋名を入力してください。</div>
		<el-input placeholder="Please input" v-model="roomName" class="text-input"></el-input>
		<el-button type="primary" v-on:click="createRoom">決定</el-button>
		<el-input placeholder="Please input" v-model="roomKey" class="text-input"></el-input>
	</div>
	<div v-else-if="'selectRoom' === target" class="contents-container">
		<div class="primary-text">入室する部屋を選んでください。</div>
		<el-input placeholder="Please input" v-model="roomName" class="text-input"></el-input>
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
			target: undefined,
			roomName: undefined,
			playerName: undefined,
			roomKey: undefined,
		}
	},
	methods: {
		show() {
			this.setShowTarget('registerName');
			this.$modal.show('room-manage-dialog');
		},
		hide() {
			this.$modal.hide('room-manage-dialog');
		},
		setShowTarget(target) {
			this.target = target;
		},
		createRoom() {
			axios.post('http://localhost:25486/api/createroom/', {
				roomName: this.roomName,
			})
			.then(response => {
				this.roomKey = response.data.roomKey;
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
.text-input {
	width: 50%;
	margin: 2%;
}
</style>