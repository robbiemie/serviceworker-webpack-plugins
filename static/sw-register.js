if ('serviceWorker' in navigator) {
  // checkout serviceworker support
  navigator.serviceWorker.addEventListener('message', function (e) {
    console.log('reload page', e.data)
    location.reload()
  })
  let version = 1.1
  navigator.serviceWorker.register(`sw.js?v=cache-${version}`, { scope: './' })
    .then(function (registration) {
      console.log('serviceworker register success')
      let serviceworker
      if (registration.installing) {
        serviceworker = registration.installing
        console.log('currrent satatus： installing')
      } else if (registration.waiting) {
        serviceworker = registration.waiting
        console.log('currrent satatus： waiting')
      } else if (registration.activing) {
        serviceworker = registration.waiting
        console.log('currrent satatus activing')
      }
      if (serviceworker) {
        console.log('current serviceworker', serviceworker)
        serviceworker.addEventListener('statechange', function (event) {
          console.log('currrent satatus changed:', event.target.state)
        })
      }
    }).catch(function (err) {
      console.log('register fail', err)
    })
}
