<template>
<img :class=domain v-bind:src="buildTileImagePath(tile)" @dblclick="selected">
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
    buildTileImagePath: function(tile) {
        return require(`../../image/tiles/${tile}.png`);
    },
    selected: function() {
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
