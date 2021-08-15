How to run
~~~~~~~~~~

1. Make sure mongodb server is running.
2. Goto application code directory and run yarn install.
3. Modify the connection string config.js
4. Run "node index.js"

Project Structure
~~~~~~~~~~~~~~~~~

1. index.js - Bootstraps the application
2. config.js - Database and other configurations
3. router.js - Custom router for routing endpoints
4. routes.js - List of routes (api endpoints in the project)
5. common - Some common functions/helpers that are used throught the project.
6. models - Project's models
7. controllers - Project's controllers