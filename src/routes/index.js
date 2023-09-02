const blogRouter = require('./blog')

function route(app) {
      app.use("/", blogRouter);
}
module.exports = route;
