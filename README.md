Expirment on calculation using the GPU through WEBGL.

Strongly inspired by article found on [http://www.vizitsolutions.com/portfolio/webgl/gpgpu/index.html]

 WebGL GPGPU implementations share a common structure. 

# The Canvas

As always with WebGL, we start by creating a canvas. 
1.  the canvas is sized to fit the problem. If we are solving a differential equation on a 128x128 grid, create a 128x128 (width x height) canvas.

2. we don't have to attach the canvas to the DOM, simply create the canvas and use it to get a WebGL context. We only attach it to the DOM if we use it to visualize our results.

# The Geometry

For computing we want the simplest geometry possible. The only purpose of the vertices and geometry is to generate calls to the fragment shader at every point on the canvas. The geometry is almost always two triangles that cover the canvas as shown in the figure.

# The Fragments

The simple geometry is rasterized. It is divided into fragments corresponding to the pixels on the original canvas. We use a simple geometry with no projection so that the mapping from fragments to pixels is direct.

# Input Texture

Textures are data storage on the GPU. For our GPGPU work, it is easiest to think of them as 2D arrays, where we want one element of the array for each pixel of the canvas. We create a texture sized exactly as the canvas. So with a 128x128 problem grid, we have a 128x128 canvas, and a 128x128 texture.

Remember that textures use normalized coordinates. We attach the (0, 0) point to one corner of the geometry, and the (1, 1) point to the opposite corner. This completely covers the geometry, and hence the canvas, with the texture.

# Code

Now things get really interesting. When you do a rendering step, the fragment shader is invoked for every fragment in the geometry to produce a pixel value gl_FragColor. This is the result of the computation at that point on the grid. The shader reads values from the input texture and the gl_FragColor value is loaded into the output texture.

# Output Texture

Drawing the fragment shader result to the screen would not be very useful for computations. Instead we write it to another texture. A texture used this way, as a target for off-screen rendering, is referred to as a framebuffer object, or FBO.

Our output texture also has the same dimensions as the canvas and the input texture. Indeed, it is common practice to do time evolution by swapping the input and output textures and doing another render step.

You might be asking "Where does the first texture come from?" There are two possibilities. For the first, we create the texture directly from a fragment shader. Think about the diagram without the input texture, where the fragment shader computes gl_FragColor using only the (x, y) coordinates as input. A second option is to compute the values outside of OpenGL, and specify them in a data array when the texture is created. This second is similar to loading image data into a texture. We will show examples of both approaches. 

As mentionned, This work is licensed under a Creative Commons Attribution 4.0 International License. 