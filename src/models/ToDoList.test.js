import { ToDoListItem, ToDoList } from './ToDoList';

it("can create a instance of ToDoListItem", () => {
  const item = ToDoListItem.create({
    key: "1",
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

it("can create a empty todo list, add items, change atributes, and remove item", () => {
  const todolist = ToDoList.create({ items: [] });

  expect(todolist.items.length).toBe(0);

  
})