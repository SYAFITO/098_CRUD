const express = reqiure('expresss');
let mysql = require('mysql2')
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urleancoded({extended: true }));

app.get('/',(req,res) => {
    res.send ("Hello World")
});

app.listen('/',(req,res ) => {
    console .log('Server is running on port ${PORT}');
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bismillah123',
  database: 'mahasiswa',
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to Mysql:'+ err.stack);
    return;
  }
    console.log('Connected to successfully');
});

// Buat Method GET dan POST

// GET

app.get('/api/users', (req,res) => {
    db.query('SELECT * FROM mahasiswa', (err,results) => {
        if (err) {
            console.error('Error exuting query:0' + err.stack);
            res.status(500).send('Error Fetching users');
            return;
        }
        res.json(result);
    });
});

