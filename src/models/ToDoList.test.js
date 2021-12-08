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

it("can create a to do list, add items, change atributes, and remove item", () => {
  const list = ToDoList.create({
    items: [
      {
        key: "1",
        value: "item 1",
        done: false
      }
    ]
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].value).toBe("item 1");

  list.add(
    ToDoListItem.create({
      key: "2",
      value: "item 2",
      done: false
    })
  )

  expect(list.items.length).toBe(2);
  expect(list.items[1].value).toBe("item 2");

  list.items[1].changeValue("novo item");
  expect(list.items[1].value).toBe("novo item");

  list.items[0].remove();
  expect(list.items[0].value).toBe("novo item");
})