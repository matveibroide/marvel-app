class MarvelService {
    _apiBase = `https://gateway.marvel.com:443/v1/public/characters`
    _apiKey = `apikey=c4e1bd0e70081aed2a98de5106235fb5`


    getResource = async (URL) => {

    let res = await fetch(URL)
        

    if (!res.ok) {
        throw new Error(`Could not fetch ${URL}, status:${res.status}`)
    }

    return await res.json()
}


getAllCharacters = async () => {

    const res = await this.getResource(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`)
    return res.data.results.map(this._transformCharacter)
}

getCharacter = async (id) => {
    const slash = '/'
    const res = await this.getResource(`${this._apiBase}${slash}${id}?${this._apiKey}`)

    return this._transformCharacter(res.data.results[0])
}

_transformCharacter = (char) => {

    const id = char.id? char.id : null
    return {
        id:id,
        name:char.name,
        description:char.description,
        homepage:char.urls[0].urls,
        wiki:char.urls[1].url,
        thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
        comics:char.comics.items
    }

}

}


export default MarvelService