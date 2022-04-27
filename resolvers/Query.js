export const Query = {
    getTodo: (_, { id }, { db }) => {
        return db.todos.find(
            (student) => student.id == id
        )
    },


}