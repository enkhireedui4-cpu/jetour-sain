# Гадаад (hot-link) зургуудыг public/ext/ рүү татаж авах скрипт.
# Интернэттэй компьютер дээр PowerShell-ээс ажиллуулна:
#   powershell -ExecutionPolicy Bypass -File scripts\download-external-images.ps1
#
# Дараа нь src/lib/jetour-data.ts дахь URL-уудыг /ext/<файлын нэр> болгож солино
# (Claude-д "гадаад зургуудыг локал болго" гэж хэлэхэд хангалттай).

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$listFile = Join-Path $PSScriptRoot "external-images.txt"
$outDir = Join-Path $root "public\ext"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$urls = Get-Content $listFile | Where-Object { $_ -match "^https://" }
$ok = 0; $fail = 0
foreach ($u in $urls) {
    $name = Split-Path $u -Leaf
    $dest = Join-Path $outDir $name
    if (Test-Path $dest) { Write-Host "SKIP (байна): $name"; $ok++; continue }
    try {
        Invoke-WebRequest -Uri $u -OutFile $dest -UseBasicParsing -TimeoutSec 60
        Write-Host "OK:   $name"
        $ok++
    } catch {
        Write-Host "FAIL: $u — $($_.Exception.Message)" -ForegroundColor Red
        $fail++
    }
}
Write-Host ""
Write-Host "Дууслаа: $ok амжилттай, $fail алдаатай. Хавтас: $outDir"
