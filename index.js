'use strict'; // Enforce use of strict verion of JavaScript

/*	@Doc
    Main server app instance module.
    All the route mounting happens here
*/

const app = require('./express_app');
const port = 3000;

/* Mount all the routers from the route modules onto the Express app */
// Below are some examples
// app.use('/user', require('./routes/user'));
// app.use(require('./routes/qr'));

app.listen(port, () => console.log(`Server listening to port ${port}`));