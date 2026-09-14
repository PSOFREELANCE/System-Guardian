use serde::Serialize;
use sysinfo::System;

#[derive(Serialize)]
pub struct SystemInfo {
    pub os_name: String,
    pub os_version: String,
    pub kernel: String,
    pub hostname: String,
    pub cpu_brand: String,
    pub cpu_cores: usize,
    pub total_memory: u64,
    pub used_memory: u64,
    pub total_swap: u64,
    pub used_swap: u64,
    pub uptime: u64,
    pub arch: String,
}

#[derive(Serialize)]
pub struct ProcessInfo {
    pub pid: u32,
    pub name: String,
    pub cpu_usage: f32,
    pub memory: u64,
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
    let mut sys = System::new_all();
    sys.refresh_all();
    let long_os = System::long_os_version().unwrap_or_else(|| "Unknown".into());
    let os_ver = System::os_version().unwrap_or_else(|| "Unknown".into());
    let kernel = System::kernel_version().unwrap_or_else(|| "Unknown".into());
    let hostname = System::host_name().unwrap_or_else(|| "Unknown".into());

    let cpu_brand = sys
        .cpus()
        .first()
        .map(|c| c.brand().to_string())
        .unwrap_or_else(|| "Unknown".into());

    SystemInfo {
        os_name: long_os,
        os_version: os_ver,
        kernel,
        hostname,
        cpu_brand,
        cpu_cores: sys.cpus().len(),
        total_memory: sys.total_memory(),
        used_memory: sys.used_memory(),
        total_swap: sys.total_swap(),
        used_swap: sys.used_swap(),
        uptime: System::uptime(),
        arch: std::env::consts::ARCH.to_string(),
    }
}

#[tauri::command]
pub fn get_processes(limit: usize) -> Vec<ProcessInfo> {
    let mut sys = System::new_all();
    sys.refresh_all();
    // Two refreshes required for accurate CPU deltas
    std::thread::sleep(sysinfo::MINIMUM_CPU_UPDATE_INTERVAL);
    sys.refresh_cpu_usage();

    let mut procs: Vec<ProcessInfo> = sys
        .processes()
        .iter()
        .map(|(pid, p)| ProcessInfo {
            pid: pid.as_u32(),
            name: p.name().to_string_lossy().to_string(),
            cpu_usage: p.cpu_usage(),
            memory: p.memory(),
        })
        .collect();

    procs.sort_by(|a, b| b.cpu_usage.partial_cmp(&a.cpu_usage).unwrap_or(std::cmp::Ordering::Equal));
    procs.truncate(limit);
    procs
}