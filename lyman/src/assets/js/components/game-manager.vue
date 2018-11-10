<template>
    <div>
        <player ref="player" @drawn="update" @discarded="draw"></player>
        <field ref="field" @discarded="_discard"></field>
    </div>
</template>

<script>
import Vue from 'vue'
import Player from './player.vue'
Vue.component(Player.name, Player)
import Field from './field.vue'
Vue.component(Field.name, Field);

export default {
  name: 'game-manager',
  data() {
    return {
        /**
         * ターン種別
         */
        TurnType: {
            /**
             * 自ターン
             */
            Self: 1,

            /**
             * AIターンの代理操作
             */
            OtherAgency: 2,

            /**
             * 他ターン
             */
            Other: 3,
        },

        /**
         * ゲーム状態
         */
        context: Object,
    }
  },
  methods: {
    /**
     * 初期化処理を実行します。
     */
    init(context) {
        this.context = context
        this.$refs.field.init(context.windIndex)
    },

    /**
     * 更新処理を実行します。
     */
    update() {
        return new Promise(function (resolve, reject) {
            axios.post(`${this.$config.apiOrigin}/api/selectroom/`, {
                roomKey: this.context.roomKey,
                playerKey: this.context.playerKey,
            })
            .then(response => {
                let room = response.data
                this.context.room = room

                // フィールドの更新
                this.$refs.field.update(room)
                resolve()
            });
        }.bind(this));
    },

    /**
     * ツモを実行します。
     */
    draw() {
        this.update().then(function() {
            var turnType = this._getTurnType()
            switch (turnType) {
                case this.TurnType.Self:
                    // ツモ
                    this.$refs.player.draw(this.context.roomKey, this.context.playerKey)
                    break
                case this.TurnType.OtherAgency:
                    // AIのツモ
                    this.$refs.player.aiDraw(this.context.roomKey, this.context.playerKey)
                    break
            }
        }.bind(this))
    },

    /**
     * 捨牌を実行します。
     */
    _discard(tile) {
        this.$refs.player.discard(this.context.roomKey, this.context.playerKey, tile)
    },

    /**
     * ターン種別を取得します。
     */
    _getTurnType(turn) {
        let type = undefined
        if (this.context.room.turn === this.context.windIndex) {
            type = this.TurnType.Self
        } else if (this.context.firstPlayer) {
            type = this.TurnType.OtherAgency
        } else {
            type = this.TurnType.Other
        }
        return type
    },
  },
}
</script>

<style>

</style>
