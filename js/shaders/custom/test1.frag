
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iGlobalTime;

void main() {
	vec2 st = gl_FragCoord.xy/iResolution;
	gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}
