<template>

</template>

<script>

export default {
    name: 'player',
    data() {
        return {
            roomKey: undefined,
            playerKey: undefined,
        }
    },
    methods: {
        init(roomKey, playerKey) {
            this.roomKey = roomKey
            this.playerKey = playerKey
        },
        discard(tile) {
            axios.post(`${this.$config.apiOrigin}/api/discard/`, {
                roomKey: this.roomKey,
                playerKey: this.playerKey,
                tile: tile,
            })
            .then(response => {
                this.$log.debug(response)
                this.$emit('completed')
            });
        }
    }
}
</script>

<style>

</style>
