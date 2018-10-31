<template>
<div>
    <div class="tiles-container">

    </div>
    <div v-if="context != null" class="tiles-container hands-container">
        <ul v-for="(tile, i) in context.room.hand" :key="i">
            <li>
                <tile :tile="tile" @selected="discard"></tile>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'field',
  data() {
    return {
      context: undefined,
    }
  },
  mounted: function() {
  },
  methods: {
    init(context) {
        this.context = context;
    },
    update() {
        axios.post(`${this.$config.apiOrigin}/api/selectroom/`, {
            roomKey: this.context.roomKey,
            playerKey: this.context.playerKey,
        })
        .then(response => {
            this.context.room = response.data;            
        });
    },
    discard(tile) {
        this.$log.debug('tile', tile)
        this.$emit('discard', tile)
    },
  },
}
</script>

<style>
ul {
  list-style: none;
  display: inline-block;
  padding: 0px;
}
.tiles-container {
  white-space: nowrap;
}
.hands-container {
    position: fixed;
    bottom: 4%;
}
</style>
