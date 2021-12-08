import { ToDoListItem, ToDoList } from './ToDoList';

it("can create a instance of ToDoListItem", () => {
  const item = ToDoListItem.create({
    id: "1",
    description: "item 1",
    isCompleted: false
  });

  expect(item.description).toBe("item 1");
  expect(item.isCompleted).toBe(false);
  item.changeDescription("novo item");
  expect(item.description).toBe("novo item");
  item.toggleIsCompleted();
  expect(item.isCompleted).toBe(true);
})

it("can create a to do list, add items, change atributes, and remove item", () => {
  const list = ToDoList.create({
    items: [
      {
        id: "1",
        description: "item 1",
        isCompleted: false
      }
    ]
  })

  expect(list.items.length).toBe(1);
  expect(list.items[0].description).toBe("item 1");

  list.add(
    ToDoListItem.create({
      id: "2",
      description: "item 2",
      isCompleted: false
    })
  )

  expect(list.items.length).toBe(2);
  expect(list.items[1].description).toBe("item 2");

  list.items[1].changeDescription("novo item");
  expect(list.items[1].description).toBe("novo item");

  list.items[0].remove();
  expect(list.items[0].description).toBe("novo item");
})