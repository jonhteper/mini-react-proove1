import { useEffect, useState } from "react";
import { TodosRepository } from "../repositories/todosRepository";
import "./Todos.css";

export default function Todos({ params = { userid: 1, status: "pending" } }) {
    const { status, userid } = params;
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Tareas");

    if (!["pending", "completed", "all"].includes(status)) {
        window.location.pathname = `/todos/pending/${userid}`;
    }

    useEffect(() => {
        TodosRepository.getAllTodos(userid)
            .then((t) => {
                if (status === "pending") {
                    setTitle("Tareas pendientes");
                    setTodos(
                        t.filter((t) => {
                            return t.completed === false;
                        })
                    );
                } else if (status === "completed") {
                    setTitle("Tareas completadas");
                    setTodos(
                        t.filter((t) => {
                            return t.completed === true;
                        })
                    );
                } else {
                    setTitle("Tareas");
                    setTodos(t);
                }
                setLoading(false);
                document.title = title;
            })
            .catch((e) => console.error(e));
    }, [status, userid]);

    if (loading) {
        return <i>Cargando tareas...</i>;
    }

    if (todos.length === 0) {
        return <i>Ninguna tarea disponible para este usuario</i>;
    }

    return (
        <>
            <h1>{title}</h1>
            <ol className="Todos">
                {todos.map((todo) => {
                    return <li key={todo.title}>{todo.title}</li>;
                })}
            </ol>
        </>
    );
}
