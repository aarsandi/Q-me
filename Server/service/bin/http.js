const app = require('../app.js');
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.listen(PORT, function () {
  console.log(`running ${NODE_ENV} app on port ${PORT}`);
})