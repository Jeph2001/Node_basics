
const express = require('express');
const app = express();

app.use(express.json());

const names = [
    {id: 1, namess: 'Maniragaba'},
    {id: 2, namess: 'Jeph'},
    {id: 3, namess: 'Yozefu'},
    {id: 4, namess: 'Joseph'},
]

// let's start with the get method
app.get('/api/name', (req, res) => {
    res.send(names);
});
app.get('/api/name/:id', (req, res) => {
    const amazina = names.find(n => n.id === parseInt(req.params.id));
    res.send(amazina);
});

// post method

app.post('/api/write', (req, res) => {
    const namo = {
        id: names.length + 1,
        namess: req.body.namess
    };
    if (!req.body.namess){
        res.send('Namess required');
    }
    names.push(namo);
    res.send(namo);
});

// put/update method

app.put('/api/put/:id', (req, res) => {
    const amazinaaa = names.find(n => n.id === parseInt(req.params.id));
    if(!amazinaaa) res.status(404).send('Course does not exist');
    amazinaaa.namess = req.body.namess;
    if (!req.body.namess){
        res.send('Namess required');
    }
    res.send(names);
});

// delete method

app.delete('/api/delete/:id', (req, res) => {
    const amazinaaa = names.find(n => n.id === parseInt(req.params.id));
    if(!amazinaaa) res.status(404).send('Name does not exist');
    
    const indexOfName = names.indexOf(amazinaaa);
    names.splice(indexOfName, 1);
    res.send(names);
});
// we have to define the dynamic PORT for our app

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Running Server'));