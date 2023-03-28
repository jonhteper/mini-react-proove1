import "./App.css";
import Cities from "./components/Cities";
import { Link, Route, Switch } from "wouter";
import AlbumsCatalogue from "./components/AlbumsCatalogue";
import Todos from "./components/Todos";

function Index() {
    document.title = "Mini react app - Prueba 2";
    if (window.location.pathname !== "/" ) {
        window.location.pathname = "/";
    }

    return (
        <>
        <h1>Mini React App</h1>

        <div className="Resources">
            <h2>Recursos:</h2>
            <h3><Link href="/cities">/cities</Link></h3>
            <p>Tabla de usuarios y su ciudad.</p>
            <h3><Link href="/albums/1">/albums/:userid</Link></h3>
            <p>Lista de álbumes de usuario.</p>
            <h3><Link href="/todos/pending/1">/todos/pending/:userid</Link></h3>
            <p>Lista de tareas pendientes del usuario.</p>
            <h3><Link href="/todos/completed/1">/todos/completed/:userid</Link></h3>
            <p>Lista de tareas completadas del usuario.</p>
            <h3><Link href="/todos/all/1">/todos/all/:userid</Link></h3>
            <p>Todas las tareas del usuario.</p>




        </div>
        </>
    );
}

function App() {
    return (
        <div className="App">
            <Switch>
                <Route component={Cities} path="/cities" />
                <Route component={AlbumsCatalogue} path="/albums/:userid" />
                <Route component={Todos} path="/todos/:status/:userid" />
                <Route component={Index} />
            </Switch>
        </div>
    );
}

export default App;
