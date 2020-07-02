<template>
  <div id="app">
    <v-dialog />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
  #app
    margin 1em 0
  .card
    border none
    box-shadow 0 1px 3px 0 #D4D4D5,0 0 0 1px #D4D4D5
    .content
      padding 0.5em 1em 0.75em
    .bottom
      margin 0 -1px -1px -1px
      border-radius 0 0 .28571429rem .28571429rem
      display flex
      width calc(100% + 2px)
      height calc(100% + 1px)
      border 1px solid #D4D4D5
</style>
