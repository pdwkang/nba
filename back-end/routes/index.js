var express = require('express');
var mysql = require('mysql');
var config = require('../config/config');
var router = express.Router();
var randtoken = require('rand-token')
var stripe = require('stripe')(config.stripeToken);
var pool = mysql.createPool({
    host: config.host,
    user: config.userName,
    password: config.password,
    database: config.database
});
var bcrypt = require('bcrypt-nodejs');
// Test route to test bcrypt
// var hashedPassword = bcrypt.hashSync("x");
// console.log(hashedPassword);
// var checkHash = bcrypt.compareSync("x", hashedPassword);
// console.log(checkHash);
/* GET home page. */


// Multer module
var multer = require('multer');
var upload = multer({dest: 'public/images'});
var type = upload.single('profileImg');
var artImg = upload.single('imgFile');
var fs = require('fs');



router.get('/', function(req, res, next) {
    // Instead of always using the same connection, we can use a pool of connections.
    // we just grab teh pool (defined above), use it, and then release it back to the pool.
    // The pool is responsible for managing the connections
    // see https://www.npmjs.com/package/mysql#connection-options   
    pool.getConnection((err, connection)=> {
        // connected! (unless `err` is set)
        const selectQuery = 'SELECT * FROM item';
        connection.query(selectQuery, (error, results, field) => {
            if (error) throw error;
            res.send({ results });
        });
        connection.release()
    }); 
});
router.get('/products/:id', function(req, res, next) {
    pool.getConnection((err, connection)=> { 
        const itemId = req.params.id;
        const selectQuery = `SELECT * FROM item WHERE id=${itemId}`;
        connection.query(selectQuery, (error, results, field) => {
            if (error) throw error;
            res.send({ results });
        });
        connection.release()        
    }) 
})
router.post('/login', (req, res, next) => {
    pool.getConnection((err, connection)=> { 
        const selectQuery = 'SELECT * FROM user WHERE username = ?';
        var password = req.body.password
        var username = req.body.username
        connection.query(selectQuery,[username], (error, results, fields) => {
            if(results.length === 0){
                res.json({msg: 'noAccount'})
                // console.log('############')
                // console.log('Wrong username')
                // console.log('############')     
            }else{
                checkHash = bcrypt.compareSync(password, results[0].password);
                if(checkHash == false){
                    res.json({msg: "badPassword"});
                    // console.log('############')
                    // console.log('Wrong Password')
                    // console.log('############')       
                }else{
                   var token = randtoken.uid(40);
                   insertToken = "UPDATE user SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE username=?";
                   connection.query(insertToken, [token, username], (error, results)=>{
                        if (error) throw error;
                        var selectQuery = "SELECT * FROM user WHERE token = ?"
                        connection.query(selectQuery, [token], (error, results)=>{
                            if (error) throw error;
                            // console.log('############')
                            // console.log(results)
                            // console.log('############')                            
                            res.json({
                                msg:'foundUser',
                                token: token,
                                username: username,
                                data:results
                            })    
                        })
                    })
                }
            }
        });
        connection.release()                    
    })
})

// Logout
router.post('/logout', (req, res, next) => {
    pool.getConnection((err, connection)=> { 
        var token = req.body.token;
        // console.log(req.body)
        var deleteTokenQuery = `UPDATE user SET token = NULL, token_exp = NULL WHERE token = ?`;
        connection.query(deleteTokenQuery, [token], (error, results) => {
            if (error) throw error;
            // console.log('Results: ' + results);
            res.json({
                msg:'logged out',
                token: '',
                username: ''
            });
        });
    });
});


// Make a register post route
router.post('/register', (req, res, next) => {
    pool.getConnection((err, connection)=> {     
        const selectQuery = 'SELECT * FROM user WHERE username = ?';
        connection.query(selectQuery,[req.body.username], (error, results, fields) => {
            // console.log(results)
            if(results.length === 0){
                var insertUserQuery = 'INSERT INTO user (name, email, username, password, job) VALUES' +
                "(?,?,?,?,?)";
                connection.query(insertUserQuery, [req.body.name, req.body.email, req.body.username, bcrypt.hashSync(req.body.password),req.body.job], (error, results, field) => {
                    // res.json({msg: 'userInserted'})
                    var token = randtoken.uid(40);
                    var insertToken = "UPDATE user SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE username=?";
                   connection.query(insertToken, [token, req.body.username], (error, results)=>{
                    var selectQuery = "SELECT * FROM user WHERE token = ?"
                    // console.log('i made it this far')
                        connection.query(selectQuery, [token], (error, results)=>{
                            if (error) throw error;
                            // console.log('############')
                            // console.log(results)
                            // console.log('############')                            
                            res.json({
                                msg:'foundUser',
                                token: token,
                                username: req.body.username,
                                data:results
                            })    
                        })    
                    })
                })
            }else{
                res.json({msg: "userNameTaken"})
            }
        });
        connection.release()                
    })
});


router.get('/account/:username', function(req, res, next) {
    pool.getConnection((err, connection)=> {         
        const selectQuery = 'SELECT * FROM user WHERE username = ?';
        connection.query(selectQuery, [req.params.username], (error, results, field) => {
            if (error) throw error;
            res.send({ results });
            // console.log('ACCOUNT PAGEEE')
        });
        connection.release()                            
    }) 
})


