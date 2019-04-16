# serviceworker-webpack-plugins

> Simplifies creation of serviceworker files to serve your PWA.


## Usage

- **install**

```bash
$ npm i serviceworker-webpack-plugins --save-dev
```

- **setup**

webpack.config.js

```javascript
const ServiceworkerPlugins = require('serviceworker-webpack-plugins')

module.exports = {
  // ...
  plugins: [
    new ServiceworkerPlugins({
      entry: '', // [PATH] use local sw.js
      excludes: [], // [PATH] exclude cacheFiles path
      filename: '' // [NAME] rename ouput sw.js filename
    })
  ]
}
```


## Note

> Please pay attention before use:

Insert the following script tag below your body node

```html
<script>
    let script = document.createElement('script')
    let el = document.body.getElementsByTagName('script')[0]
    script.src = `./sw.js?v=${Date.now()}`
    el.parentNode.insertBefore(script,el)
</script>

```

> Local debugging

- Chrome whiteList Setting：chrome://flags/#unsafely-treat-insecure-origin-as-secure
- Reason: https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features


## Key Points

`createChildCompiler`

```javascript
/**
 * @params compilerName
 * @params outputOptions
**/
const childCompiler = compilation.createChildCompiler(compilerName,outputOptions)
```
