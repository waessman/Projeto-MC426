const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = 8080;

const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger.js');

const empresaRouter = require('./scr/routes/empresa_route');
const loginRouter = require('./scr/routes/login_route');
const usuarioRouter = require('./scr/routes/usuario_route')

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
  })
  

/*Routes*/
app.use('/empresa', empresaRouter); 
app.use('/', loginRouter);
app.use('/usuario', usuarioRouter); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  
  /* Starts Express Server */
  app.listen(process.env.PORT || port, 
    () => console.log(`App listening at http://localhost:${port}`)
  );

  module.exports = app
