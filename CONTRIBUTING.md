# 🤝 Contributing to System Guardian

First off — **thank you** for taking the time to contribute! 🎉

Whether you're fixing a typo, reporting a bug, translating the UI, or
implementing a brand-new feature, you're helping make System Guardian better
for everyone.

This document is the **single source of truth** for how to contribute.

---

## 📖 Table of Contents

1.  [Code of Conduct](#-code-of-conduct)
2.  [Ways to Contribute](#-ways-to-contribute)
3.  [Development Setup](#-development-setup)
4.  [Project Structure](#-project-structure)
5.  [Branching Model](#-branching-model)
6.  [Commit Convention](#-commit-convention)
7.  [Coding Standards](#-coding-standards)
8.  [Testing](#-testing)
9.  [Pull Request Process](#-pull-request-process)
10. [Reporting Bugs](#-reporting-bugs)
11. [Suggesting Features](#-suggesting-features)
12. [Style Guides](#-style-guides)
13. [Community](#-community)

---

## 📜 Code of Conduct

By participating in this project, you agree to abide by our
[Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## 💡 Ways to Contribute

You don't have to write code to help!

| Type                     | How                                                                     |
| ------------------------ | ----------------------------------------------------------------------  |
| 🐛 **Report bugs**       | Open a [Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml)             |
| ✨ **Suggest features**  | Open a [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml)   |
| 📝 **Improve docs**      | Fix typos, clarify instructions, add examples                          |
| 🌍 **Translate**         | Add i18n support for a new language                                    |
| 🎨 **Design**            | Submit UI mockups, icons, or branding assets                           |
| 🧪 **Write tests**       | Improve coverage of Rust or TypeScript code                            |
| 🔒 **Security**          | Report vulnerabilities privately (see [SECURITY.md](SECURITY.md))      |
| ⭐ **Star the repo**     | It genuinely helps visibility!                                         |

---

## 🛠️ Development Setup

### Prerequisites

| Tool                                                                  | Version   | Purpose                     |
| --------------------------------------------------------------------- | --------- | --------------------------- |
| [Node.js](https://nodejs.org/)                                        | 20+ (LTS) | Frontend build              |
| [Rust](https://rustup.rs/)                                            | stable    | Backend build               |
| [Git](https://git-scm.com/)                                           | 2.40+     | Version control             |
| [VS Code](https://code.visualstudio.com/)                             | latest    | Recommended editor          |
| [WebView2](https://developer.microsoft.com/microsoft-edge/webview2/)  | latest    | Tauri runtime (Windows)     |

### Windows prerequisites

- **Microsoft C++ Build Tools** — install "Desktop development with C++".
- **WebView2 Runtime** — pre-installed on Windows 10/11; on 8.1 install manually.

### Linux / macOS (diagnostics-only builds)

- Linux: `libwebkit2gtk-4.1-dev`, `libssl-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`
- macOS: Xcode Command Line Tools

### Clone & install

```bash
git clone https://github.com/PSOFREELANCE/System-Guardian.git
cd System-Guardian
npm install
npm run tauri:dev
npm run tauri:build

---

System-Guardian/
├── src/                  # React + TypeScript frontend
│   ├── components/       # UI components (Dashboard, RepairPanel, …)
│   ├── hooks/            # Custom React hooks
│   └── lib/              # IPC wrappers, types, utilities
├── src-tauri/            # Rust backend
│   ├── src/commands/     # Tauri command handlers
│   ├── capabilities/     # Permission scopes
│   └── tauri.conf.json   # App configuration
├── .github/              # CI, workflows, issue templates
└── docs/                 # (coming soon) architecture & guides

Branch	Purpose
main	Production-ready. Always deployable.
develop	Integration branch for the next release.
feat/*	New features (e.g. feat/driver-signature-check).
fix/*	Bug fixes (e.g. fix/gauge-animation-jitter).
docs/*	Documentation-only changes.
chore/*	Build, CI, tooling, dependency bumps.
hotfix/*	Urgent fixes branched from main.

git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name

🙏 Thank You
Every contribution — big or small — is appreciated. Open-source thrives because
of people like you. ❤️

Happy coding! 🚀