use serde::Serialize;
use std::fs;
use sysinfo::{Disks, System};
use chrono::Utc;

#[derive(Serialize)]
pub struct HealthIssue {
    pub id: String,
    pub title: String,
    pub description: String,
    pub severity: String,     // low | medium | high | critical
    pub category: String,
    pub fixable: bool,
}

#[derive(Serialize)]
pub struct HealthReport {
    pub score: i32,
    pub issues: Vec<HealthIssue>,
    pub timestamp: f64,
}

#[tauri::command]
pub fn run_health_check() -> HealthReport {
    let mut issues = Vec::new();
    let mut score: i32 = 100;

    // 1. Memory pressure
    let mut sys = System::new_all();
    sys.refresh_all();
    let mem_pct = if sys.total_memory() > 0 {
        (sys.used_memory() as f64 / sys.total_memory() as f64) * 100.0
    } else { 0.0 };

    if mem_pct > 90.0 {
        score -= 20;
        issues.push(HealthIssue {
            id: "mem_high".into(),
            title: "High memory usage".into(),
            description: format!("RAM usage is {:.0}% — close unused applications.", mem_pct),
            severity: "high".into(),
            category: "Performance".into(),
            fixable: false,
        });
    } else if mem_pct > 75.0 {
        score -= 8;
        issues.push(HealthIssue {
            id: "mem_med".into(),
            title: "Elevated memory usage".into(),
            description: format!("RAM usage is {:.0}%.", mem_pct),
            severity: "medium".into(),
            category: "Performance".into(),
            fixable: false,
        });
    }

    // 2. Disk space
    let disks = Disks::new_with_refreshed_list();
    for d in disks.list() {
        let total = d.total_space();
        let avail = d.available_space();
        if total == 0 { continue; }
        let used_pct = ((total - avail) as f64 / total as f64) * 100.0;
        if used_pct > 92.0 {
            score -= 15;
            issues.push(HealthIssue {
                id: format!("disk_{}", d.mount_point().to_string_lossy()),
                title: format!("Low disk space on {}", d.mount_point().to_string_lossy()),
                description: format!("{:.0}% used, only {:.1} GB free.", used_pct, avail as f64 / 1e9),
                severity: "high".into(),
                category: "Storage".into(),
                fixable: true,
            });
        }
    }

    // 3. Temp folder size (Windows)
    #[cfg(windows)]
    {
        let temp = std::env::var("TEMP").unwrap_or_else(|_| "C:\\Windows\\Temp".into());
        if let Ok(size) = dir_size(&temp) {
            if size > 2 * 1024 * 1024 * 1024 {
                score -= 10;
                issues.push(HealthIssue {
                    id: "temp_large".into(),
                    title: "Large temp folder".into(),
                    description: format!("Temp files exceed {:.1} GB. Cleanup recommended.", size as f64 / 1e9),
                    severity: "medium".into(),
                    category: "Storage".into(),
                    fixable: true,
                });
            }
        }
    }

    // 4. Uptime — very long uptimes hint at pending reboots
    let uptime_days = System::uptime() / 86_400;
    if uptime_days > 14 {
        score -= 5;
        issues.push(HealthIssue {
            id: "uptime_long".into(),
            title: "Long uptime".into(),
            description: format!("System has been up {} days. A reboot may help performance.", uptime_days),
            severity: "low".into(),
            category: "Maintenance".into(),
            fixable: false,
        });
    }

    score = score.clamp(0, 100);
    HealthReport {
        score,
        issues,
        timestamp: Utc::now().timestamp() as f64,
    }
}

fn dir_size(path: &str) -> std::io::Result<u64> {
    let mut total = 0u64;
    if let Ok(entries) = fs::read_dir(path) {
        for entry in entries.flatten() {
            if let Ok(meta) = entry.metadata() {
                if meta.is_file() { total += meta.len(); }
                else if meta.is_dir() {
                    if let Some(p) = entry.path().to_str() {
                        total += dir_size(p).unwrap_or(0);
                    }
                }
            }
        }
    }
    Ok(total)
}