set root_dir=%cd%

@REM INSTALL CLIENT 
cd %root_dir%\client
start cmd /k npm install

@REM INSTALL ACCOUNT-SERVER
cd %root_dir%\account-server
start cmd /k npm install

@REM @REM INSTALL COMPANY-SERVER
cd %root_dir%\company-server
start cmd /k npm install

@REM @REM INSTALL EVENT-SERVER
cd %root_dir%\event-server
start cmd /k npm install

@REM @REM INSTALLFINANCE-SERVER
cd %root_dir%\finance-server
start cmd /k npm install

exit
