const axios = require('axios')
const fs = require('fs')

const {
  FF_CONFIG_KEY,
  FF_CONFIG_CONTEXT
} = process.env
const CONFIG_API_URL = process.argv[2] || 'https://config.shaunsweet.com/rest/rawFile'
const CONFIG_SAVE_TARGET = 'env.js'

if (!FF_CONFIG_KEY) throw new Error('Need ENV variable $FF_CONFIG_KEY exported in bash profile')
if (!FF_CONFIG_CONTEXT) throw new Error('Need ENV variable $FF_CONFIG_CONTEXT exported in bash profile')

const client = axios.create({
  headers: {
    'Client-Token': FF_CONFIG_KEY,
    'Context': FF_CONFIG_CONTEXT,
    'File': 'env.js',
    'Application-name': 'web-ui'
  }

})

client.get(CONFIG_API_URL)
  .then((res) => {
    fs.writeFile(CONFIG_SAVE_TARGET, res.data, (err) => {
      if (err) throw err
      console.log(`"${FF_CONFIG_CONTEXT}" config details written to file in the project root -> ${CONFIG_SAVE_TARGET}`)
    })
  })
