<template>
  <div id="app">
    <room-manage-dialog ref="roomManageDialog" @entered-room="watchRoom"></room-manage-dialog>
    <room-watcher ref="roomWatcher" @dealted="startGame"></room-watcher>
    <player ref="player" @completed="update"></player>
    <field ref="field" @discard="discard"></field>
    <quick-start ref="quickStart" @started="startGame"></quick-start>
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
import Field from './assets/js/components/field.vue'
Vue.component(Field.name, Field);
import QuickStart from './assets/js/components/quick-start.vue'
Vue.component(QuickStart.name, QuickStart);
import Tile from './assets/js/components/tile.vue'
Vue.component(Tile.name, Tile);
import Player from './assets/js/components/player.vue'
Vue.component(Player.name, Player);

export default {
  name: 'app',
  data() {
    return {
      context: undefined,
    }
  },
  mounted() {
    var quickStart = ('1' === this.$route.query.quickStart);
    this.$log.debug('quickStart', quickStart);
    if (quickStart)
    {
      this.$refs.quickStart.start();
    } else {
      this.$refs.roomManageDialog.show();
    }
  },
  methods: {
    watchRoom: function(registerInfo) {
      this.$log.debug('registerInfo', registerInfo);
      this.$refs.roomWatcher.init(registerInfo);
    },
    startGame: function(context) {
      this.$log.debug('context', context)
      this.context = context
      this.$refs.player.init(context.roomKey, context.playerKey)
      this.$refs.field.init(context)
    },
    update: function() {
      this.$refs.field.update()
    },
    discard: function(tile) {
      this.$refs.player.discard(tile);
    },
  },
}
</script>

<style>
.primary-text {
  color: #303133;
}
</style>
