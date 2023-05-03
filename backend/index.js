const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 4000;

const exampleRouter = require('./scr/routes/example_route')

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
app.use('/example', exampleRouter); // this example could be seen on Cadastro Usuario frontend page

  
  /* Starts Express Server */
  app.listen(process.env.PORT || port, 
    () => console.log(`App listening at http://localhost:${port}`)
  );