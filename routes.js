const routes =  require('next-routes')();

routes
.add('/new', '/newcontract')
.add('/arts/:address', '/arts/index')
.add('/arts/:address/', '/arts/index')
.add('/arts/:address/new', '/arts/new');

module.exports = routes;
