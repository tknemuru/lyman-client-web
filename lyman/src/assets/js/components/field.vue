<template>
<div>
    <div class="tiles-container">

    </div>
    <div class="tiles-container hands-container">
        <ul v-for="(tile, i) in hand" :key="i">
            <li>
                <tile :tile="tile"></tile>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Tile from './tile.vue'
Vue.component(Tile.name, Tile);

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
