<template>
</template>

<script>
import Vue from 'vue'
import { Loading } from 'element-ui';

export default {
    name: 'room-watcher',
    data() {
        return {
            loading: undefined,
            watchCount: 0,
            roomKey: undefined,
            roomName: undefined,
            windIndex: undefined,
            wind: undefined,
            playerKey: undefined,
            playerName: undefined,
            firstPlayer: Boolean,
            players: [],
            room: undefined,
        }
    },
    methods: {
        init(registerInfo) {
            this.roomKey = registerInfo.roomKey
            this.roomName = registerInfo.roomName
            this.windIndex = registerInfo.windIndex
            this.wind = registerInfo.wind
            this.playerKey = registerInfo.playerKey
            this.playerName = registerInfo.playerName
            this.firstPlayer = registerInfo.firstPlayer
            this.watchRoom()
        },
        watchRoom() {
            this.loading = Loading.service({ fullscreen: true });
            this.$log.debug('watchCount', this.watchCount);
            if (this.watchCount > 100) {
                return;
            }
            if (this.players.length >= 4) {
                if (this.playerName === this.players[0]) {
                    this.dealtTiles();
                } else {
                    this.poleRoomState();
                }
            } else {
                this.watchCount++;
                this.poleRoomPlayers();
            }
        },
        poleRoomPlayers() {
            this.loading.lock = true;
            axios.post(`${this.$config.apiOrigin}/api/selectplayer/`, {
                roomKey: this.roomKey,
            })
            .then(response => {
                this.$log.debug('players', response.data.players);
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
        poleRoomState() {
            if(this.room == null || 'dealted' !== this.room.state) {
                this.getRoom();
                setTimeout(this.poleRoomState.bind(this), 2000);
            } else {
                this.loading.lock = false;
                this.loading.close();
                this.$emit('dealted', {
                    roomKey: this.roomKey,
                    windIndex: this.windIndex,
                    wind: this.wind,
                    playerKey: this.playerKey,
                    playerName: this.playerName,
                    firstPlayer: this.firstPlayer,
                    room: this.room,
                });
            }
        },
        dealtTiles() {
            axios.post(`${this.$config.apiOrigin}/api/dealttiles/`, {
                roomKey: this.roomKey,
            })
            .then(response => {
                this.poleRoomState();
            });
        },
        getRoom() {
            axios.post(`${this.$config.apiOrigin}/api/selectroom/`, {
                roomKey: this.roomKey,
                playerKey: this.playerKey,
            })
            .then(response => {
                this.room = response.data;
            });
        },
    },
}
</script>

<style>

</style>
