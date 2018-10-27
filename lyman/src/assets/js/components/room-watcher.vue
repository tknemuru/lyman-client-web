<template>
</template>

<script>
import Vue from 'vue'
import { Loading } from 'element-ui';

export default {
    name: 'room-watcher',
    methods: {
        data() {
            return {
                loading: undefined,
            }
        },
        poleRoomStatus() {
            this.loading = Loading.service({ fullscreen: true });
            this.$log.debug('loading', this.loading);
            this.loading.lock = true;
        },
    },
}
</script>

<style>

</style>
