# Remove deliverables and screenshot requirements from all trainee practical files

$files = Get-ChildItem "c:\Dev\SiebelTrainingRepository\SiebelTraining\docs\day*_practical_trainee*.html"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Remove screenshot requirements
    $content = $content -replace 'Take screenshot of [^<]+', 'Review and verify '
    $content = $content -replace 'take screenshot', 'verify completion'
    $content = $content -replace 'Screenshot of [^<]+', 'Verified '
    
    # Replace Deliverables sections with completion messages
    $content = $content -replace '<strong>✅ Lab \d+ Deliverables:</strong>\s*<ul>.*?</ul>', '<strong>✅ Lab Complete!</strong><p>Practice exercise finished successfully.</p>'
    
    # Remove submission checklist
    $content = $content -replace '<h2>📝 Submission Checklist</h2>.*?</section>', '<h2>📝 Summary</h2><div class="highlight"><p>You have completed all practical exercises. Review your work with the instructor if you have questions.</p></div></section>'
    
    # Save updated content
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "  Updated: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nCompleted processing $($files.Count) files" -ForegroundColor Cyan
