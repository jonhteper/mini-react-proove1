export const get = async (url) => {
    return fetch(url).then((d) => d.json())
}

export const UserRepository = {
    async getUsersByCities(url) {
        return get(url).then((users) => {
            return users.map((user) => {
                return {
                    key: user.username,
                    name: user.name,
                    city: user.address.city,
                }
            })
        })
    },
    async getUserAlbums(titlesUrl, imagesUrl) {
        const titles = await get(titlesUrl).then((albumsData) => {
            return albumsData.map((album) => album.title)
        })

        return get(imagesUrl).then(albums_data => {
            let albumsMap = new Map();
            let albums = [];
            albums_data.forEach(album => {
                albumsMap.set(album.title, album.url);
            })

            titles.forEach(title => {
                albums.push({
                    title: title,
                    imageUrl: albumsMap.get(title)|| "https://via.placeholder.com/600/3a0b95",
                })
            })

            return albums;
        });
    },
}
