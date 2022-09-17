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
    database: "creative_sonodev",
    charset : 'utf8mb4'
});

function connect() {
    connection.connect();
}

router.get('/get', function (req, res) {

    let sqlSorgusu = `SELECT p.id,title,description,name,surname,(select count(*) from replies q where q.postid=p.id ) as replies FROM post p INNER JOIN user u on u.id = p.userid order by p.id desc`;

    if (connection.state === 'disconnected') {
        connect();
    }

    connection.query(sqlSorgusu, function (err, results) {
        if (err) {
            console.log(err);
            return res.json(500);
        }
        return res.json(results);
    });
});

router.get('/detail', function (req, res) {

    let sqlSorgusu = `SELECT p.id,title,description,name,surname FROM post p INNER JOIN user u on u.id = p.userid where p.id = `+req.query.id;

    if (connection.state === 'disconnected') {
        connect();
    }

    connection.query(sqlSorgusu, function (err, results) {
        if (err) {
            console.log(err);
            return res.json(500);
        }
        return res.json(results);
    });
});

router.get('/replies', function (req, res) {

    let sqlSorgusu = `SELECT * FROM replies r INNER JOIN user u on u.id = r.userid where r.postid = `+req.query.id;

    if (connection.state === 'disconnected') {
        console.log(connection.state);
        try{
            connect();
        }
        catch{

        }
    }

    connection.query(sqlSorgusu, function (err, results) {
        if (err) {
            console.log(err);
            return res.json(500);
        }
        return res.json(results);
    });
});

router.post('/newReplies', function (req, res) {

    console.log(req.body);
    let sqlSorgusu = `INSERT INTO replies(postid,description,userid) VALUES('` + req.body.postid + `', '` + req.body.description + `', '` + req.body.userId + `');`;

    if (connection.state === 'disconnected') {
        connect();
    }
    connection.query(sqlSorgusu, function (err, results) {
        if (err) {
            console.log(err);
            return res.json(500);
        }
        return res.json(200);
    });
});

router.post('/post', function (req, res) {

    console.log(req.body);
    let sqlSorgusu = `INSERT INTO post(description,title,userid) VALUES('` + req.body.description + `', '` + req.body.title + `', '` + req.body.userId + `');`;

    if (connection.state === 'disconnected') {
        connect();
    }
    connection.query(sqlSorgusu, function (err, results) {
        if (err) {
            console.log(err);
            return res.json(500);
        }
        return res.json(200);
    });
});
module.exports = router;
