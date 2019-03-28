let mainCacheFiles = [
  'index.html'
]
let version = 'cache-version'

// 缓存静态资源
self.addEventListener('install', function (evt) {
  // 强制更新sw.js
  console.log(`${version} installing...`)
  self.skipWaiting()
  evt.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(mainCacheFiles)
    })
  )
})

// 缓存更新
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
            // 删除无效 cacheName
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
// 白名单过滤
function filterAssetRequest (url) {
  const urlObj = new URL(url)
  // 过滤参数
  let link = urlObj.href.substring(urlObj.protocol.length)
  if (urlObj.href.indexOf('?') > -1) {
    link = urlObj.href.substring(0, urlObj.href.indexOf('?'))
  }
  console.log('link', link)
  let result = mainCacheFiles.some(elem => {
    let reg = new RegExp(`${elem}$`)
    console.log('match', reg, link, link.match(reg))
    return link.match(reg)
  })
  // console.log('res', result)
  return result
}

// 请求拦截
self.addEventListener('fetch', function (evt) {
  const url = evt.request.url
  let assetMatch = filterAssetRequest(url)
  if (url.match('sockjs')) return
  let isGetMethod = evt.request.method === 'GET'
  // 过滤 非GET请求 | 非白名单url
  if (!isGetMethod || !assetMatch) return

  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      if (response) {
        return response
      }
      // console.log('缓存未匹配对应request,准备从network获取', caches)
      return fetch(evt.request).then(function (response) {
        // console.log('req', evt.request, response.clone())
        let cpResponse = response.clone()
        // console.log('fetch获取到的response:', response)
        caches.open(version).then(function (cache) {
          cache.put(evt.request, cpResponse)
        })
        return response
      })
    }).catch(function (err) {
      console.error('fetch 接口错误', err)
      throw err
    })
  )
})
