import { UserRepository } from "../repositories/userRepository";
import { useEffect, useState } from "react";
import "./CitiesTable.css";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
export default function Cities() {
    const [users, setUsers] = useState([]);
    const title = "Usuarios por ciudad";
    useEffect(() => {
        document.title = title;
        UserRepository.getUsersByCities(USERS_URL)
            .then((users) => {
                setUsers(users);
            })
            .catch((e) => {
                console.error(e.message);
            });
    }, []);
    if (users.length === 0) {
        return <i>Cargando...</i>;
    }

    return (
        <>
            <h1>{title}</h1>
            <table className="c__table users__table">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                    </tr>
                    {users.map((user) => {
                        return (
                            <tr key={user.key}>
                                <td>{user.name}</td>
                                <td>{user.city}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
