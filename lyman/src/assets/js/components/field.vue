<template>
<div id="field">
    <el-row>
        <el-col :span="9"><div class="grid-content empty-space"></div></el-col>
        <el-col :span="7">
            <ul class="upper">
                <li v-for="(tile, i) in rivers[windPositions.upper]" :key="i">
                    <tile :tile="tile" domain="river"></tile>
                </li>
                <li v-for="(i) in _buildRiverEmptys(windPositions.upper)" :key="i">
                    <div class="empty-space"></div>
                </li>
            </ul>
        </el-col>
        <el-col :span="8"><div class="grid-content empty-space"></div></el-col>
    </el-row>
    <el-row>
        <el-col :span="9" :offset="1">
            <ul class="left">
                <li v-for="(tile, i) in rivers[windPositions.left]" :key="i">
                    <tile :tile="tile" domain="river"></tile>
                </li>
                <li v-for="(i) in _buildRiverEmptys(windPositions.left)" :key="i">
                    <div class="empty-space"></div>
                </li>
            </ul>
        </el-col>
        <el-col :span="5">
            <div class="grid-content score-board-container">
                <score-board></score-board>
            </div>
        </el-col>
        <el-col :span="9">
            <ul class="right">
                <li v-for="(tile, i) in rivers[windPositions.right]" :key="i">
                    <tile :tile="tile" domain="river"></tile>
                </li>
                <li v-for="(i) in _buildRiverEmptys(windPositions.right)" :key="i">
                    <div class="empty-space"></div>
                </li>
            </ul>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="10"><div class="grid-content empty-space"></div></el-col>
        <el-col :span="7">
            <ul class="lower">
                <li v-for="(tile, i) in rivers[windPositions.lower]" :key="i">
                    <tile :tile="tile" domain="river"></tile>
                </li>
                <li v-for="(i) in _buildRiverEmptys(windPositions.lower)" :key="i">
                    <div class="empty-space"></div>
                </li>
            </ul>
        </el-col>
        <el-col :span="8"><div class="grid-content empty-space"></div></el-col>
    </el-row>
    <el-row>
        <el-col :span="20" :offset="2">
            <div v-if="hand != null" class="tiles-container hands-container">
                <ul>
                    <li v-for="(tile, i) in hand" :key="i">
                        <tile :tile="tile" :last="(hand.length - 1) === i" domain="hand" @selected="_notifyDiscarded"></tile>
                    </li>
                </ul>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import Vue from 'vue'
import Tile from './tile.vue'
Vue.component(Tile.name, Tile);
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element);
import ScoreBoard from './score-board.vue'
Vue.component(ScoreBoard.name, ScoreBoard);

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
        windPositions: Object,
    }
  },
  computed: {
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
            this.windPositions[position[i]] = (windIndex + i) % 4
        }
    },

    /**
     * 空の河牌を組み立てます。
     */
    _buildRiverEmptys: function (wind) {
        var length = this.rivers[wind] == null ? 21 : 21 - this.rivers[wind].length
        return new Array(length)
    }
  },
}
</script>

<style scoped>
#field {
    background-image: url("../../image/mat.jpg");
    background-size: 160%;
    background-position-x: 50%;
    background-position-y: 50%;
}
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
ul.upper li,ul.lower li,.hands-container li {
  display: inline-block;
}
ul.upper li,ul.lower li {
    height: 45.45px;
}
ul.upper {
    display: flex;
    max-width: 200px;
    flex-flow: row-reverse wrap-reverse;
    vertical-align: bottom;
    padding-top: 10px;
    padding-left: 48px;
}
ul.lower {
    display: flex;
    max-width: 200px;
    flex-flow: row wrap;
    vertical-align: top;
}
ul.right, ul.left {
    display: flex;
    max-height: 200px;
}
ul.left {
    flex-flow: column wrap-reverse;
    text-align: right;
    padding-right: 10px;
    padding-left: 200px;
}
ul.right {
    flex-flow: column wrap;
    padding-right: 210px;
}
.right li,.left li {
    height: 30px;
    width: 46px;
}
.tiles-container {
  white-space: nowrap;
}
.empty-space {
    height: 1px;
    width: 1px;
}
.right .empty-space,.left .empty-space {
    height: 30px;
    width: 45.45px;
}
.upper .empty-space,.lower .empty-space {
    width: 30px;
    height: 51.45px;
}
</style>
