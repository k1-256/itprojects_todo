<template>
  <div class="card todo">
    <div class="content">
      <div class="title">
        {{ todo.title }}
      </div>
      <div class="tasks">
        <div class="task"
             v-for="task in todo.tasks"
             :key="task.title"
             :class="{ completed: task.completed }">
          <i v-if="task.completed" class="fas fa-check-circle" />
          <i v-else class="fas fa-times-circle" />
          <span>{{ task.title }}</span>
        </div>
      </div>
    </div>
    <div class="bottom" :class="{ finished }">
      <div class="status">
        <span v-if="finished">Завершено</span>
        <span v-else>В процессе</span>
      </div>
      <div class="actions">
        <button @click="editTodo">
          <i class="far fa-pencil-alt" />
        </button>
        <button @click="deleteTodo">
          <i class="far fa-trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  computed: {
    finished() {
      return this.todo.tasks.length === this.todo.tasks.filter((t) => t.completed).length;
    },
  },
  methods: {
    async editTodo() {
      await this.$router.push(`/edit/${this.todo.id}`);
    },
    async deleteTodo() {
      this.$modal.show('dialog', {
        title: 'Вы действительно хотите удалить этот To-Do?',
        buttons: [
          {
            title: 'Отменить',
          },
          {
            title: 'Удалить',
            handler: async () => {
              await this.$store.dispatch('delete', this.todo.id);
              this.$modal.hide('dialog');
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.todo
  margin 1em 0
  .content
    .title
      font-size 1.25em
      font-weight 500
    .tasks
      padding-left 1em
  .bottom
    border 1px solid #DB2828
    .status
      display flex
      flex 1 1 auto
      justify-content center
      align-items center
      border-right 1px solid #DB2828
      color #DB2828
      font-size 1.5em
      font-weight 500
      letter-spacing .75px
    .actions
      button:first-child
        border-right 1px solid #DB2828
    &.finished
      border-color #21BA45
      .status
        border-right 1px solid #21BA45
        color #21BA45
      .actions
        button:first-child
          border-right 1px solid #21BA45
.task
  i
    color #DB2828
    margin-right 5px
  &.completed
    i
      color #21BA45
button
  border none
  width 3em
  height 3em
  background transparent
  cursor pointer
  i
    font-size 1.5em
  &:focus
    outline none
</style>
