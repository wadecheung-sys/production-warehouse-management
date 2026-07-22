# Push current branch + optional Pages dist to Gitee (token from local .secrets only).
# Usage:
#   powershell -File scripts/push-gitee.ps1
#   powershell -File scripts/push-gitee.ps1 -Pages

param(
  [switch]$Pages
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$tokenFile = Join-Path $root '.secrets\gitee_token'
if (-not (Test-Path $tokenFile)) {
  Write-Error "Missing $tokenFile — create a Gitee private token and save it there (gitignored)."
}

$token = (Get-Content $tokenFile -Raw).Trim()
$authRemote = "https://zhangfa-wang:${token}@gitee.com/zhangfa-wang/pwms-demo.git"

function Mask-Output {
  process { $_ -replace [regex]::Escape($token), '***' }
}

Push-Location $root
try {
  git push $authRemote main:main 2>&1 | Mask-Output
  if ($Pages) {
    $web = Join-Path $root 'web'
    Push-Location $web
    try {
      $env:VITE_BASE_PATH = '/pwms-demo/'
      $env:VITE_USE_ALL_ELEMENT_PLUS_STYLE = 'true'
      npm run build:pro
    } finally {
      Pop-Location
    }

    $dist = Join-Path $web 'dist'
    if (-not (Test-Path (Join-Path $dist 'index.html'))) {
      Write-Error 'Build failed: web/dist/index.html missing'
    }

    # empty marker for SPA-friendly hosting on some Gitee setups
    New-Item -ItemType File -Force -Path (Join-Path $dist '.spa') | Out-Null

    $tmp = Join-Path $env:TEMP ("pwms-gitee-pages-" + [guid]::NewGuid().ToString('n'))
    New-Item -ItemType Directory -Force -Path $tmp | Out-Null
    try {
      Copy-Item -Path (Join-Path $dist '*') -Destination $tmp -Recurse -Force
      # include dotfiles like .spa
      Get-ChildItem -Path $dist -Force | Where-Object { $_.Name -like '.*' } | ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $tmp $_.Name) -Force
      }
      Push-Location $tmp
      try {
        git init -q
        git checkout -b gh-pages
        git add -A
        $env:GIT_AUTHOR_NAME = 'wadecheung-sys'
        $env:GIT_AUTHOR_EMAIL = 'wadecheung-sys@users.noreply.github.com'
        $env:GIT_COMMITTER_NAME = $env:GIT_AUTHOR_NAME
        $env:GIT_COMMITTER_EMAIL = $env:GIT_AUTHOR_EMAIL
        git commit -m 'deploy: Gitee Pages' | Out-Null
        git push --force $authRemote gh-pages:gh-pages 2>&1 | Mask-Output
      } finally {
        Pop-Location
      }
    } finally {
      Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
    }
  }
  Write-Host 'Gitee push done.'
} finally {
  Pop-Location
  $token = $null
  $authRemote = $null
}
