# Generate frontend/data/3d-gallery.json by scanning frontend/images/3d and frontend/videos
# Place your images (jpg/png) into frontend/images/3d and videos (mp4/webm) into frontend/videos
# Run this from the repository root in PowerShell

$imagesDir = "frontend/images/3d"
$videosDir = "frontend/videos"
$outFile = "frontend/data/3d-gallery.json"

New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null
New-Item -ItemType Directory -Force -Path $videosDir | Out-Null
New-Item -ItemType Directory -Force -Path (Split-Path $outFile) | Out-Null

$items = @()
$id = 1

Get-ChildItem -Path $imagesDir -Include *.jpg,*.jpeg,*.png -File -ErrorAction SilentlyContinue | Sort-Object Name | ForEach-Object {
    $file = $_.Name
    $src = "images/3d/" + $file
    # use same file as thumb if no explicit thumb exists
    $thumbCandidate = [System.IO.Path]::GetFileNameWithoutExtension($file) + "_thumb" + $_.Extension
    if(Test-Path (Join-Path $imagesDir $thumbCandidate)){
        $thumb = "images/3d/" + $thumbCandidate
    } else {
        $thumb = $src
    }
    $title = ([System.IO.Path]::GetFileNameWithoutExtension($file)) -replace "[_-]"," "
    $entry = [PSCustomObject]@{
        id = $id
        title = $title
        category = "interior"
        media = "photo"
        thumb = $thumb
        src = $src
        desc = ""
        tags = @()
    }
    $items += $entry
    $id++
}

Get-ChildItem -Path $videosDir -Include *.mp4,*.webm -File -ErrorAction SilentlyContinue | Sort-Object Name | ForEach-Object {
    $file = $_.Name
    $src = "videos/" + $file
    # optional thumb with same base name + _thumb.*
    $thumbCandidate = ([System.IO.Path]::GetFileNameWithoutExtension($file)) + "_thumb.jpg"
    if(Test-Path (Join-Path $imagesDir $thumbCandidate)){
        $thumb = "images/3d/" + $thumbCandidate
    } else {
        $thumb = "images/3d/video_thumb.jpg" # fallback if you add a generic video thumb
    }
    $title = ([System.IO.Path]::GetFileNameWithoutExtension($file)) -replace "[_-]"," "
    $entry = [PSCustomObject]@{
        id = $id
        title = $title
        category = "exterior"
        media = "video"
        thumb = $thumb
        src = $src
        desc = ""
        tags = @("video")
    }
    $items += $entry
    $id++
}

# write JSON
$items | ConvertTo-Json -Depth 5 | Set-Content -Path $outFile -Encoding UTF8
Write-Host "Wrote $($items.Count) items to $outFile"
Write-Host "If you need thumbnails, create files named like image_thumb.jpg in frontend/images/3d"
