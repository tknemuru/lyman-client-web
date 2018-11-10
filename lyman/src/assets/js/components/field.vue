<template>
<div>
    <div v-if="rivers != null" class="tiles-container">
        <div v-for="(river, wind) in rivers" :key="wind">
            <ul v-for="(tile, i) in river" :key="i" :class="windPositions[wind]">
                <li>
                    <tile :tile="tile" domain="river"></tile>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="hand != null" class="tiles-container hands-container">
        <ul v-for="(tile, i) in hand" :key="i">
            <li>
                <tile :tile="tile" :last="(hand.length - 1) === i" domain="hand" @selected="_notifyDiscarded"></tile>
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
        /**
         * 河牌
         */
        rivers: Array,

        /**
         * 手牌
         */
        hand: Array,

        /**
         * 風とフィールド位置の組み合わせ情報
         */
        windPositions: Array,
    }
  },
  methods: {
    /**
     * 初期化処理を実行します。
     */
    init(windIndex) {
        this._buildWindPositions(windIndex)
    },

    /**
     * 更新処理を実行します。
     */
    update(room) {
            this.rivers = room.rivers
            this.hand = room.hand
    },

    /**
     * 捨牌されたことを通知します。
     */
    _notifyDiscarded(tile) {
        this.$emit('discarded', tile)
    },    

    /**
     * 風とフィールド位置の組み合わせ情報を組み立てます。
     */
    _buildWindPositions(windIndex) {
        var position = ['lower', 'right', 'upper', 'left']
        for(var i = 0; i < position.length; i++) {
            this.windPositions[(windIndex + i) % 4] = position[i]
        }
    },
  },
}
</script>

<style scoped>
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
