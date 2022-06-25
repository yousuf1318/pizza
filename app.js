
const express = require('express');
const debug = require('debug')('app:startup')
const cors = require('cors');
const morgan = require('morgan');
require('./connections/db');


const app = express();

app.use(cors());
app.use(express.json());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('morgan logging....')
}

app.use('/', require('./routes'))

const PORT= process.env.PORT || 3030
app.listen(PORT, (err)=>{
    if(err){
        throw err
    }else{
        console.log(`your app is running on PORT : ${PORT}`);
        console.log(`api url: http://localhost:${PORT}`)
        console.log(`docs: http://localhost:${PORT}/docs`)
    }
})
