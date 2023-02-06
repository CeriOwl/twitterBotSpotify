require("dotenv").config({ path: __dirname + "/.env" })

const { twitterClient } = require("./twitterClient")
const { spotifyApi, dataToken } = require("./spotifyClient")
const { downloadImage } = require("./saveImage")

const tracksFormated = []

const media = Promise.all([
    twitterClient.v1.uploadMedia("./imageNo1.png", {mimeType: "png"})
])

const tweet = async () => {
    let tracksToSend = ""

    tracksFormated.forEach(track => {
        tracksToSend += track
    })

    tracksToSend += "\n\n#kpop #spotify #korea #SouthKorea"
    
    try {
        await twitterClient.v1.tweet(tracksToSend, { media_ids: await media })
    } catch (e) {
        console.log(e)
    }
}

const startProcess = () => {
    const playlistTracks = dataToken.then(token => {
        spotifyApi.setAccessToken(token)
        const tracks = spotifyApi.getPlaylistTracks("37i9dQZEVXbNxXF4SkHj9F", { limit: 5, offset: 0 })
            .then(track => {
                return track.body.items
            }, err => {
                console.log("ERROR", err)
            })
        return tracks
    }).catch(err => console.log(err))

    playlistTracks.then(tracks => {
        tracks.forEach((track, index) => {
            let dataToFormat = `[${index + 1}] ${track.track.name} - ${track.track.artists[0].name}\n`
            tracksFormated.push(dataToFormat)
        })
        downloadImage(tracks[0].track.album.images[0].url, "imageNo1.png")
        tweet()
    })
}

const controlPass = () => {
    let now = new Date()
    if(now.getHours() === 3 && now.getMinutes() === 0){
        return true
    }else{
        return false
    }
}
/*
setInterval(() => {
    if(controlPass(counter)){
        startProcess()
    }
}, 86400000)
*/

startProcess()