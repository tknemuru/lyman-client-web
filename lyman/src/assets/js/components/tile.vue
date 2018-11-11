<template>
<img :class="classObject" v-bind:src="buildTileImagePath(tile)" @dblclick="_notifySelected">
</template>

<script>
export default {
  name: 'tile',
  data() {
    return {
    }
  },
  props: {
    tile: Number,
    domain: String,
    last: Boolean,
  },
  computed: {
    classObject: function () {
      return {
        hand: ('hand' === this.domain),
        river: ('river' === this.domain),
        last: this.last,
      }
    }
  },
  methods: {
    /**
     * 画像パスを組み立てます。
     */
    buildTileImagePath: function(tile) {
        return require(`../../image/tiles/${tile}.png`);
    },

    /**
     * 選択されたことを知らせます。
     */
    _notifySelected: function() {
        this.$emit('selected', this.tile)
    }
  },
}
</script>

<style>
img {
    width: 60px;
    height: auto;
}
img.river {
    width: 30px;
}
.left img.river {
  transform: rotate(90deg);
}
.right img.river {
  transform: rotate(-90deg);
}
.upper img.river {
  transform: rotate(180deg);
}
.hand:hover,.hand.last {
    margin-bottom: 40%;
    cursor: pointer;
}
</style>
