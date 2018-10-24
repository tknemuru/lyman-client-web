<template>
  <div id="app">
    <span>{{context}}</span>
    <span>{{hands}}</span>
    <room-manage-dialog ref="roomManageDialog"></room-manage-dialog>
    <div class="tiles-container">
      <ul v-for="(tile, i) in hands">
        <li>
          <img v-bind:src="buildTileImagePath(tile)">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import RoomMangaeDialog from './assets/js/components/room-manage-dialog.vue'
Vue.component(RoomMangaeDialog.name, RoomMangaeDialog);
export default {
  name: 'app',
  data() {
    return {
      context: {},
      hands: [],
    }
  },
  mounted() {
    this.$refs.roomManageDialog.show();
    axios.get('http://localhost:25486/api/')
    .then(response => {
      this.context = response.data.context;
      this.hands = this.context.hands[0];
    })
  },
  methods: {
    buildTileImagePath: function(tile) {
      return require(`./assets/image/tiles/${tile}.png`);
    }
  },
}
</script>

<style>
.primary-text {
  color: #303133;
}

ul {
  list-style: none;
  display: inline-block;
  padding: 0px;
}

.tiles-container {
  white-space: nowrap;
}
</style>
