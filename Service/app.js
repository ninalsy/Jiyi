//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet("/page1", function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Page One');
	});	
	
dispatcher.onPost("/page2", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Page Two');
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});