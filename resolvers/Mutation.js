export const Mutation = {
    addTodo: (parent, { addTodoInput }, { db }, info) => {
        const newTodo = { id: String, ...addTodoInput }
        db.todo.push(newTodo);
        //pubsub.publish('newTodo', { newTodo })
        return newTodo
    },
    editTodo: (parent, { editTodoInput }, { db }, info) => {
        const newTodo = { id: String, ...editTodoInput }
        db.todo.patch(newTodo);
        //pubsub.publish('newTodo', { newTodo })
        return newTodo
    },
    deleteTodo: (parent, { id }, { db }, info) => {
        db.todo.delete(id);

    }
}