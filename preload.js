// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const electron = require('electron')
const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    function getWeatherData(city, callback) {
        ipc.send('update-weather-request', 42)
        ipc.on('update-weather-response', function(event, args) {
            console.log('Received:' + JSON.stringify(args))

            const temperature = args['main']['temp']
            const city = args['name']

            callback(city, temperature)
        })
    }

    window.getWeatherData = getWeatherData
    window.replaceText = replaceText
})