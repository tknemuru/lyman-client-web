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
                origin: 'http://localhost:25486',
    			// origin: 'https://lyman-api.appspot.com',
                loading: undefined,
                watchCount: 0,
                roomKey: undefined,
                players: [],
            }
        },
        watchRoom(roomKey) {
            this.roomKey = this.roomKey || roomKey;
            this.players = this.players || [];
            this.loading = Loading.service({ fullscreen: true });
            this.$log.debug('watchCount', this.watchCount);
            if (this.watchCount > 10) {
                return;
            }
            this.watchCount++;
            this.poleRoomStatus();
        },
        poleRoomStatus() {
            this.loading.lock = true;
            axios.post(`http://localhost:25486/api/selectplayer/`, {
                roomKey: this.roomKey,
            })
            .then(response => {
                this.$log.debug('players', response.data.players);
                this.loading.lock = false;                
                this.dispEnteredPlayerInfo(response.data.players);
                this.players = response.data.players;
                setTimeout(this.watchRoom.bind(this), 5000);
            });
        },
        dispEnteredPlayerInfo(players) {
            var newPlayers = players.filter(p => this.players.indexOf(p) == -1);
            if (newPlayers.length < 1) {
                return;
            }
            const h = this.$createElement;
            this.$notify({
            title: 'プレイヤが入室しました。',
            message: h('i', { style: 'color: teal' }, `${newPlayers.join('さん, ')}さん`)
            });
        },
    },
}
</script>

<style>

</style>
