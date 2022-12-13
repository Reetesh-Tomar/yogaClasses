import express from 'express'
import mysql from 'mysql'
import expressEjsLayouts from 'express-ejs-layouts'

const app = express()

//configure ejs
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

// receive form data
app.use(express.urlencoded({extended: true, limit: '1mb'}))


// connect to the database

const db = mysql.createPool({
    host     : 'sql.freedb.tech',
    user     : 'freedb_yogaDB',
    password : '3WRmZk&eX5r9tmF',
    database : 'freedb_formdata',
    connectionLimit: 5,
})

const create_table_sql = "\
CREATE TABLE IF NOT EXISTS yoga (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    name VARCHAR(100) NOT NULL,\
    email VARCHAR(100) NOT NULL,\
    age INT NOT NULL,\
    batch VARCHAR(100) NOT NULL\
)"

// console.log('MySQL database connected successfully!')
    
//create table on start
db.query(create_table_sql, (err,) => {
    if (err) throw err 
    console.log("Table initilization complete")
})
// db.on('connection', function (connection) {
//     console.log('DB Connection established');
//     console.log('MySQL database connected successfully!')
    
//     //create table on start
//     db.query(create_table_sql, (err,) => {
//         if (err) throw err 
//         console.log("Table initilization complete")
//     })
  
//     connection.on('error', function (err) {
//       console.error(new Date(), 'MySQL error', err.code);
//     });
//     connection.on('close', function (err) {
//       console.error(new Date(), 'MySQL close', err);
//     });
  
//   });
// db.connect(err => {
//     if (err) throw err 

// })

const makePayment = async () =>{
    return true
}

// ROUTES

// route_1: [GET] home page
app.get('/', (req, res) => res.render('index'))

// route_2: Nodejs save form data in MySQL
// app.post('/users', (req, res) => {
app.post('/yoga', (req, res) => {
    const { name, email, age, batch } = req.body
    const user = { name, email, age, batch }

    db.query('INSERT INTO yoga SET ?', user, (err, output) => {
        if (err) throw err 
        res.send('User saved successfully!')
    })
})
app.get('/checkPayment', async (req, res) => {
    const paymentStatus = await makePayment()
    return res.json({paymentStatus:"complete", message:"₹500 Paid Successfully"})
})

// wait for requests from PORT 3000
app.listen(3000)

//sorce: https://www.golinuxcloud.com/nodejs-save-form-data-in-mysql-table/