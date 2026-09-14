export interface SystemInfo {
  os_name: string;
  os_version: string;
  kernel: string;
  hostname: string;
  cpu_brand: string;
  cpu_cores: number;
  total_memory: number;
  used_memory: number;
  total_swap: number;
  used_swap: number;
  uptime: number;
  arch: string;
}

export interface ProcessInfo {
  pid: number;
  name: string;
  cpu_usage: number;
  memory: number;
}

export interface HealthReport {
  score: number;
  issues: HealthIssue[];
  timestamp: number;
}

export interface HealthIssue {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  fixable: boolean;
}

export interface DriverInfo {
  name: string;
  version: string;
  date: string;
  vendor: string;
  status: "ok" | "warning" | "error" | "unknown";
  device_id: string;
}

export interface RepairResult {
  action: string;
  success: boolean;
  output: string;
  duration_ms: number;
}

export interface SecurityItem {
  name: string;
  status: "ok" | "warn" | "fail";
  detail: string;
}

export interface ActivityEvent {
  id: string;
  time: number;
  level: "info" | "success" | "warn" | "error";
  message: string;
}