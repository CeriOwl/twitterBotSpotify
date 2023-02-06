
const SpotifyWebApi = require("spotify-web-api-node")

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_ID_SECRET,
    redirectUri: process.env.REDIRECT_URI
})

const dataToken = spotifyApi.clientCredentialsGrant()
.then(
    (data) => {
        return data.body["access_token"]
    },
    function (err) {
        console.log('Something went wrong when retrieving an access token', err)
    }
)

module.exports = { spotifyApi, dataToken }