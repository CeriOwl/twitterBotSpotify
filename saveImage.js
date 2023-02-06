const fs = require("fs")
const Stream = require("stream").Transform
const http = require("http")
const https = require("https")

const downloadImage = (url, filename, callback) => {
    let client = http
    if (url.toString().indexOf("https") === 0) {
        client = https
    }

    client.request(url, res => {
        let data = new Stream()
        res.on("data", chunck => {
            data.push(chunck)
        })
        res.on("end", () => {
            fs.writeFileSync(filename, data.read())
        })
    }).end()
}

module.exports = {downloadImage}