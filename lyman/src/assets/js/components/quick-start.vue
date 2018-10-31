<template>
    
</template>

<script>
export default {
    name: 'quick-start',
    data() {
        return {
            room: undefined,
        }
    },
    methods: {
        start: function() {
            axios.post(`${this.$config.apiOrigin}/api/quickstart/`, {
                createRoomRequest: {
                    roomName: 'test1', 
                },
                enterRoomRequests: [
                    {
                        playerName: 'myself',
                    },
                    {
                        playerName: 'other1',
                    },
                    {
                        playerName: 'other2',
                    },
                    {
                        playerName: 'other3',
                    },
                ],
                dealtTilesRequest: {                    
                },
                selectRoomRequest: {
                },
            })
            .then(response => {
                this.$log.debug('response', response.data);
				this.$emit('started', {
                    roomKey: response.data.roomKey,
                    roomName: response.data.roomName,
                    windIndex: response.data.windIndex,
                    wind: response.data.wind,
                    playerKey: response.data.playerKey,
                    playerName: response.data.playerName,
                    room: {
                        state: response.data.state,
                        players: response.data.players,
                        hand: response.data.hand,
                        rivers: response.data.rivers,
                    },
                });
			})
        },
    },
}
</script>

<style>

</style>
