@echo off
rem --------------------------------------------------------------
rem Batch Script to Launch Other Batch Scripts
rem --------------------------------------------------------------

:MENU
cls
echo ===============================
echo      Batch Script Launcher
echo ===============================
echo 1. Start Node.js Server
echo 2. Exit
echo ===============================
set /p choice=Select an option (1-2): 

rem Handle the user's menu choice
if "%choice%"=="1" call :START_NODEJS_SERVER
if "%choice%"=="2" exit

rem Invalid input handler
echo Invalid choice, please select a valid option.
pause
goto MENU

:START_NODEJS_SERVER
cls
echo ===============================
echo      Starting Node.js Server
echo ===============================
rem Navigate to the folder containing your server.js
cd C:\Users\Asephri\source\repos\webdev\asephridotnet

rem Run the Node.js server
echo Starting Node.js server...
start "" node server.js

rem Go back to the menu
pause
goto MENU
