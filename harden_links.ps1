# Add rel="noopener noreferrer" to external links that open in a new tab
$files = Get-ChildItem "c:\Dev\SiebelTrainingRepository\SiebelTraining\docs" -Recurse -Include *.html

foreach ($file in $files) {
	$content = Get-Content $file.FullName -Raw
	# If target="_blank" exists and rel is missing, add rel attribute
	$updated = $content -replace '<a([^>]*?)target="_blank"(?![^>]*rel=)', '<a$1target="_blank" rel="noopener noreferrer"'
	if ($updated -ne $content) {
		Set-Content -Path $file.FullName -Value $updated -NoNewline
		Write-Host "Updated rel attribute in: $($file.FullName)" -ForegroundColor Green
	}
}
Write-Host "Done."