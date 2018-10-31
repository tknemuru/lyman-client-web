<template>
<div>
    <div v-if="context != null && context.room != null" class="tiles-container">
        <div v-for="(river, wind) in context.room.rivers" :key="wind">
            <ul v-for="(tile, i) in river" :key="i" :class="windPositions[wind]">
                <li>
                    <tile :tile="tile" domain="river"></tile>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="context != null && context.room != null" class="tiles-container hands-container">
        <ul v-for="(tile, i) in context.room.hand" :key="i">
            <li>
                <tile :tile="tile" domain="hand" @selected="discard"></tile>
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
      context: Object,
      windPositions: Array,
    }
  },
  mounted: function() {
  },
  methods: {
    init(context) {
        this._buildWindPositions(context.windIndex)
        this.context = context
    },
    update() {
        axios.post(`${this.$config.apiOrigin}/api/selectroom/`, {
            roomKey: this.context.roomKey,
            playerKey: this.context.playerKey,
        })
        .then(response => {
            this.context.room = response.data
        });
    },
    discard(tile) {
        this.$log.debug('tile', tile)
        this.$emit('discard', tile)
    },
    _buildWindPositions(windIndex) {
        var position = ['lower', 'right', 'upper', 'left']
        for(var i = 0; i < position.length; i++) {
            this.windPositions[(windIndex + i) % 4] = position[i]
        }
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
