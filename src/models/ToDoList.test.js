import { slugify } from '../assets/helpers';
import { ToDoListItem, ToDoList } from './ToDoList';

it("can create a instance of ToDoListItem and change atributes", () => {
  const item = ToDoListItem.create({
    key: slugify("item 1"),
    value: "item 1",
    done: false
  });

  expect(item.value).toBe("item 1");
  expect(item.done).toBe(false);
  item.changeValue("novo item");
  expect(item.value).toBe("novo item");
  item.toggleDone();
  expect(item.done).toBe(true);
})

it("can create a empty todo list, add items, and remove item", () => {
  const todolist = ToDoList.create({ items: [] });

  expect(todolist.items.length).toBe(0);

  todolist.add("item 1");
  expect(todolist.items.length).toBe(1);
  expect(todolist.items[0].value).toBe("item 1");
  expect(todolist.items[0].key).toBe("item-1");
  expect(todolist.items[0].done).toBe(false);

  todolist.add("item 2");
  expect(todolist.items.length).toBe(2);
  expect(todolist.items[1].value).toBe("item 2");

  todolist.items[0].remove();
  expect(todolist.items.length).toBe(1);
  expect(todolist.items[0].value).toBe("item 2");
})

it("can remove all done items", () => {
  const todolist = ToDoList.create({ items: [] });
  todolist.add("item 1");
  todolist.items[0].toggleDone();
  todolist.add("item 2");
  todolist.add("item 3");
  todolist.items[2].toggleDone();

  todolist.removeDoneItems();
  expect(todolist.items.length).toBe(1);
  expect(todolist.items[0].value).toBe("item 2");
})

it("can remove all done items 2", () => {
  const todolist = ToDoList.create({ items: [] });
  todolist.add("item 1");
  todolist.items[0].toggleDone();
  todolist.add("item 2");
  todolist.items[1].toggleDone();
  todolist.add("item 3");
  todolist.items[2].toggleDone();

  todolist.removeDoneItems();
  expect(todolist.items.length).toBe(0);
})

it("can reorder todolist items", () => {
  const todolist = ToDoList.create({ items: [] });
  todolist.add("item 1");
  todolist.add("item 2");
  todolist.add("item 3");

  todolist.reorder(0, 2);
  expect(todolist.items[0].value).toBe("item 2");
  expect(todolist.items[1].value).toBe("item 3");
  expect(todolist.items[2].value).toBe("item 1");

  todolist.reorder(2, 2);
  expect(todolist.items[0].value).toBe("item 2");
  expect(todolist.items[1].value).toBe("item 3");
  expect(todolist.items[2].value).toBe("item 1");
})