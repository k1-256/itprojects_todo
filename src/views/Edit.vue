<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card edit">
          <div class="content">
            <div class="title">
              <span v-if="mode === 'create'">Создание</span>
              <span v-else>Редактирование</span>
              To-Do
            </div>
            <div class="todo_title">
              <input placeholder="Заголовок" type="text" v-model="newTodo.title">
            </div>
            <div class="task_title"
                 v-for="task in newTodo.tasks"
                 v-bind:key="task.id">
              <input
                placeholder="Задача"
                type="text"
                v-model="task.title">
              <div class="actions">
                <button @click="toggleTask(task.id)">
                  <i v-if="task.completed" class="fas fa-check-circle completed" />
                  <i v-else class="fas fa-times-circle" />
                </button>
                <button @click="deleteTask(task.id)">
                  <i class="far fa-trash" />
                </button>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="actions">
              <button @click="$router.push('/')">
                <i class="fas fa-angle-left" />
              </button>
              <button @click="addTask">
                <i class="fas fa-plus-circle" />
              </button>
              <button @click="reset">
                <i class="fas fa-redo" />
              </button>
              <button @click="save">
                <i class="fas fa-save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit',
  mounted() {
    if (this.mode === 'create') {
      this.todo.id = this.$store.getters.lastID + 1;
      this.reset();
      return;
    }
    this.todo = this.$store.getters.todo(+this.$route.params.id);
    if (!this.todo) {
      this.$router.push('/').then();
      return;
    }
    this.reset();
  },
  data: () => ({
    todo: {
      id: 0,
      title: '',
      tasks: [],
    },
    newTodo: {},
  }),
  computed: {
    mode() {
      return this.$route.params.id ? 'edit' : 'create';
    },
  },
  methods: {
    addTask() {
      const last = this.newTodo.tasks[this.newTodo.tasks.length - 1];
      this.newTodo.tasks = [...this.newTodo.tasks, {
        id: last ? last.id + 1 : 1,
        title: '',
        completed: false,
      }];
    },
    toggleTask(id) {
      const i = this.newTodo.tasks.map((task) => task.id).indexOf(id);
      if (i === -1) return;
      this.newTodo.tasks[i].completed = !this.newTodo.tasks[i].completed;
    },
    deleteTask(id) {
      this.newTodo.tasks = [...this.newTodo.tasks.filter((task) => task.id !== id)];
    },
    async save() {
      if (this.newTodo.title === '') return;
      console.log(this.newTodo);
      for (let i = 0; i < this.newTodo.tasks.length; i += 1) {
        const task = this.newTodo.tasks[i];
        if (task.title === '') {
          this.newTodo.tasks.splice(i, 1);
          i -= 1;
        }
      }
      if (this.newTodo.tasks.length === 0) return;
      if (this.mode === 'create') {
        await this.$store.dispatch('add', this.newTodo);
      } else {
        await this.$store.dispatch('edit', this.newTodo);
      }
      await this.$router.push('/');
    },
    reset() {
      this.newTodo = { ...this.todo };
    },
  },
};
</script>

<style lang="stylus">
.content .title
  font-size 1.25em
  font-weight 500
.bottom > .actions
  display flex
  flex 1 1 auto
  button
    border 1px solid #D4D4D5
    border-top none
    border-bottom none
    width 3em
    height 3em
    flex 1 1 25%
    background transparent
    cursor pointer
    i
      font-size 1.5em
    &:focus
      outline none
    &:first-child
      border-left none
    &:last-child
      border-right none
.todo_title, .task_title
  display flex
  input
    margin 0.25em 0
    flex 1 1 auto
.task_title .actions
  margin-left 5px
  button
    border none
    width 3em
    height 3em
    background transparent
    cursor pointer
    i
      font-size 1.5em
    &:first-child
      i
        color #DB2828
        &.completed
          color #21BA45
    &:focus
      outline none
</style>
