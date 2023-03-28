import { get } from "./userRepository";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export const TodosRepository = {
    async getAllTodos(userid) {
        return get(TODOS_URL).then((todos) => {
            return todos.filter((todo) => todo.userId === parseInt(userid));
        });
    },
};
