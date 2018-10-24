<template>
<modal name="room-manage-dialog">
	<div v-if="'top' === target" class="button-container">
		<el-button type="primary" class="select-button" v-on:click="setShowTarget('search')">部屋を探す</el-button>
		<el-button type="primary" class="select-button" v-on:click="setShowTarget('create')">部屋をつくる</el-button>
	</div>
	<div v-if="'create' === target" class="create-container">
		<span class="primary-text">部屋名を入力してください。</span>
		<el-input placeholder="Please input" v-model="roomName"></el-input>
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
		}
	},
	methods: {
		show() {
			this.setShowTarget();
			this.$modal.show('room-manage-dialog');
		},
		hide() {
			this.$modal.hide('room-manage-dialog');
		},
		setShowTarget(target) {
			this.target = target || 'top';
		},
	},
}
</script>

<style>
.button-container {
	text-align: center;
}
.select-button {
	margin-top: 20%;
}
.create-container {
	text-align: center;
	margin-top: 20%;
}
</style>