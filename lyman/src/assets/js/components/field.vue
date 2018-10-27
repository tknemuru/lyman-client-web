<template>
    <div class="tiles-container">
      <ul v-for="(tile, i) in hand" :key="i">
        <li>
          <img v-bind:src="buildTileImagePath(tile)">
        </li>
      </ul>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'field',
  data() {
    return {
      hand: [],
    }
  },
  methods: {
    dealtTiles: function(room) {
        this.hand = room.hand;
    },
    buildTileImagePath: function(tile) {
        return require(`../../image/tiles/${tile}.png`);
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
</style>
