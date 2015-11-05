var http      = require('http');
var httpProxy = require('http-proxy');
var exec = require('child_process').exec;
var request = require("request");

var GREEN = 'http://152.1.13.38:5060';
var BLUE  = 'http://152.1.13.38:9090';

var TARGET = BLUE;

var infrastructure =
{
  setup: function()
  {
    // Proxy.
    var options = {};
    var proxy   = httpProxy.createProxyServer(options);

    var server  = http.createServer(function(req, res)
    {
      proxy.web( req, res, {target: TARGET } );
    });
    server.listen(8080);
    console.log("Infrastructure Up");
    // Launch green slice
   // exec('forever start /usr/bin/docker run -p 9090:8080 -d --name app_blue ncsu-app', function(err, out, code)
   // {
   //   console.log("attempting to launch blue slice");
   //   if (err instanceof Error)
   //         throw err;
   //   if( err )
   //   {
   //     console.error( err );
   //   }
   // });

    // Launch blue slice
    //exec('forever start /usr/bin/docker run -p 5060:8080 -d --name app_green ncsu-app', function(err, out, code) 
    //{
    //  console.log("attempting to launch green slice");
    //  if (err instanceof Error)
    //    throw err;
    //  if( err )
    //  {
     //   console.error( err );
    //  }
    //});

    //setTimeout
    var heartBeat = setInterval(function(){
       var options = 
       {
          url: "http://localhost:8080",
       };
       request(options, function (error, res, body) {
           console.log(res.statusCode);
           if ( res.statusCode != 200)
           {
              //switch to GREEN
               TARGET = GREEN;
               proxy.web( req, res, {target: TARGET } );
           }
         })
       }, 30000)
  },

  teardown: function()
  {
    exec('forever stopall', function()
    {
      console.log("infrastructure shutdown");
      process.exit();
    });
  },
}

infrastructure.setup();

// Make sure to clean up.
process.on('exit', function(){infrastructure.teardown();} );
process.on('SIGINT', function(){infrastructure.teardown();} );
process.on('uncaughtException', function(err){
  console.error(err);
  infrastructure.teardown();} );
