# 📓 Changelog

All notable changes to **System Guardian** are documented in this file.

The format is based on [**Keep a Changelog**](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [**Semantic Versioning**](https://semver.org/spec/v2.0.0.html).

---

## 📐 Versioning Legend

| Symbol                    | Meaning                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `MAJOR`                   | Incompatible API changes                                        |
| `MINOR`                   | New features, backwards-compatible                              |
| `PATCH`                   | Backwards-compatible bug fixes                                  |
| `-alpha`, `-beta`, `-rc`  | Pre-release identifiers                                         |

### Change categories

- **Added** — new features
- **Changed** — changes in existing functionality
- **Deprecated** — soon-to-be-removed features
- **Removed** — now-removed features
- **Fixed** — bug fixes
- **Security** — security fixes & vulnerability patches

---

## [Unreleased]

### Added
- *(placeholder for upcoming features)*

### Changed
- *(placeholder for upcoming changes)*

### Fixed
- *(placeholder for upcoming fixes)*

---

## [1.0.0] — 2025-01-01

### 🎉 Initial Stable Release

The first public, production-ready release of **System Guardian** — a beautiful,
blazing-fast Windows health, repair & security suite built with Tauri 2 + Rust +
React + TypeScript.

### Added

#### 🩺 Health & Diagnostics
- **Live Health Score** — animated circular gauge that reflects overall system health in real time
- **Smart Diagnostics engine** that scans:
  - Memory pressure (RAM usage thresholds)
  - Disk space per volume (via `sysinfo::Disks`)
  - Temporary folder size (Windows `%TEMP%` + `C:\Windows\Temp`)
  - System uptime (long-uptime detection for pending reboots)
- **Severity-classified issues** — `low`, `medium`, `high`, `critical`
- **Fixable flag** on issues to indicate whether one-click repair can resolve them

#### ⚙️ Repair Center
- **One-click repair actions:**
  - `sfc /scannow` — System File Checker
  - `dism /Online /Cleanup-Image /RestoreHealth` — DISM component store repair
  - `chkdsk C: /scan` — Disk integrity scan
  - `cleanup_temp` — Safe temp folder cleanup with reclaimed-space report
  - `ipconfig /flushdns` — DNS resolver cache flush
- **Live execution results** with duration and full stdout/stderr output
- **UAC elevation prompts** for system-level actions
- **Command detail dialog** showing exactly what runs before approval

#### 🖥️ System Information
- **CPU** — brand, thread count, architecture
- **Memory** — used / total RAM & swap with animated progress bars
- **Operating System** — friendly name, version, kernel, hostname
- **Uptime** — formatted as `Xd Yh Zm`
- **Live refresh** every 3 seconds

#### 🚗 Driver Inspector
- **PnP device enumeration** via `Get-PnpDevice` PowerShell bridge
- **Status classification** — `ok`, `warning`, `error`, `unknown`
- **Vendor extraction** from device IDs
- **Refresh on demand**

#### 🔒 Security Audit
- **Windows Defender** — real-time protection status
- **Firewall** — active profile count
- **BitLocker** — system drive encryption status
- **Secure Boot** — UEFI enforcement state
- **Color-coded** results (`ok` / `warn` / `fail`)

#### 📊 Process Monitor
- **Live process list** updating every 2.5 seconds
- **Sortable** by CPU, memory, or name
- **Search / filter** by process name
- **Top 120 processes** by default
- **Color-coded CPU** (>30% highlighted)

#### 📝 Activity Log
- **Real-time event feed** with timestamps and severity levels
- **Levels:** `info`, `success`, `warn`, `error`
- **Clear all** action

#### 🎨 Design & UX
- **Frameless custom title bar** with drag region
- **Glassmorphic dark UI** — deep navy + cyan accents
- **Animated health gauge** with cubic-bezier easing
- **Fade-in page transitions**
- **Pulse-ring glow** on the health score
- **Shimmer** skeleton animation
- **Custom scrollbars**
- **Hover glow** on interactive cards
- **Inter + JetBrains Mono** typography
- **Lucide-react** icon set throughout

#### 🖥️ Platform
- **System tray integration** — show window / quit
- **Custom window controls** — minimize, maximize, close
- **Windows 8.1 / 10 / 11** (32-bit & 64-bit) support
- **Linux & macOS** — read-only diagnostics build

#### 🔐 Security
- **Strict Content Security Policy** enforced
- **Scoped Tauri capabilities** in `capabilities/default.json`
- **No shell injection surface** — whitelisted commands only
- **100% local** — zero telemetry, zero network calls
- **Read-only** diagnostics by default
- **Rust backend** — memory-safe by construction
- **Dependabot** configured for npm, Cargo, and GitHub Actions

#### 🛠️ Developer Experience
- **Full TypeScript** with strict mode
- **Typed IPC wrappers** in `src/lib/ipc.ts`
- **Shared interfaces** in `src/lib/types.ts`
- **Custom hooks** — `useSystemHealth`, `useActivityLog`
- **Reusable UI primitives** — Button, Card, Dialog, Progress, ScrollArea, Tooltip
- **Vite** for lightning-fast HMR
- **Tailwind CSS** with custom theme tokens & animations
- **shadcn/ui**-style component architecture

#### 📦 CI/CD & Open Source
- **GitHub Actions CI** — lint + build + `cargo check` on every PR
- **GitHub Actions Release** — auto-build `.msi` + `.exe` on version tags
- **Dependabot** for weekly dependency updates
- **Issue templates** — Bug report & Feature request
- **Pull Request template** with checklist
- **Full OSS scaffolding:**
  - `LICENSE` (MIT)
  - `README.md`
  - `SECURITY.md`
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `CHANGELOG.md`

### Technical Details

| Layer       | Technology                          | Version |
| ----------- | ----------------------------------- | ------- |
| Shell       | Tauri                               | 2.x     |
| Backend     | Rust                                | 1.77+   |
| Systems API | `sysinfo`                           | 0.32    |
| Windows API | `windows` crate                     | 0.58    |
| Frontend    | React + TypeScript                  | 18 / 5.5|
| Styling     | Tailwind CSS + shadcn/ui primitives | 3.4     |
| Icons       | lucide-react                        | 0.441   |
| Bundler     | Vite                                | 5.4     |

### Known Limitations
- **Storage panel** currently shows aggregate info; per-drive cards planned for `v1.1`.
- **Driver version / date** fields show `—` for now; WMI-based enumeration planned for `v1.1`.
- **Light theme** not yet available — dark-first design.
- **i18n** — English only in this release.

### Notes
- 🎨 The UI is designed **dark-first** for a premium, futuristic feel.
- 🧠 Diagnostics run **entirely on-device** — nothing is uploaded.
- ⚡ Installer size: **~6–10 MB**; idle RAM: **~40–60 MB**.

---

## 🗺️ Roadmap

Planned for future releases:

### v1.1.0 — *Storage & Drivers*
- Per-drive storage cards (free/total/used)
- SMART disk health monitoring
- Driver version & date via WMI
- Driver signature verification
- Export driver report (JSON / CSV)

### v1.2.0 — *Experience*
- 🌗 Light / dark theme toggle
- 🔔 Toast notifications on repair completion
- 📈 CPU / RAM history sparklines (Recharts)
- 🖼️ Wallpaper-based accent color theming
- 🌍 i18n framework + English & Hindi translations

### v1.3.0 — *Power Tools*
- 📦 Scheduled scans (Windows Task Scheduler integration)
- 📄 One-click system report export (PDF / HTML)
- 🧹 Startup app manager
- 🗑️ Uninstall leftover cleaner
- 📶 Network diagnostics (ping, traceroute, DNS lookup)

### v2.0.0 — *Pro*
- ☁️ Optional cloud backup of reports (opt-in)
- 📱 Mobile companion app for monitoring
- 🔌 Plugin system for custom checks
- 🏢 Enterprise mode with GPO support

---

## 🔗 Links

- **Repository:** https://github.com/PSOFREELANCE/System-Guardian
- **Issues:** https://github.com/PSOFREELANCE/System-Guardian/issues
- **Releases:** https://github.com/PSOFREELANCE/System-Guardian/releases
- **Discussions:** https://github.com/PSOFREELANCE/System-Guardian/discussions
- **Security Policy:** [SECURITY.md](SECURITY.md)
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code of Conduct:** [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## 📜 License

MIT © 2025 **Pardeep Singh** — [PSOFREELANCE](https://github.com/PSOFREELANCE)

See [LICENSE](LICENSE) for the full text.

---

<div align="center">

**Thanks for using System Guardian.** 🛡️

[⭐ Star the repo](https://github.com/PSOFREELANCE/System-Guardian) ·
[🐛 Report a bug](https://github.com/PSOFREELANCE/System-Guardian/issues/new/choose) ·
[💡 Suggest a feature](https://github.com/PSOFREELANCE/System-Guardian/issues/new/choose)

</div>