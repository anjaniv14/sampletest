  var express = require('express'); 
    var app = express(); 
    app.use(express.json());
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var mysql=require('mysql');

    var con=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sampledb'
    });

    con.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
    });


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    /** Serving from the same express Server
    No cors required */

    // app.use(express.static('/client'));
    app.use(express.static(__dirname+'/client'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.use(bodyParser.json());

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).array('file',5);

    app.get('/',function(req,res){
    	// var data=[];
    	var query=con.query("SELECT category_name,category_id,path from category",function(err,result){
    		if(err)
    			res.send(err);
    		else{
    			data=JSON.parse(result);
    			console.log(data);
    			re.send(data);
    			 // res.json();
    			// return data;
    		}
    	});
    });

    app.post('/upload_file',function(req,res){
    	var post=JSON.parse(JSON.stringify(req.body));


    	// var data={
    	// var catobject  = post.category_name;
    	// console.log('get dataobject',req.body);	
    	var category_id=post.category_id;
    	var category_name=post.category_name;
    	var category_title=post.category_title;
    	var file=post.file;

    		var sql = "INSERT INTO `file_category`(`category_id`,`category_name`,`category_title`,`path`) VALUES ('" + category_id + "','" + category_name + "','" + category_title + "','"+file+"')";
    		
    		var query=con.query(sql,function(err,result){
    			if(err){
    				console.log("error");
    				// res.send(err);
    			}

    			else{
    				console.log("success");
    				res.send("success");
    			}
    			
    		})
    });

    /** API path that will upload the files */
    app.post('/upload', function(req, res) {
    	
    	// if(req.files)
    	// {
    	
    	// var path=post.path+'/'+file.name;
    	// }
   
    //	console.log("category_id,category_name,category_title,file,path",category_id,category_name,category_title);

    	// debugger;

    	// return false;

    	// ,file,path);
    	// "INSERT into file_category ('category_id','category_name','category_title') values",category_id,category_name,category_title
    	
    		
    	    	
        upload(req,res,function(err){
            if(err){
                 res.send({error_code:1});
                 return;
            }
             res.send({error_code:0});
        })
    });
    
    app.listen('3000', function(){
        console.log('running on 3000...');
    });

