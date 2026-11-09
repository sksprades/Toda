@echo off
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Install Node.js, then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing project dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

call npm run dev -- --host 127.0.0.1 --open
if errorlevel 1 pause
