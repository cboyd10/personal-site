$WSLIP = wsl.exe hostname -I | ForEach-Object { $_.Trim() }
netsh interface portproxy delete v4tov4 listenport=5173 listenaddress=0.0.0.0
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=$WSLIP
Write-Host "Vite is now accessible on your LAN at port 5173 (WSL IP = $WSLIP)"
