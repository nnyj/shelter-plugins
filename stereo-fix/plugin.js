(function(exports) {

"use strict";

//#region plugins/stereo-fix/index.jsx
const { util: { log } } = shelter;
let cleanup = null;
function patchOpusStereo(sdp) {
	const opusMatch = sdp.match(/a=rtpmap:(\d+) opus\/48000\/2/);
	if (!opusMatch) return sdp;
	const pt = opusMatch[1];
	const fmtpRe = new RegExp(`a=fmtp:${pt} ([^\r\n]+)`, "g");
	return sdp.replace(fmtpRe, (m, params) => {
		if (params.includes("stereo=")) return m;
		log(`Stereo fix: patched fmtp for payload type ${pt}`);
		return `a=fmtp:${pt} ${params};stereo=1;sprop-stereo=1`;
	});
}
function onLoad() {
	const origSetLocal = RTCPeerConnection.prototype.setLocalDescription;
	RTCPeerConnection.prototype.setLocalDescription = function(desc) {
		if (desc?.sdp && typeof desc.sdp === "string") desc = new RTCSessionDescription({
			type: desc.type,
			sdp: patchOpusStereo(desc.sdp)
		});
		return origSetLocal.call(this, desc);
	};
	cleanup = () => {
		RTCPeerConnection.prototype.setLocalDescription = origSetLocal;
	};
	log("Stereo fix: loaded");
}
function onUnload() {
	cleanup?.();
	log("Stereo fix: unloaded");
}

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
return exports;
})({});