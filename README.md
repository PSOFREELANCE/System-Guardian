<div align="center">
  <img src="docs/social-preview-System-Guardian.png" alt="System Guardian" width="800"/>
</div>

<div align="center">


<div align="center">

# 🛡️ System Guardian

**A beautiful, blazing-fast Windows health, repair & security suite.**

**Only 2 MB · 100% local · MIT licensed**
Built with **Tauri 2 · Rust · React · TypeScript · Tailwind**

[![Download](https://img.shields.io/badge/Download-v1.0.0-22d3ee?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/PSOFREELANCE/System-Guardian/releases/latest)
[![CI](https://github.com/PSOFREELANCE/System-Guardian/actions/workflows/ci.yml/badge.svg)](https://github.com/PSOFREELANCE/System-Guardian/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%208.1%20%7C%2010%20%7C%2011-blue)]()

</div>

## 📸 Screenshots

<div align="center">

### Dashboard
<img src="docs/screenshots/dashboard.png" alt="Dashboard" width="800"/>

### Process Monitor
<img src="docs/screenshots/processes.png" alt="Process Monitor" width="800"/>

### Repair Center
<img src="docs/screenshots/repair.png" alt="Repair Center" width="800"/>

### System Audit
<img src="docs/screenshots/system.png" alt="System Audit" width="800"/>

### Drivers Center
<img src="docs/screenshots/drivers.png" alt="Drivers Center" width="800"/>

### Activity
<img src="docs/screenshots/activity.png" alt="Drivers Center" width="800"/>

</div>

## ✨ Features

- 🩺 **Live Health Score** — animated gauge showing system health at a glance
- 🧠 **Smart Diagnostics** — memory, disk, temp files, uptime, security checks
- ⚙️ **One-Click Repairs** — SFC, DISM, CHKDSK, temp cleanup, DNS flush
- 🚗 **Driver Inspector** — enumerate PnP devices & flag problem devices
- 🔒 **Security Audit** — Defender, Firewall, BitLocker, Secure Boot
- 📊 **Live Process Monitor** — top CPU/memory consumers
- 📝 **Activity Log** — real-time event stream
- 🌙 **Glassmorphic dark UI** — modern, minimal, gorgeous

## 🖥️ Supported Platforms

- Windows 8.1 / 10 / 11 (32-bit & 64-bit) and newer
- Linux & macOS (read-only diagnostics)

## 🚀 Getting Started

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [Rust (stable)](https://rustup.rs/)
- Windows: [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)

### Install & run
```bash
git clone https://github.com/PSOFREELANCE/System-Guardian.git
cd System-Guardian
npm install
npm run tauri:dev