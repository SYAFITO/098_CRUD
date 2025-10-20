const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true }));

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
    })
});

app.post('/api/users', (req, res) =>{
    const { nama, nim, kelas} = req.body;

    if (!nama ||!nim ||!kelas) {
         return res.status(400).json({ message: 'nama, nim, kelas wajib diisi'});
    }
    
    db.query(
        
        'INSERT INTO mahasiswa (nama, nim ,kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
        (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).json({message: 'Database Error'});
            }

            res.status(201).json({ message: 'User created successfully'});
        }
    );
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database Error'});
        }
        res.json({ message: 'User deleted successfully!'});
    });
});


