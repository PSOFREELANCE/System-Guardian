use serde::Serialize;

#[derive(Serialize)]
pub struct SecurityItem {
    pub name: String,
    pub status: String, // ok | warn | fail
    pub detail: String,
}

#[tauri::command]
pub fn security_audit() -> Vec<SecurityItem> {
    #[cfg(windows)]
    {
        let script = r#"
            $defender = (Get-MpComputerStatus -ErrorAction SilentlyContinue)
            $fw = (Get-NetFirewallProfile -ErrorAction SilentlyContinue | Where-Object Enabled -eq $true).Count
            [PSCustomObject]@{
                defender_realtime = if ($defender) { $defender.RealTimeProtectionEnabled } else { $null }
                defender_updated  = if ($defender) { $defender.AntivirusSignatureLastUpdated } else { $null }
                firewall_profiles = $fw
                bitlocker = (Get-BitLockerVolume -MountPoint $env:SystemDrive -ErrorAction SilentlyContinue).ProtectionStatus
                secureboot = try { Confirm-SecureBootUEFI -ErrorAction Stop } catch { $null }
            } | ConvertTo-Json -Compress
        "#;
        let out = std::process::Command::new("powershell")
            .args(["-NoProfile", "-NonInteractive", "-Command", script])
            .output();

        if let Ok(o) = out {
            let text = String::from_utf8_lossy(&o.stdout).to_string();
            if let Ok(v) = serde_json::from_str::<serde_json::Value>(&text) {
                return build_items(&v);
            }
        }
    }
    default_items()
}

fn build_items(v: &serde_json::Value) -> Vec<SecurityItem> {
    let get_bool = |k: &str| v.get(k).and_then(|x| x.as_bool());
    let mut items = Vec::new();

    let rt = get_bool("defender_realtime");
    items.push(SecurityItem {
        name: "Windows Defender".into(),
        status: if rt == Some(true) { "ok" } else if rt == Some(false) { "fail" } else { "warn" }.into(),
        detail: if rt == Some(true) { "Real-time protection enabled".into() } else { "Real-time protection may be off".into() },
    });

    let fw = v.get("firewall_profiles").and_then(|x| x.as_i64()).unwrap_or(0);
    items.push(SecurityItem {
        name: "Firewall".into(),
        status: if fw >= 3 { "ok" } else if fw > 0 { "warn" } else { "fail" }.into(),
        detail: format!("{fw} profile(s) active"),
    });

    let bl = v.get("bitlocker").and_then(|x| x.as_str());
    items.push(SecurityItem {
        name: "BitLocker".into(),
        status: if bl == Some("On") || bl == Some("1") { "ok" } else { "warn" }.into(),
        detail: format!("Protection: {}", bl.unwrap_or("Unknown")),
    });

    let sb = get_bool("secureboot");
    items.push(SecurityItem {
        name: "Secure Boot".into(),
        status: if sb == Some(true) { "ok" } else { "warn" }.into(),
        detail: if sb == Some(true) { "Enabled".into() } else { "Disabled or unsupported".into() },
    });

    items
}

fn default_items() -> Vec<SecurityItem> {
    vec![
        SecurityItem { name: "Windows Defender".into(), status: "warn".into(), detail: "Unable to query Defender".into() },
        SecurityItem { name: "Firewall".into(), status: "warn".into(), detail: "Unable to query firewall".into() },
    ]
}