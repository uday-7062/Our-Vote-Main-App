@echo off
echo Setting up Android environment variables...

set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools

echo ANDROID_HOME set to: %ANDROID_HOME%
echo PATH updated with Android tools

echo.
echo Now you can run: npm run android
echo.
pause 