@echo off
echo Iniciando Sistema de Gestao de Impressoras...
echo.
echo Servicos:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:8080
echo - MySQL: localhost:3306
echo.
echo Parando containers existentes...
docker-compose down

echo.
echo Construindo e iniciando containers...
docker-compose up --build

pause
