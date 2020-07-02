import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    set(state, payload) {
      state.todos = payload;
    },
  },
  getters: {
    todo: (state) => (id) => state.todos.filter((todo) => todo.id === id)[0],
    lastID: (state) => {
      const last = state.todos[state.todos.length - 1];
      return last ? last.id : 0;
    },
  },
  actions: {
    add(ctx, todo) {
      const newTodos = [...ctx.state.todos, todo];
      ctx.commit('set', newTodos);
    },
    edit(ctx, todo) {
      const i = ctx.state.todos.map((t) => t.id)
        .indexOf(todo.id);
      if (i === -1) return;
      const newTodos = ctx.state.todos;
      newTodos[i] = todo;
      ctx.commit('set', newTodos);
    },
    delete(ctx, id) {
      const newTodos = ctx.state.todos.filter((todo) => todo.id !== id);
      ctx.commit('set', newTodos);
    },
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