router.post('/submitBid/', function(req, res, next) {
    pool.getConnection((err, connection)=> {             
        const selectQuery = 'SELECT current_bid, starting_bid FROM item WHERE id = ?';
        connection.query(selectQuery, [req.body.auctionItemId], (error, results, field) => {
            if (error) throw error;
            // console.log('############')
            // console.log(results)
            // console.log('############')
            if((req.body.bidAmount < results[0].current_bid)
            ||(req.body.bidAmount < results[0].starting_bid)){
                res.json({ msg: "bidToLow" });
            }else{
                // bid had passed server validation.. its high enough! update
                // update the bid_history table, and the auctions table
                // >> auctions table
                //   - high_bider_id
                //   - current_bid
                // >> bid_history
                //   - auction_id
                //   - bidder_id
                //   - amount
                // update auctions high_bidder_id and bid
                // where auction id = whatever was passed           
                var getUserId = "SELECT id FROM user WHERE token = ?"
                // console.log(req.body.userToken)
                connection.query(getUserId, [req.body.userToken], (error2, results2) => {
                    // console.log('############')
                    // console.log(results2)
                    // console.log('############')
                    if(results2.length > 0){
                        var insertAuctionsQuery = " UPDATE item SET high_bidder_id = ?, current_bid = ? " +
                            "WHERE id = ?";
                        connection.query(insertAuctionsQuery, [results2[0].id, req.body.bidAmount, req.body.auctionItemId], (error, results, field) => {
                            if (error2) throw error2;
                            res.json({
                                msg:'bidAccepted',
                                newBid: req.body.bidAmount
                            })                      
                        })      
                    }else{
                        res.json({
                            msg:'badToken'
                        })
                    }
                })
            }
        });
        connection.release()                
    })
})

router.get('/artists', function(req, res, next) {
    pool.getConnection((err, connection)=> {         
        const selectQuery = 'SELECT * FROM user WHERE job = ?';
        connection.query(selectQuery, ['artist'], (error, results, field) => {
            if (error) throw error;
            // console.log(results)
            res.json({
                artists:results
            })              
        });
        connection.release()                            
    }) 
})


router.post('/profilePic', type, (req, res, next) => {
    // console.log(req.file)
    var token = req.body.token;
    var tempPath = req.file.path;
    var imgName = req.file.originalname;
    var targetPath = `public/images/${imgName}`;
    var insertQuery = "UPDATE user SET photo = ? WHERE token = ?";
    pool.getConnection((err, connection)=> {         
        connection.query(insertQuery, [imgName, token], (DBerror, results, fields)=>{
            if(DBerror) throw DBerror; 
            // console.log('error1')
            // res.json("uploaded succesfully"); 
            fs.readFile(tempPath, (readError, readContents)=>{
                if(readError) throw readError; 
                // console.log('error2')
                fs.writeFile(targetPath,readContents, (writeError)=>{
                    if(writeError) throw writeError; 
                    // console.log('error3')
                    fs.unlink(tempPath, (err)=>{
                        // console.log('error4')
                        if(err) throw err
                        var selectQuery = "SELECT * FROM user WHERE token = ?"
                        connection.query(selectQuery, [token], (error, results)=>{
                            if (error) throw error;                      
                            res.json({
                                msg:'foundUser',
                                token: token,
                                username: results.username,
                                data:results
                            })    
                        })                                                 
                    })
                })
            })
        })
        connection.release()  
    });
});

router.post('/updateProfile', (req, res, next) => {
    var token = req.body.token;
    var name = req.body.name;
    var email = req.body.email;
    var bio = req.body.bio;
    var location = req.body.location;
    var updateQuery = "UPDATE user SET name = ?, email = ?, bio = ?, location = ? WHERE token = ?";
    pool.getConnection((err, connection)=> {         
        connection.query(updateQuery, [name, email, bio,location,token], (DBerror, results, fields)=>{
            var selectQuery = "SELECT * FROM user WHERE token = ?"
            connection.query(selectQuery, [token], (error, results)=>{
                if (error) throw error;                      
                res.json({
                    msg:'foundUser',
                    token: token,
                    username: results.username,
                    data:results
                })    
            })
        })
        connection.release()  
    });
});

router.get('/artistData/:id', function(req, res, next) {
    pool.getConnection((err, connection)=> {         
        var artistID = req.params.id
        const selectQuery = 'SELECT * FROM user WHERE id = ?';
        connection.query(selectQuery, [artistID], (error, results, field) => {
            if (error) throw error;
            var artistData = results
            var selectItemsQuery = 'SELECT * FROM item WHERE seller_id = ?'
            connection.query(selectItemsQuery, [artistID], (error, results2, field) => {
            // console.log(results)
                res.json({
                    artist: artistData,
                    items: results2
                }) 
            });             
        });
        connection.release()                            
    }) 
})

router.post('/addArtwork', artImg, (req, res, next) => {
    // console.log(req.body)
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var startPrice = req.body.startPrice;
    var buyNow = req.body.buyNow;
    var auctionStart = req.body.auctionStart
    var auctionEnd = req.body.auctionEnd
    var tags = req.body.tags
    var userId = '';
    var auctionId = '';
    var tempPath = req.file.path;
    var imgName = req.file.originalname;
    var targetPath = `public/images/${imgName}`;

    // var getUserQuery = `SELECT id FROM users WHERE token = ?`;
    var insertQuery = 'INSERT INTO item (name, description, seller_id, starting_bid, current_bid, buy_now_price, tags, image_url) VALUES (?,?,?,?,?,?,?,?)'
    pool.getConnection((err, connection)=> {         
        connection.query(insertQuery, [title,description,id,startPrice,'0',buyNow,tags,imgName], (error1, results1) => {
            fs.readFile(tempPath, (readError, readContents) => {
                fs.writeFile(targetPath, readContents, (writeError) => {
                    if (writeError) throw writeError;
                    fs.unlink(tempPath, (unlinkError) => {
                        if (unlinkError) throw unlinkError;
                        res.json({
                            msg: `Listing ${auctionId} created`
                        });
                    });
                });
            });
        });
        connection.release()
    });
});

module.exports = router;

