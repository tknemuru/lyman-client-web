<template>
<modal name="room-manage-dialog">
	<div>部屋を探す</div>
	<div>部屋をつくる</div>
</modal>
</template>

<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
Vue.use(VModal);

export default {
	name: 'room-manage-dialog',
	methods: {
		show() {
			this.$modal.show('room-manage-dialog');
		}
	},
}
</script>