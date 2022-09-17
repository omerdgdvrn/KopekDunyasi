let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mysql = require('mysql');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

let connection = mysql.createConnection({
    host:"213.238.179.159",
    user:"creative_sonodev",
    password:"G~qg8Id1EoV-",
    port: 3306,
    database: "creative_sonodev"
});

function connect() {
    connection.connect();
}

router.post('/login', function (req, res) {

    console.log(req.body);

    let sqlSorgusu = `SELECT * FROM user WHERE USERNAME = '` + req.body.username + `' AND PASSWORD = '` + req.body.password + `'`;

    console.log(connection.state);

    if (connection.state === 'disconnected') {

        connect();
    }
    connection.query(sqlSorgusu, [req.body.email, req.body.password], function (err, results) {
        if (err) {
            console.log(err);
            return res.json(401);
        }
        console.log(results[0]);
        return res.json(results[0]);
    });

});

router.post('/register', function (req, res) {
    console.log(req.body);
    let sqlSorgusu = `INSERT INTO user(name,surname,password,username) VALUES('` + req.body.name + `', '` + req.body.surname + `', '` + req.body.password + `', '` + req.body.username + `');`;

    if (connection.state === 'disconnected') {
        connect();
    }
    connection.query(sqlSorgusu, function (err, results) {
        if (err) {
            return res.json(500);
        }
        return res.json(200);
    });
});
module.exports = router;
