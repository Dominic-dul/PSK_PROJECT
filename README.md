# PSK_PROJECT
## PROJECT DESCRIPTION
E-commerce flower shop for two user perspectives: business side - for listing products for sale; customer side - for being able to see the listed products and buy them. The whole implementation patern was divided into 3 phases. This repository so far implements Phase 1, which is the MVP of the flower e-shop
## LAUNCHING INSTRUCTIONS
Database setup: https://www3.ntu.edu.sg/home/ehchua/programming/sql/MySQL_HowTo.html

When you change from your temporary password, set the new password to 'password' for the spring boot application to work.

When you launch the mysql database server, you can access it via MySql Workbench app client.
For the Spring Boot code to work, you need to create a database inside the root user with the name 'eshop'.
  - To do this, just run the script: 'CREATE DATABSE eshop'

After launching the database locally, you need to navigate into the eshop folder and launch the back-end application
Then, you need to navigate into the eshopfrontend folder to launch the front-end application
Furthermore, the application is then reachable under the http://localhost:3000 URL, unless you configured the ports differently.

If you are launching the application for the first time, navigate to 'application.properties' file in eshop folder and set the property spring.jpa.hibernate.ddl-auto = create-drop.
This will initialize the database tables. Right after that, shut down the application, set the spring.jpa.hibernate.ddl-auto = update and launch the application again. After this, leave this value 'update' untouched when you start developing the application. That way all your changes and records, inserted in the database will remain there.
