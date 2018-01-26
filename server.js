const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
const server = http.createServer((request, response) => {

  //Client requests the method, http version and url
  // console.log(request.method);
  // console.log(request.httpVersion);
  //console.log(request.url);

  let url = request.url;
  let method = request.method;


  switch (method) {

    case 'GET':
      if (url === `/`) {
        url = `/index.html`;
      }
      if(url === `/css/styles.css`){
        url === `/css/styles.css`;
        getCssRequest(url, request, response );
       break;
      }

      getRequests(url, request, response);
      break;

    case 'POST':

      response.end();
      break;

    default:
      response.end();
      break;
  }

});
server.listen(PORT, () => {
  console.log(`Server is listening: ${PORT}`);
});

//Error and success headers
function errorResponse(response) {
  response.writeHead(404, 'Not Found');
}
function successHeader(response) {
  response.setHeader('Content-Type', 'text/html');
  response.writeHead(200, 'OK');
}


// GETREQUEST
function getRequests(url, req, res ) {
  fs.readFile(`public${url}`, { encoding: 'utf8' }, (err, data) => {
    //console.log(`public${url}`);

    if (err) {
      errorResponse(res);
      return res.end();
    }

    successHeader(res);
    res.write(data);
    return res.end();
  });
}

function getCssRequest(url, req, res ) {

  fs.readFile(`public${url}`, { encoding: 'utf8' }, (err, data) => {
    console.log(`public${url}`);

    if (err) {
      errorResponse(res);
      return res.end();
    }
    res.setHeader('Content-Type', 'text/css');
    res.writeHead(200, 'OK');
    res.write(data);
    return res.end();
  });

}

