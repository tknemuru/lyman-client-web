<template>
  <div id="app">
    <room-manage-dialog ref="roomManageDialog" @entered-room="watchRoom"></room-manage-dialog>
    <room-watcher ref="roomWatcher" @dealted="startGame"></room-watcher>
    <quick-start ref="quickStart" @started="startGame"></quick-start>
    <game-manager ref="gameManager"></game-manager>
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
import RoomManageDialog from './assets/js/components/room-manage-dialog.vue'
Vue.component(RoomManageDialog.name, RoomManageDialog);
import RoomWatcher from './assets/js/components/room-watcher.vue'
Vue.component(RoomWatcher.name, RoomWatcher);
import QuickStart from './assets/js/components/quick-start.vue'
Vue.component(QuickStart.name, QuickStart);
import GameManager from './assets/js/components/game-manager.vue'
Vue.component(GameManager.name, GameManager);

export default {
  name: 'app',
  data() {
    return {
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
    /**
     * 部屋を監視します。
     */
    watchRoom: function(registerInfo) {
      this.$log.debug('registerInfo', registerInfo);
      this.$refs.roomWatcher.init(registerInfo);
    },

    /**
     * ゲームを開始します。
     */
    startGame: function(context) {
      this.$log.debug('context', context)
      this.$refs.gameManager.init(context)
      this.$refs.gameManager.draw()
    },
  },
}
</script>

<style>
.primary-text {
  color: #303133;
}
</style>
