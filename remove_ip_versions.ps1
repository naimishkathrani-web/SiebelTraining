# Remove IP 21.7 and Innovation Pack version references from all HTML files

$files = Get-ChildItem "c:\Dev\SiebelTrainingRepository\SiebelTraining\docs" -Recurse -Include *.html

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Remove IP 21.7 references
    $content = $content -replace 'IP 21\.7', 'Siebel CRM'
    $content = $content -replace 'IP21\.7', 'Siebel CRM'
    $content = $content -replace 'IP 2021', 'Siebel CRM'
    
    # Clean up specific phrases
    $content = $content -replace 'Siebel CRM Siebel CRM', 'Siebel CRM'
    $content = $content -replace 'Oracle Siebel CRM Siebel CRM', 'Oracle Siebel CRM'
    $content = $content -replace 'Siebel Siebel CRM', 'Siebel CRM'
    
    # Remove Innovation Pack references
    $content = $content -replace '\(Innovation Pack 2021\)', ''
    $content = $content -replace 'Innovation Pack \d{4}', 'Latest Version'
    $content = $content -replace 'Innovation Pack releases', 'regular updates'
    $content = $content -replace 'Innovation Pack Release Notes', 'Release Notes'
    
    # Clean up version-specific API references
    $content = $content -replace 'REST APIs \(Siebel CRM\+\)', 'REST APIs'
    $content = $content -replace 'IP 17\+', 'modern'
    $content = $content -replace 'IP17\+', 'modern'
    
    # Clean up double spaces
    $content = $content -replace '  ', ' '
    
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)" -ForegroundColor Green
        $count++
    }
}

Write-Host "`nTotal files updated: $count" -ForegroundColor Cyan
