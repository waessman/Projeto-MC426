const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 8080;

const empresaRouter = require('./scr/routes/empresa_route')

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

  
  /* Starts Express Server */
  app.listen(process.env.PORT || port, 
    () => console.log(`App listening at http://localhost:${port}`)
  );
