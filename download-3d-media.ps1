# Download sample 3D design images and a sample video into the project folders
# Run this from the repository root in PowerShell

$imgDir = "frontend/images/3d"
$videoDir = "frontend/videos"

New-Item -ItemType Directory -Force -Path $imgDir | Out-Null
New-Item -ItemType Directory -Force -Path $videoDir | Out-Null

Write-Host "Downloading sample images to $imgDir ..."

Invoke-WebRequest -Uri "https://picsum.photos/id/1011/800/500" -OutFile "$imgDir\design1_thumb.jpg" -UseBasicParsing
Invoke-WebRequest -Uri "https://picsum.photos/id/1011/1200/800" -OutFile "$imgDir\design1.jpg" -UseBasicParsing

Invoke-WebRequest -Uri "https://picsum.photos/id/1025/800/500" -OutFile "$imgDir\design2_thumb.jpg" -UseBasicParsing
Invoke-WebRequest -Uri "https://picsum.photos/id/1025/1200/800" -OutFile "$imgDir\design2.jpg" -UseBasicParsing

Invoke-WebRequest -Uri "https://picsum.photos/id/1043/800/500" -OutFile "$imgDir\design3_thumb.jpg" -UseBasicParsing
Invoke-WebRequest -Uri "https://picsum.photos/id/1043/1200/800" -OutFile "$imgDir\design3.jpg" -UseBasicParsing

Invoke-WebRequest -Uri "https://picsum.photos/id/1062/800/500" -OutFile "$imgDir\design4_thumb.jpg" -UseBasicParsing
Invoke-WebRequest -Uri "https://picsum.photos/id/1062/1200/800" -OutFile "$imgDir\design4.jpg" -UseBasicParsing

Invoke-WebRequest -Uri "https://picsum.photos/id/1071/800/500" -OutFile "$imgDir\design5_thumb.jpg" -UseBasicParsing
Invoke-WebRequest -Uri "https://picsum.photos/id/1071/1200/800" -OutFile "$imgDir\design5.jpg" -UseBasicParsing

Invoke-WebRequest -Uri "https://picsum.photos/id/1084/800/500" -OutFile "$imgDir\design6_thumb.jpg" -UseBasicParsing

Write-Host "Downloading sample video to $videoDir ..."
Invoke-WebRequest -Uri "https://www.w3schools.com/html/mov_bbb.mp4" -OutFile "$videoDir\villa.mp4" -UseBasicParsing

Write-Host "Done. Open frontend/3d-design.html to preview the gallery."
