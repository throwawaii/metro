'use strict'

import { getConfig } from './res'
import { updateDictionary, translate } from './i18n'
import MetroMap from './MetroMap'

L.Icon.Default.imagePath = 'http://cdn.leafletjs.com/leaflet/v0.7.7/images'

if (L.Browser.ie) {
    alert('Does not work in IE (yet)')
}

import polyfills from './util/polyfills'
polyfills()

const tokens = window.location.search.match(/city=(\w+)/)
const city = tokens ? tokens[1] : 'spb';

(async () => {
    const config = await getConfig()
    const dictPromise = updateDictionary(config.url['dictionary'])
    for (const url of Object.keys(config.url)) {
        config.url[url] = config.url[url].replace(/\{city\}/g, city)
    }
    document.title = translate(`${city === 'moscow' ? 'Moscow' : 'St Petersburg'} metro plan proposal`)
    await dictPromise
    document.title = translate(document.title)
    new MetroMap(config)
})()
