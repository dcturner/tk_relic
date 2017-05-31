void main() {
	vec2 st = gl_FragCoord.xy/iResolution;
	vec2 prop = st/(iMouse*2.0);
	gl_FragColor = vec4(prop	,0.0,1.0);
}
