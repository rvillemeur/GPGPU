import { createShader, createProgram, loadShader } from './gl-utils.js'

var gpgpu = Object.assign(Object.create(Object.prototype), {
  setProgram: async function setProgram (gl) {
    const [vertexShaderSource, fragmentShaderSource] = await Promise.all([
      loadShader('public\\shader\\vertex\\shader.vert'),
      loadShader('public\\shader\\fragment\\shader.frag')
    ])

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = createProgram(gl, vertexShader, fragmentShader)
    gl.useProgram(program)
    return program
  },

  getCanvas: function getCanvas (width, height) {
    let canvas

    canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    return canvas
  },

  setVertices: function getVertices (gl, program, scene) {
    const vertices = new Float32Array([
      -1.0, 1.0, 0.0, 0.0, 1.0,
      -1.0, -1.0, 0.0, 0.0, 0.0,
      1.0, 1.0, 0.0, 1.0, 1.0,
      1.0, -1.0, 0.0, 1.0, 0.0
    ])
    const positionAttributeLocation = gl.getAttribLocation(program, 'position')
    const positionBuffer = gl.createBuffer()
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 20, 0)
  },

  getGL: function getGL (width, height) {
    const canvas = this.getCanvas(width, height)
    const gl = canvas.getContext('webgl2')
    if (!gl) {
      console.log('Webgl 2 is not available in your browser')
    }

    return gl
  },

  frameBufferIsComplete: function frameBufferIsComplete (gl) {
    let message
    let status
    let value

    status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)

    switch (status) {
      case gl.FRAMEBUFFER_COMPLETE:
        message = 'Framebuffer is complete.'
        value = true
        break
      case gl.FRAMEBUFFER_UNSUPPORTED:
        message = 'Framebuffer is unsupported'
        value = false
        break
      case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
        message = 'Framebuffer incomplete attachment'
        value = false
        break
      case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
        message = 'Framebuffer incomplete (missmatched) dimensions'
        value = false
        break
      case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        message = 'Framebuffer incomplete missing attachment'
        value = false
        break
      default:
        message = 'Unexpected framebuffer status: ' + status
        value = false
    }
    return { isComplete: value, message: message }
  },
  attachFrameBuffer: function attachFrameBuffer (gl, texture) {
    const frameBuffer = gl.createFramebuffer()
    // Make it the target for framebuffer operations - including rendering.
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer)
    // The target is always a FRAMEBUFFER.
    // We are providing the color buffer.
    // This is a 2D image texture.
    // The texture.
    // 0, we aren't using MIPMAPs
    gl.framebufferTexture2D(gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0)

    return frameBuffer
  },

  calculate: function calculate (gl, m, mSquared) {
    this.attachFrameBuffer(this.gl, mSquared)

    const program = this.setProgram(gl)

    this.getVertices()

    
    gl.vertexAttribPointer(textureCoordHandle, 2, gl.FLOAT, gl.FALSE, 20, 12);

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, m)
    gl.uniform1i(textureHandle, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  },

  initialize: function initialize (width, height) {
    this.gl = this.getGL(width, height)
  },

  create: function create () {
    var self = Object.create(this)

    Object.defineProperties(self, {
      'gl': {
        value: null,
        writable: true
      },
      'scene': {
        value: null,
        writable: true
      }
    })

    return self
  }
})

export { gpgpu }
