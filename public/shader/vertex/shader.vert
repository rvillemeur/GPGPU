#version 300 es

in vec4 position;
in vec2 texcoord;
out highp vec2 vTextureCoord;

void main() {
  gl_Position = vec4(position, 1.0);
  vTextureCoord = textureCoord;
}