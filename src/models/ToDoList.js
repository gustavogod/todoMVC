import { destroy, getParent, types, detach } from "mobx-state-tree";

import { slugify } from "../assets/helpers";

export const ToDoListItem = types
  .model({
    key: types.string,
    value: types.string,
    done: types.boolean
  })
  .actions(self => ({
    changeValue(newValue) {
      if (newValue !== self.value &&
          !getParent(self, 2).items.some(item => item.value === newValue)
        ) {
        self.key = slugify(newValue);
        self.value = newValue;
      }
    },
    toggleDone() {
      self.done = !self.done;
    },
    remove() {
      getParent(self, 2).remove(self);
    }
  }));

export const ToDoList = types
  .model({
    items: types.array(ToDoListItem)
  })
  .actions(self => ({
    add(value) {
      if (!self.items.some(item => item.value === value)) {
        self.items.push( ToDoListItem.create({
          key: slugify(value),
          value,
          done: false
        }));
      }
    },
    remove(item) {
      destroy(item);
    },
    removeDoneItems() {
      const length = self.items.length;
      for (let i = length - 1; i >= 0; i--) {
        if (self.items[i].done) {
          self.items[i].remove();
        }
      }
    },
    reorder(from, to) {
      //salvar item a ser movido
      const item = detach(self.items[from]);
      self.items.splice(to, 0, item);
    },
    toggleAll() {
      if(self.items.some(item => !item.done)) { //tem algum ativo?
        self.items.forEach( item => {
          if (!item.done) {
            item.toggleDone();
          }
        })
      }
      else { //todos estão completos
        self.items.forEach( item => item.toggleDone() )
      }
    }
  }))
  .views(self => ({
    itemsLeft() {
      return self.items.filter( item => !item.done ).length;
    },
    getFilteredItems(filter = 'ALL') {
      const states = {
        ALL: self.items,
        ACTIVE: self.items.filter( item => !item.done),
        COMPLETED: self.items.filter( item => item.done)
      }

      return states[filter];
    }
  }));