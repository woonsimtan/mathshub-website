const express = require('express');
const path = require('path');

const cors = require('cors');

// const jose = require('jose');

const app = express();
const port = 3001;

const accountModel = require('./account_model');

app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get('/accounts', (req, res) => {
  accountModel.getAccounts()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

app.post('/accounts/create', (req, res) => {
  accountModel.createAccount(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

app.delete('/accounts/del/:username', (req, res) => {
  accountModel.deleteAccount(req.params.username)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

app.get('/students', (req, res) => {
  accountModel.getStudents()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

app.post('/students/create', (req, res) => {
  accountModel.createStudent(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

app.delete('/students/del/:username', (req, res) => {
  accountModel.deleteStudent(req.params.username)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});

// app.post('/login', (req, res) => {
//   accountModel.accountLogin(req.body)
//       .then((response) => {
//         res.status(200).send(response);
//       })
//       .catch((error) => {
//         res.status(500).send(error);
//       });
// });



app.use('/login', (req, res) => {
  accountModel.accountLogin(req.body)
      .then((response) => {
        if (response === "Logged in successfully!") {
          let expiryDate = new Date();
          // change this to getHours + 24 when fully functioning
          expiryDate.setMinutes(expiryDate.getMinutes() + 1);
          res.send({
            // need to change this
            token: 'test123',
            username: req.body['username'],
            expiry: expiryDate
          });
        } else {
          res.status(500).send(response);
        }
        
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  
});


app.post('/studentprofile', (req, res) => {
  accountModel.getStudentProfile(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
