import { renderTodos } from './utils';
import * as fromStore from './store/index';
import { RemoveTodo } from './store/index';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: fromStore.reducer
};

const store = new fromStore.Store(reducers);

// console.log(store.value);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    store.dispatch(new fromStore.AddTodo(payload));

    console.log(store.value);

    input.value = '';
  },
  false
);

const unsubscribe = store.subscribe(state => {
  console.log('const');
  renderTodos(state.todos.data);
});

destroy.addEventListener('click', unsubscribe, false);

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);
    const data = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new RemoveTodo(data));
    console.log(data);
  }
});

// store.subscribe(state => console.log('STATE:::', state));
