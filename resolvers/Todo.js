export const Todo = {
    todo: (user, _, { db }) => {
        return db.users.filter(
            (user) => user.todo == todo.id
        );
    }
}