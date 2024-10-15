set root_dir=%cd%

@REM START CLIENT 
cd %root_dir%\client
start cmd /k npm start

@REM START ACCOUNT-SERVER
cd %root_dir%\account-server
start cmd /k npm start

@REM @REM START COMPANY-SERVER
cd %root_dir%\company-server
start cmd /k npm start

@REM @REM START EVENT-SERVER
cd %root_dir%\event-server
start cmd /k npm start

@REM @REM START FINANCE-SERVER
cd %root_dir%\finance-server
start cmd /k npm start

exit
