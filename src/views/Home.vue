<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <masonry :cols="{ default: 3, 991: 2, 575: 1 }" :gutter="30">
          <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
          <button class="add" @click="$router.push('/edit')">
            <i class="fas fa-plus-circle" />
          </button>
        </masonry>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue';

export default {
  name: 'Home',
  components: {
    TodoItem,
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .add
    margin 1em 0
    border none
    width 100%
    height 106px
    color #D4D4D5
    box-shadow 0 1px 3px 0 #D4D4D5,0 0 0 1px #D4D4D5
    background transparent
    cursor pointer
    i
      font-size 3em
    &:focus
      outline none
</style>
