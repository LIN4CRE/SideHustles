# 🚀 Side Hustle Automation Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/Built%20with-React%20%7C%20Vite%20%7C%20Tailwind-blue.svg)](https://react.dev)
[![AI Studio Engine](https://img.shields.io/badge/AI%20Studio-Powered-amber.svg)](https://ai.studio)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> **The ultimate command center for discovering, launching, and scaling automated, high-margin side hustles with zero upfront capital.**

---

## 🌟 Key Features & Power Architecture

### ⚡ 1. Quick Launch Macro Engine
- **Reusable 1-Click Chains**: Record multi-step platform action sequences (e.g. *Open GenAI Studio ➔ Batch Generate 4K OLED Wallpapers ➔ Trigger 24h Sale Challenge*) into custom macro triggers.
- **Execution Telemetry**: Tracks macro execution frequency and sequential automated dispatches.

### 🎯 2. Deep Work Focus Mode
- **Zero-Distraction Interface**: Toggle Focus Mode inside any hustle detail panel to collapse non-essential UI and display purely critical velocity metrics, automated profit projections, and the immediate **Next Action Queue**.

### 🎙️ 3. Hands-Free Voice Control Layer
- **Speech Command Engine**: Execute platform navigation hands-free while working on client deliverables. Speak commands like `"generate assets"`, `"open recipes"`, `"24h challenge"`, or `"export csv"`.

### 🛡️ 4. Setup Snapshot & Revert Engine
- **Local IndexedDB / Storage State Backups**: Automatically snapshot hustle configurations and saved pipelines whenever settings change. Revert to a "known-good" baseline instantly with 1-click state restore.

### 🛰️ 5. Smart HUD Overlay
- **Context-Sensitive Floating Telemetry**: Real-time HUD banner monitoring 24-hour conversion rates, traffic velocity, and n8n/Make webhook connection status with direct action shortcuts.

### 🛠️ 6. Blueprint Recipe Marketplace & GenAI Asset Studio
- **n8n / Make JSON Blueprints**: One-click copyable visual workflow node blueprints.
- **AI Asset Batch Generator**: Produce 1p micro-assets, 4K OLED wallpapers, and Smartwatch Faces with instant Gumroad payment integration.

---

## 🛠️ Stack & Technologies

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Styling & UI**: Tailwind CSS + Lucide Icons
- **State Management**: React State + LocalStorage & IndexedDB Snapshot Engine
- **Voice Recognition**: Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`)
- **Server Runtime**: Express + Vite Middleware with CommonJS bundling (`esbuild`)

---

## 🚦 Quick Start Guide

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/user/side-hustle-automation-studio.git

# Navigate into project directory
cd side-hustle-automation-studio

# Install dependencies
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Open `http://localhost:3000` to view the application live in your browser.

### 3. Production Build
```bash
npm run build
npm start
```

---

## 📋 System Architecture Overview

```
src/
├── components/
│   ├── QuickLaunchMacroWidget.tsx    # 1-Click Macro Recorder & Execution Engine
│   ├── SmartHudOverlay.tsx           # Floating Contextual HUD Telemetry
│   ├── VoiceControlBar.tsx           # Web Speech Hands-Free Command Parser
│   ├── SetupSnapshotManagerModal.tsx # State Backup & Revert Manager
│   ├── SetupStepToolTooltip.tsx      # Tool Guidance & Setup Prompts
│   ├── HustleDetailModal.tsx         # Comprehensive Hustle View & Focus Mode
│   ├── WorkflowBlueprintLibrary.tsx  # n8n & Make Automation Scenarios
│   ├── RecommendedToolingStack.tsx   # Stack Checklist & Implementation Steps
│   ├── FreeStarterKitTester.tsx      # Micro-Asset Storefront Previewer
│   └── ...
├── services/                          # Economics & Reality Check Calculators
├── data/                             # Curated Hustle Database & Blueprints
├── types.ts                          # Shared TypeScript Interfaces
├── App.tsx                           # Root Studio Shell & Global State
└── server.ts                         # Custom Express Production Entry Point
```

---

## 📄 License

Distributed under the MIT License. Free for commercial and personal use.
