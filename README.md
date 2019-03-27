# serviceworker-webpack-plugins

> Simplifies creation of serviceworker files to serve your PWA.


## Usage

- **install**

```bash
$ npm i serviceworker-webpack-plugins
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
    script.src = `./sw-register.js?v=${Date.now()}`
    el.parentNode.insertBefore(script,el)
</script>

```

## Key Points

`createChildCompiler`

```javascript
/**
 * @params compilerName
 * @params outputOptions
**/
const childCompiler = compilation.createChildCompiler(compilerName,outputOptions)
```