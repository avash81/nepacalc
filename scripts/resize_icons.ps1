Add-Type -AssemblyName System.Drawing
$sourcePath = 'C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\logo.png'
if (-not (Test-Path $sourcePath)) {
    Write-Error "Source logo.png not found at $sourcePath"
    exit
}

$img = [System.Drawing.Image]::FromFile($sourcePath)
$sizes = @(32, 48, 96, 144, 180, 192, 512)

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # Calculate aspect ratio to fit within square
    $ratio = [Math]::Min($size / $img.Width, $size / $img.Height)
    $newWidth = [int]($img.Width * $ratio)
    $newHeight = [int]($img.Height * $ratio)
    $posX = [int](($size - $newWidth) / 2)
    $posY = [int](($size - $newHeight) / 2)

    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($img, $posX, $posY, $newWidth, $newHeight)
    
    $fileName = if ($size -eq 180) { "apple-touch-icon.png" } else { "favicon-$($size)x$($size).png" }
    if ($size -eq 32) { $fileName = "favicon.png" }
    
    $path = "C:\Users\hp\Desktop\Movie\calcpro-FIXED\calcpro-final-build\public\$fileName"
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated $path"
}

$img.Dispose()
