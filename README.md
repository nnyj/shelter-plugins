# shelter-plugins

<div align="center">

[![Stars](https://img.shields.io/github/stars/nnyj/shelter-plugins?style=for-the-badge&labelColor=555&color=e3b341)](https://github.com/nnyj/shelter-plugins/stargazers)
[![Build](https://img.shields.io/github/actions/workflow/status/nnyj/shelter-plugins/deploy.yml?style=for-the-badge&labelColor=555)](https://github.com/nnyj/shelter-plugins/actions)

</div>

[Shelter](https://github.com/uwu/shelter) plugins for Discord clients, built with [Lune](https://github.com/uwu/shelter/tree/main/packages/lune) and served via GitHub Pages.

## Plugins

### stereo-fix

Forces stereo Opus decoding in Discord voice channels. Fixes mono audio from music bots in Legcord and other Electron-based Discord clients.

Install URL: `https://nnyj.github.io/shelter-plugins/stereo-fix`

In Shelter, open Settings > Shelter > Plugins > Add Plugin and paste the URL above.

## How it works

Chromium defaults Opus to mono decoding unless `stereo=1` appears in the SDP fmtp line. stereo-fix patches `RTCPeerConnection.prototype.setLocalDescription` to inject `stereo=1;sprop-stereo=1` into every matching fmtp line before the description is applied.

## Build

```sh
pnpm install
pnpm lune ci
# outputs to dist/
```

CI deploys `dist/` to GitHub Pages on every push to `main`.

## License

[GPL-3.0](LICENSE)
