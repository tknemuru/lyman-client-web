<template>
  <div id="app">
    <span>{{context}}</span>
    <span>{{hands}}</span>
    <room-manage-dialog ref="roomManageDialog" @entered-room="watchRoom"></room-manage-dialog>
    <room-watcher ref="roomWatcher"></room-watcher>
    <div class="tiles-container">
      <ul v-for="(tile, i) in hands" :key="i">
        <li>
          <img v-bind:src="buildTileImagePath(tile)">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';
const options = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};
Vue.use(VueLogger, options);
import RoomMangaeDialog from './assets/js/components/room-manage-dialog.vue'
Vue.component(RoomMangaeDialog.name, RoomMangaeDialog);
import RoomWatcher from './assets/js/components/room-watcher.vue'
Vue.component(RoomWatcher.name, RoomWatcher);

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
    axios.get('https://lyman-api.appspot.com/api/')
    .then(response => {
      this.context = response.data.context;
      this.hands = response.data.context.hands[0];
    })
  },
  methods: {
    buildTileImagePath: function(tile) {
      return require(`./assets/image/tiles/${tile}.png`);
    },
    watchRoom: function(roomInfo) {
      this.$refs.roomWatcher.watchRoom(roomInfo.roomKey);
    },
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
