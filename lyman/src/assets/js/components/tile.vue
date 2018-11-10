<template>
<img :class=domain v-bind:src="buildTileImagePath(tile)" @dblclick="_notifySelected">
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
    width: 40px;
}
.hand:hover {
    margin-bottom: 40%;
    cursor: pointer;
}
</style>
