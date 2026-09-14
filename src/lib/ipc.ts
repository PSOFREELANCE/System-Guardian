import { invoke } from "@tauri-apps/api/core";
import type {
  SystemInfo, ProcessInfo, HealthReport, DriverInfo,
  RepairResult, SecurityItem,
} from "./types";

/** Safe invoke wrapper — falls back to mock data when running in browser (dev preview). */
const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

async function call<T>(cmd: string, args?: Record<string, unknown>, fallback?: T): Promise<T> {
  if (!isTauri) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Tauri not available (cmd: ${cmd})`);
  }
  return invoke<T>(cmd, args);
}

export const api = {
  systemInfo: () => call<SystemInfo>("get_system_info", {}, {
    os_name: "Windows 11 Pro", os_version: "23H2 (22631.4169)", kernel: "10.0.22631",
    hostname: "DESKTOP-GUARDIAN", cpu_brand: "AMD Ryzen 7 5800X 8-Core Processor",
    cpu_cores: 16, total_memory: 34359738368, used_memory: 12884901888,
    total_swap: 4294967296, used_swap: 1073741824, uptime: 184320, arch: "x86_64",
  }),

  processes: (limit = 60) => call<ProcessInfo[]>("get_processes", { limit }, [
    { pid: 4, name: "System", cpu_usage: 0.3, memory: 144 * 1024 },
    { pid: 892, name: "chrome.exe", cpu_usage: 12.4, memory: 1_240 * 1024 * 1024 },
    { pid: 1204, name: "Code.exe", cpu_usage: 4.1, memory: 620 * 1024 * 1024 },
  ]),

  healthReport: () => call<HealthReport>("run_health_check", {}, {
    score: 82,
    issues: [
      { id: "temp", title: "Temp files exceed 2 GB", description: "Cleanup recommended to free disk space and improve performance.", severity: "medium", category: "Storage", fixable: true },
      { id: "startup", title: "12 startup programs detected", description: "Reducing startup apps can improve boot time.", severity: "low", category: "Performance", fixable: true },
    ],
    timestamp: Date.now() / 1000,
  }),

  drivers: () => call<DriverInfo[]>("list_drivers", {}, [
    { name: "NVIDIA GeForce RTX 3070", version: "31.0.15.4633", date: "2024-08-12", vendor: "NVIDIA", status: "ok", device_id: "PCI\\VEN_10DE" },
    { name: "Realtek Audio", version: "6.0.9239.1", date: "2023-11-02", vendor: "Realtek", status: "warning", device_id: "HDAUDIO\\FUNC_01" },
  ]),

  securityAudit: () => call<SecurityItem[]>("security_audit", {}, [
    { name: "Windows Defender", status: "ok", detail: "Real-time protection enabled" },
    { name: "Firewall", status: "ok", detail: "All profiles active" },
    { name: "BitLocker", status: "warn", detail: "System drive not encrypted" },
    { name: "Secure Boot", status: "ok", detail: "Enabled" },
  ]),

  runRepair: (action: string) =>
    call<RepairResult>("run_repair", { action }, {
      action, success: true, output: `[preview] ${action} completed successfully`, duration_ms: 1420,
    }),

  cleanupTemp: () => call<RepairResult>("cleanup_temp", {}, {
    action: "cleanup_temp", success: true, output: "Freed 2.4 GB", duration_ms: 980,
  }),

  flushDns: () => call<RepairResult>("flush_dns", {}, {
    action: "flush_dns", success: true, output: "DNS cache flushed", duration_ms: 320,
  }),
};