import { destroy, getParent, types } from "mobx-state-tree";

import { slugify } from "../assets/helpers";

/** 
 * ESTADO GLOBAL
 *  - TAREFA
 *    - strIng, descrição da tarefa
 *    - boolean, tarefa feita ou não
 *    - remove
 *  - ACTIONS
 *    -Mudar descrição da tarefa
 *    -ToggleStatus - mudar o status da tarefa
 * 
 * - LISTA DE TAREFAS
 *    - Array de tarefas
 *  - ACTIONS
 *    - Adicionar tarefa
 *    - Remover tarefa
 *    - Remover todos os items completos
 *    - Marcar todas como completas
 *    - Marcar todas como ativas
 *  - VIEWS
 *    - Retornar todas as tarefas (talvez não precise de uma view só p isso)
 *    - Retornar tarefas ativas
 *    - Retornar tarefas completas
 *    - Retornar quantidade de tarefas ativas
 *    - Retornar true se a lista estiver vazia
 *    - Retornar true se houver ao menos uma tarefa completa
 *    - Retornar true se todas as tarefas estiverem ativas
 *    - Retornar true se todas as tarefas estiverem completas
 * */

/**
 * 1 - Construir estrutura básica do modelo e fazer os teste unitários
 * 2 - Refatorar as actions acrescentando os acessos a localStorage
 */

export const ToDoListItem = types
  .model({
    key: types.identifier,
    value: types.string,
    done: types.boolean
  })
  .actions(self => ({
    changeValue(newValue) {
      if (newValue !== self.value) {
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
          key: value.slugify(),
          value,
          done: false
        }));
      }
    },
    remove(item) {
      destroy(item);
    }
  }));