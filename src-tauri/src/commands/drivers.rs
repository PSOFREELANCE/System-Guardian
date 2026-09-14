use serde::Serialize;

#[derive(Serialize)]
pub struct DriverInfo {
    pub name: String,
    pub version: String,
    pub date: String,
    pub vendor: String,
    pub status: String, // ok | warning | error | unknown
    pub device_id: String,
}

/// Enumerates PnP devices via PowerShell's Get-PnpDevice.
/// Kept lightweight (no WMI crate dependency) and cross-safe.
#[tauri::command]
pub fn list_drivers() -> Vec<DriverInfo> {
    #[cfg(windows)]
    {
        let script = r#"
            Get-PnpDevice -Status OK,Error,Unknown -PresentOnly |
            Where-Object { $_.InstanceId -notlike 'ROOT\\*' } |
            Select-Object -First 80 FriendlyName,InstanceId,Status |
            ForEach-Object {
                [PSCustomObject]@{
                    name = if ($_.FriendlyName) { $_.FriendlyName } else { $_.InstanceId }
                    device_id = $_.InstanceId
                    status = $_.Status
                }
            } | ConvertTo-Json -Compress
        "#;

        let output = std::process::Command::new("powershell")
            .args(["-NoProfile", "-NonInteractive", "-Command", script])
            .output();

        if let Ok(out) = output {
            let text = String::from_utf8_lossy(&out.stdout).to_string();
            return parse_pnp(&text);
        }
    }
    Vec::new()
}

#[cfg(windows)]
fn parse_pnp(json: &str) -> Vec<DriverInfo> {
    use serde_json::Value;
    let val: Value = serde_json::from_str(json).unwrap_or(Value::Null);
    let arr = match val {
        Value::Array(a) => a,
        Value::Object(_) => vec![val.clone()],
        _ => vec![],
    };
    arr.into_iter().filter_map(|v| {
        let name = v.get("name")?.as_str()?.to_string();
        let device_id = v.get("device_id")?.as_str().unwrap_or("").to_string();
        let status_raw = v.get("status")?.as_str().unwrap_or("Unknown");
        let status = match status_raw {
            "OK" => "ok",
            "Error" => "error",
            "Unknown" => "unknown",
            _ => "warning",
        }.to_string();
        let vendor = device_id.split('\\').nth(1).unwrap_or("Unknown").to_string();
        Some(DriverInfo {
            name,
            version: "—".into(),
            date: "—".into(),
            vendor,
            status,
            device_id,
        })
    }).collect()
}