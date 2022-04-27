export const Mutation = {
    addTodo: (parent, { addTodoInput }, { db, pubsub }, info) => {
        if (!existInArray(db.users, "id", addTodoInput.user)) {
            throw new Error("not such a user . Please verify")
        } else {
            const newTodo = { id: db.todos.length ? db.todos[db.todo.length - 1].id + 1 : 1, ...addTodoInput }
            db.todos.push(newTodo);
            pubsub.publish('todo', { todo: { newTodo, mutation: "ADD" } })
            return newTodo
        }

    },
    editTodo: (parent, { id, editTodoInput }, { db, pubsub }, info) => {
        if (editTodoInput.user && !existInArray(db.users, "id", editTodoInput.user)) {
            throw new Error("no such a user . Please verify");
        } else {
            //Il faut que l'id du todo existe
            const todo = db.todos.find((todoItem) => todoItem.id === id);
            if (!todo) {
                throw new Error("no such todo");
            } else {
                for (let key in editTodoInput) {
                    todo[key] = editTodoInput[key];
                }
                pubsub.publish("todo", { todo: { todo, mutation: "UPDATE" } });
                return todo;
            }
        }
    },
    deleteTodo: (parent, { id }, { db }, info) => {
        const myTodo = db.todos.findIndex((todo) => todo.id === id);
        if (myTodo === -1) {
            throw new Error("Todo innexistant");
        } else {
            const [todo] = db.todos.splice(myTodo, 1);
            pubsub.publish("todo", { todo: { todo, mutation: "DELETE" } });
            return todo;
        }
    },

}

function existInArray(array, attribut, value) {
    return array.some((element) => element[attribut] == value);
}