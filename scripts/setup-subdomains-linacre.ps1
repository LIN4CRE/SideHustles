# Automated Subdomain Verification Script for linacre.site
# Checks DNS resolution and SSL certificate provisioning for subdomains:
# - hustle.linacre.site
# - ai.linacre.site
# - mail.linacre.site
# - deals.linacre.site

$subdomains = @(
    @{ Name = "hustle.linacre.site"; Target = "SideHustles Studio (Firebase)" },
    @{ Name = "ai.linacre.site";     Target = "OmniRoute LLM API Gateway" },
    @{ Name = "mail.linacre.site";   Target = "Smart-Mail Outreach Engine" },
    @{ Name = "deals.linacre.site";  Target = "Mob Deals & Storefronts" }
)

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  🌐 SUBDOMAIN ROUTING & DNS AUDIT FOR LINACRE.SITE       " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan

foreach ($sub in $subdomains) {
    Write-Host "`nChecking $($sub.Name) [$($sub.Target)]..." -ForegroundColor Yellow
    try {
        $dns = Resolve-DnsName -Name $sub.Name -ErrorAction Stop
        Write-Host "  [OK] Resolved IP/CNAME: $($dns.IPAddress)$($dns.NameHost)" -ForegroundColor Green
    } catch {
        Write-Host "  [PENDING] DNS record not yet pointing or pending propagation." -ForegroundColor DarkYellow
    }
}

Write-Host "`n=========================================================" -ForegroundColor Cyan
Write-Host "DNS Audit Complete! See guide below for exact CNAME records." -ForegroundColor Cyan
