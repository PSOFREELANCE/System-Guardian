# 🔐 Security Policy

System Guardian is a system-level utility that inspects hardware, drivers,
processes, and security settings on your machine. Because it operates close to
the operating system, we take security **very seriously**.

---

### Our commitment

| Stage                     | Target time          |
| ------------------------- | -------------------- |
| Initial acknowledgement   | within **72 hours**  |
| Triage & severity rating  | within **5 days**    |
| Fix for critical issues   | within **7 days**    |
| Fix for high/medium       | within **30 days**   |
| Public disclosure         | coordinated with you |

We will credit you in the release notes and `CHANGELOG.md` unless you prefer
to stay anonymous.

---

## 🛡️ Security Design of System Guardian

System Guardian is built on **Tauri 2** with a **Rust** backend and a
sandboxed **WebView2** frontend. Key security properties:

### 1. Strict Content Security Policy (CSP)
Defined in `src-tauri/tauri.conf.json`:


# 🔐 Security Policy

**System Guardian** takes security seriously. This document explains which
versions are supported, how to report vulnerabilities responsibly, and how
the application is designed to be safe by default.

---

## 📌 Supported Versions

We actively maintain and ship security patches for the following versions:

| Version | Supported          | Notes                                  |
| ------- | ------------------ | -------------------------------------- |
| 1.x     | ✅ Yes             | Current stable release — fully patched |
| 0.x     | ❌ No              | Pre-release / beta — please upgrade    |
| < 0.9   | ❌ No              | Unsupported legacy builds              |

> **Recommendation:** Always run the latest release from the
> [Releases page](https://github.com/PSOFREELANCE/System-Guardian/releases).

---

## 🚨 Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Instead, report privately via one of the following channels:

| Channel          | Details                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| 📧 **Email**     | **psofreelance2019@gmail.com**                                          |
| 🔒 **GitHub**    | [Private Security Advisory](https://github.com/PSOFREELANCE/System-Guardian/security/advisories/new) |

### What to include in your report

To help us triage quickly, please provide:

1. **Summary** — A concise description of the vulnerability.
2. **Affected version(s)** — e.g. `1.0.0`, commit SHA if possible.
3. **Environment** — OS build, architecture (x86 / x64 / ARM64), WebView2 version.
4. **Reproduction steps** — Numbered steps to reproduce reliably.
5. **Proof of concept** — Screenshots, logs, crash dumps, or minimal PoC code.
6. **Impact assessment** — What an attacker could achieve (RCE, privilege escalation, data leak, DoS, etc.).
7. **Suggested fix** — *Optional*, but very welcome.

### Example report template

Subject: [SECURITY] <short title>

Affected version: 1.0.0
OS: Windows 11 23H2 (x64)
Category: <RCE / LPE / DoS / Info Disclosure / etc.>

Summary:
<2–3 sentences>

Steps to reproduce:

...

...

...

Impact:
<what happens, why it matters>

Suggested fix (optional):
<your idea>


---

## ⏱️ Response Timeline

We are a small volunteer-run project but commit to the following SLAs:

| Stage                          | Target Time       |
| ------------------------------ | ----------------- |
| Initial acknowledgement        | **≤ 72 hours**    |
| Triage & severity assessment   | **≤ 7 days**      |
| Patch for Critical / High      | **≤ 14 days**     |
| Patch for Medium / Low         | **≤ 30 days**     |
| Public disclosure (coordinated)| After patch ships |

If a fix takes longer than expected, we will keep you updated and, with your
consent, credit you in the release notes.

---

## 🏆 Recognition

We gratefully credit responsible disclosers in:

- The **release notes** for the patched version
- The **Hall of Fame** section below
- Optionally, your name/handle in `CHANGELOG.md`

### Hall of Fame

> *No vulnerabilities have been reported yet. Be the first!* 🛡️

---

## 🧱 Security Design of System Guardian

System Guardian is architected from the ground up to be safe:

### 1. **Local-only by design**
- No telemetry, no analytics, no phoning home.
- No data leaves your machine. Ever.
- The app runs 100% offline after installation.

### 2. **Strict Tauri capability scoping**
- All IPC commands are explicitly whitelisted in
  [`src-tauri/capabilities/default.json`](src-tauri/capabilities/default.json).
- The frontend **cannot** call arbitrary Rust functions or OS APIs.

### 3. **Content Security Policy (CSP)**
- Enforced in [`src-tauri/tauri.conf.json`](src-tauri/tauri.conf.json).
- Blocks inline scripts, external scripts, and XSS vectors.
- Only self-hosted assets + Google Fonts are allowed.

### 4. **No shell injection surface**
- Repairs use **hard-coded, whitelisted commands only** (`sfc`, `dism`,
  `chkdsk`, `ipconfig /flushdns`, PowerShell scripts defined in Rust).
- User input is **never** interpolated into shell commands.
- All process spawning uses `std::process::Command` with argument arrays
  — never a shell string.

### 5. **Elevated actions are transparent**
- System-level repairs trigger Windows UAC prompts.
- Users see exactly which command runs before approving.
- Full command output is shown in the **Repair Center** panel.

### 6. **Read-only diagnostics**
- Health checks, driver enumeration and security audits are **read-only**.
- They never modify system state without explicit user action.

### 7. **Memory-safe backend**
- Written in **Rust** — eliminates entire classes of memory-safety bugs
  (buffer overflows, use-after-free, double-free) at compile time.
- `panic = "abort"` and `strip = true` in release profile reduce the attack surface.

### 8. **Dependency hygiene**
- Automated **Dependabot** updates for npm, Cargo and GitHub Actions.
- `cargo audit` and `npm audit` run on every CI build.
- Minimal dependency footprint by design.

### 9. **Reproducible, signed builds**
- Release binaries are built on **GitHub Actions** (public workflow).
- Windows installers (`.msi` / `.exe`) can be signed with an EV certificate.
- SHA-256 checksums published with every release.

### 10. **Least privilege**
- The app requests **no** capabilities it does not need.
- Unsigned elevation is avoided; system tools handle their own UAC flow.

---

## 🛡️ Hardening Recommendations for Users

For maximum safety when using System Guardian:

1. **Download only from the official source:**
   👉 https://github.com/PSOFREELANCE/System-Guardian/releases

2. **Verify the SHA-256 checksum** of the installer before running it.

3. **Keep Windows and WebView2 up to date** — both receive security fixes.

4. **Run as a standard user** — System Guardian will prompt for elevation only
   when needed (SFC, DISM, CHKDSK).

5. **Review the Activity Log** regularly to see every action the app performed.

6. **Do not run the app under a modified/injected environment**
   (e.g. untrusted DLL injectors, debuggers) unless you're developing.

---

## 📚 References

- [Tauri Security Best Practices](https://tauri.app/v2/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Microsoft Security Response Center](https://www.microsoft.com/msrc)

---

## 📬 Contact

- **Maintainer:** Pardeep Singh
- **GitHub:** [@PSOFREELANCE](https://github.com/PSOFREELANCE)
- **Email:** psofreelance2019@gmail.com
- **PGP:** *(available on request)*

---

**Thank you for helping keep System Guardian and its users safe.** 🛡️