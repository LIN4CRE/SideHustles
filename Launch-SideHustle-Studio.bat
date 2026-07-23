@echo off
title Side Hustle Automation Studio Launcher
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "scripts\start-all-services.ps1"
pause
