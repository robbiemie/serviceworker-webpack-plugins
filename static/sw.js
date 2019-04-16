let mainCacheFiles = [
  'index.html'
]
let params = self.location.search
let KV = params.substring(params.indexOf('?') + 1, params.length)
let version = KV.split('=')[1]

// Cache Static Resource
self.addEventListener('install', function (evt) {
  // force update sw.js
  console.log(`${version} installing...`)
  self.skipWaiting()
  evt.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(mainCacheFiles)
    })
  )
})

// Cache Update
self.addEventListener('activate', function (evt) {
  console.log(`${version} activating...`)
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      console.log('client', client)
      client.postMessage({ type: 'update', msg: '' })
    })
  })
  evt.waitUntil(
    caches.keys().then(function (cacheNames) {
      console.log('cacheNames', cacheNames)
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== version) {
            // delete expired cacheName
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
// filter whilteList
function filterAssetRequest (url) {
  const urlObj = new URL(url)
  // filter params
  let link = urlObj.href.substring(urlObj.protocol.length)
  if (urlObj.href.indexOf('?') > -1) {
    link = urlObj.href.substring(0, urlObj.href.indexOf('?'))
  }
  let result = mainCacheFiles.some(elem => {
    let reg = new RegExp(`${elem}`)
    return link.match(reg)
  })
  return result
}

// request block
self.addEventListener('fetch', function (evt) {
  const url = evt.request.url
  let assetMatch = filterAssetRequest(url)
  if (url.match('sockjs')) return
  let isGetMethod = evt.request.method === 'GET'
  // filter non-GET request | non-whileList URL
  if (!isGetMethod || !assetMatch) return

  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(evt.request).then(function (response) {
        let cpResponse = response.clone()
        caches.open(version).then(function (cache) {
          cache.put(evt.request, cpResponse)
        })
        return response
      })
    }).catch(function (err) {
      console.error('fetch interface error', err)
      throw err
    })
  )
})
