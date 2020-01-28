import addEvent from './common.js'
import gpgpu from './gpgpu.js'

async function main () {
  const gpu = await gpgpu.create().initialize(width, height)
}

addEvent(window, 'load', main)
