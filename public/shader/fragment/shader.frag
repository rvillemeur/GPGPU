#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
uniform highp sampler2D m;
#else
precision mediump float;
uniform  mediump sampler2D m;
#endif

in vec2 v_texcoord;

void main()
{
  float i, j;
  float value = 0.0;
  float value1, value2;

  i = vTextureCoord.s;
  j = vTextureCoord.t;

  for(float k=0.0; k<128.0; ++k)
  {
    value1 = texture2D(m, vec2(i, k/128.0)).r;
    value2 = texture2D(m, vec2(k/128.0, j)).r;
    value += value1*value2;
  }
  gl_FragColor.r = value;
};