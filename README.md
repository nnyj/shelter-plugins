# shelter-plugins

## stereo-fix

Forces stereo Opus decoding in Discord voice channels. Fixes mono audio from music bots in Legcord and other Electron-based Discord clients.

Chromium defaults Opus to mono decoding unless `stereo=1` appears in the SDP fmtp line. This plugin patches `RTCPeerConnection.setLocalDescription` to inject the parameter.

Install URL:
```
https://nnyj.github.io/shelter-plugins/stereo-fix
```
