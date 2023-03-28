import { useEffect, useState } from "react";
import { UserRepository } from "../repositories/userRepository";
import "./AlbumsCatalogue.css";

function Album({ title, imageUrl }) {
    return (
        <picture key={title}>
            <img src={imageUrl} alt={title} />
            <i>{title}</i>
        </picture>
    );
}

export default function AlbumsCatalogue({ params = { userid: 1 } }) {
    const { userid } = params;
    const title = "Álbumes de usuario";
    const [loading, setLoading] = useState(true);
    const [albumsData, setAlbumsData] = useState([]);
    const titlesUrl = `https://jsonplaceholder.typicode.com/users/${userid}/albums`;
    const imagesUrl = `https://jsonplaceholder.typicode.com/albums/${userid}/photos`;
    useEffect(() => {
        document.title = title;
        UserRepository.getUserAlbums(titlesUrl, imagesUrl)
            .then((albums) => {
                setLoading(false);
                setAlbumsData(albums);
            })
            .catch((e) => console.error(e.message()));
    }, [userid]);

    if (loading) {
        return <i>Cargando...</i>;
    }

    if (!albumsData) {
        return <code>¡Error en el componente!</code>;
    }

    if (albumsData.length === 0) {
        return <p>No hay álbumes disponibles para este usuario</p>;
    }

    return (
        <>
            <h1>{title}</h1>
            <div className="albums_catalogue">
                {albumsData.map((album) => {
                    return (
                        <Album title={album.title} imageUrl={album.imageUrl} />
                    );
                })}
            </div>
        </>
    );
}
