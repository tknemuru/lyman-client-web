<template>

</template>

<script>

export default {
    name: 'player',
    data() {
        return {
        }
    },
    methods: {
        /**
         * ツモを実行します。
         */
        draw(roomKey, playerKey) {
            axios.post(`${this.$config.apiOrigin}/api/draw/`, {
                roomKey: roomKey,
                playerKey: playerKey,
            })
            .then(response => {
                this.$log.debug(response)
                this.$emit('drawn')
            });
        },

        /**
         * AIのツモを実行します。
         */
        aiDraw(roomKey, playerKey) {
            axios.post(`${this.$config.apiOrigin}/api/aiDraw/`, {
                roomKey: roomKey,
                playerKey: playerKey,
            })
            .then(response => {
                this.$log.debug(response)
                this.aiDiscard(roomKey, playerKey)
            });
        },

        /**
         * AIの捨牌を実行します。
         */
        aiDiscard(roomKey, playerKey) {
            axios.post(`${this.$config.apiOrigin}/api/aiDiscard/`, {
                roomKey: roomKey,
                playerKey: playerKey,
            })
            .then(response => {
                this.$log.debug(response)
                this.$emit('discarded')
            });
        },
        
        /**
         * 捨牌を実行します。
         */
        discard(roomKey, playerKey, tile) {
            axios.post(`${this.$config.apiOrigin}/api/discard/`, {
                roomKey: roomKey,
                playerKey: playerKey,
                tile: tile,
            })
            .then(response => {
                this.$log.debug(response)
                this.$emit('discarded')
            });
        }
    }
}
</script>

<style>

</style>
