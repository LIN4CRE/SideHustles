# 🤝 The Side Hustle Revision Team

This team is responsible for the manual oversight, strategic direction, and ethical alignment of the Automation Studio.

### 1. The Security Architect (@CyberGuardian)
- **Role**: Ensures zero-leak policy.
- **Responsibilities**: Moving all hardcoded credentials to encrypted environment variables and managing Firebase security rules.
- **Current Task**: Completed migration of Bank/PayPal details to `.env.example`.

### 2. The AI Systems Engineer (@PromptMaster)
- **Role**: Refines AI output quality and model selection.
- **Responsibilities**: Monitoring Gemini 1.5/2.0 releases and updating the `server.ts` prompts for maximum conversion.
- **Current Task**: Upgraded system to use `gemini-1.5-flash` for faster, cheaper, and more reliable kit generation.

### 3. The Cross-Platform Specialist (@DevOpsPro)
- **Role**: Ensures the project runs everywhere.
- **Responsibilities**: Maintaining both PowerShell (`.ps1`) and Bash (`.sh`) scripts for Windows/macOS/Linux parity.
- **Current Task**: Implemented `scripts/start-all.sh` and `scripts/auto-sync.sh`.

### 4. The Growth Strategist (@HustleCoach)
- **Role**: Validates the 37+ Side Hustle models.
- **Responsibilities**: Keeping the "Reality Checks" and "Market Heatmaps" updated with actual 2026 market data.

---

# 🤖 The Automated Robot Team (Live Workers)

These "Robots" are background processes and automated scripts that live within the codebase.

### 🤖 Robot A: The Guardian (Maintenance & Security)
- **Script**: `robots/RobotGuardian.js`
- **Duty**: Runs every 10 minutes (via auto-sync daemon). Scans for hardcoded secrets, lints code, and checks for build failures.

### 🤖 Robot B: The Evolver (Dependency & API Update)
- **Script**: `robots/RobotEvolver.js` (Pending)
- **Duty**: Monitors the `@google/genai` package for updates and automatically suggests model upgrades via the UI.

### 🤖 Robot C: The Sync-Daemon (Continuity)
- **Script**: `scripts/auto-sync.sh`
- **Duty**: Ensures the GitHub repository is never out of sync by more than 300 seconds.
