<template>
<img v-bind:src="buildTileImagePath(tile)">
</template>

<script>
export default {
  name: 'tile',
  data() {
    return {
    }
  },
  props: ['tile'],
  methods: {
    buildTileImagePath: function(tile) {
        return require(`../../image/tiles/${tile}.png`);
    },
  },
}
</script>

<style>

</style>
