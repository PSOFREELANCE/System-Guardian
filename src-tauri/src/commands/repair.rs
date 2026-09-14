use serde::Serialize;
use std::process::Command;
use std::time::Instant;

#[derive(Serialize)]
pub struct RepairResult {
    pub action: String,
    pub success: bool,
    pub output: String,
    pub duration_ms: u64,
}

fn run(cmd: &str, args: &[&str]) -> (bool, String) {
    match Command::new(cmd).args(args).output() {
        Ok(o) => {
            let mut s = String::from_utf8_lossy(&o.stdout).to_string();
            let e = String::from_utf8_lossy(&o.stderr);
            if !e.is_empty() { s.push_str(&format!("\n[stderr] {e}")); }
            (o.status.success(), s)
        }
        Err(e) => (false, format!("Failed to launch `{cmd}`: {e}")),
    }
}

#[tauri::command]
pub fn run_repair(action: String) -> RepairResult {
    let start = Instant::now();
    let (success, output) = match action.as_str() {
        "sfc"    => run("sfc", &["/scannow"]),
        "dism"   => run("dism", &["/Online", "/Cleanup-Image", "/RestoreHealth"]),
        "chkdsk" => run("chkdsk", &["C:", "/scan"]),
        _        => (false, format!("Unknown repair action: {action}")),
    };
    RepairResult {
        action,
        success,
        output,
        duration_ms: start.elapsed().as_millis() as u64,
    }
}

#[tauri::command]
pub fn cleanup_temp() -> RepairResult {
    let start = Instant::now();
    #[cfg(windows)]
    {
        let script = r#"
            $paths = @($env:TEMP, "$env:SystemRoot\Temp")
            $freed = 0
            foreach ($p in $paths) {
                if (Test-Path $p) {
                    Get-ChildItem -Path $p -Recurse -Force -ErrorAction SilentlyContinue |
                        ForEach-Object {
                            try { $freed += $_.Length; Remove-Item $_.FullName -Force -Recurse -ErrorAction SilentlyContinue } catch {}
                        }
                }
            }
            "Freed {0:N1} MB" -f ($freed / 1MB)
        "#;
        let (ok, out) = run("powershell", &["-NoProfile", "-NonInteractive", "-Command", script]);
        return RepairResult {
            action: "cleanup_temp".into(),
            success: ok,
            output: out,
            duration_ms: start.elapsed().as_millis() as u64,
        };
    }
    #[cfg(not(windows))]
    {
        RepairResult {
            action: "cleanup_temp".into(),
            success: false,
            output: "Not supported on this platform.".into(),
            duration_ms: start.elapsed().as_millis() as u64,
        }
    }
}

#[tauri::command]
pub fn flush_dns() -> RepairResult {
    let start = Instant::now();
    #[cfg(windows)]
    let (success, output) = run("ipconfig", &["/flushdns"]);
    #[cfg(not(windows))]
    let (success, output) = (false, "Not supported on this platform.".to_string());

    RepairResult {
        action: "flush_dns".into(),
        success,
        output,
        duration_ms: start.elapsed().as_millis() as u64,
    }
}