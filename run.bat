@echo off
cd "path to project folder"

:: echo Would you like to rebuild the app? (y/n)
:: set /p rebuild=

:: if /i "%rebuild%"=="y" (
::    echo Rebuilding the app...
::    call npm run build
::    if %errorlevel% neq 0 (
::        echo Failed to build the app. Press any key to exit.
::        pause > nul
::        exit /b
::    )
:: )

GOTO :endOfOldVersion
echo Starting the app...
call npm start
if %errorlevel% neq 0 (
    echo Failed to start the app. Press any key to exit.
    pause > nul
    exit /b
)

echo App is running. Press any key to close.
pause > nul

:endOfOldVersion
echo Starting the app...

:: Start the Next.js app in a new window without blocking the script
start "" cmd /c "npm start"

:: Wait for a few seconds to give the app some time to start
:: timeout /t 1 /nobreak >nul

:: Once the port is open, open the browser
start "" "http://localhost:3030"

::close unecessarry window
exit 

:: echo App is running. Press any key to close.
:: pause > nul
