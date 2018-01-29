const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const PORT = process.env.PORT || 8080;
const server = http.createServer((request, response) => {

  let url = request.url;
  let method = request.method;


  // console.log(request.method);
  // console.log(request.httpVersion);
  // console.log(request.url);
  get(url)


  function get(url) {

    switch (url) {

      case `/`:
        url = `/index.html`;
        getRequests(url, request, response);
        break

      // case `/index.html`:

      //   getRequests(url, request, response);
      //   break;

      // case `/hydrogen.html`:
      //   getRequests(url, request, response);
      //   break;

      // case `/helium.html`:
      //   getRequests(url, request, response);
      //   break;

      case `/css/styles.css`:
        getCssRequest(url, request, response);
        break;
      case url:
      getRequests(url, request, response);
      break;

      default:

        fs.readFile(`./public/404.html`, (err, data) => {
          response.writeHead(404, 'Not Found');
          response.write(data);
          return response.end();
        });

        //response.end();
        break;
    }
  }

  if(method === "POST"){

    request.on('data',(chunk)=>{
      let chunkStr = chunk.toString();
      let post = querystring.parse(chunkStr);
      //console.log(post);

      makeFile(post);
      //console.log(url)
      get(url);
    }); 
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening: ${PORT}`);
});

function makeFile(post){
  let elementBody = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ${post.elementName}</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>${post.elementName}</h1><h2>H</h2><h3>Atomic number ${post.elementAtomicNumber}</h3><p>${post.elementName} is a chemical element with symbol ${post.elementSymbol} and atomic number ${post.elementAtomicNumber}. It is ${post.elementDescription}</p><p><a href="/">back</a></p></body></html>`
  fs.writeFile(`public/${post.elementName}.html`,elementBody ,(err) =>{
    if(err){
      throw err;
    }
    console.log("FILE POSTED :D");
  });

  }

//Error and success headers
function errorResponse(response) {
  response.writeHead(404, 'Not Found');
}
function successHeader(response) {
  response.setHeader('Content-Type', 'text/html');
  response.writeHead(200, 'OK');
}

// GETREQUEST
function getRequests(url, req, res) {
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
// GETREQUEST FOR CSS
function getCssRequest(url, req, res) {

  fs.readFile(`public${url}`, { encoding: 'utf8' }, (err, data) => {
    console.log(`public${url}`);

    if (!(`public${url}`)) {
      errorResponse(res);
      return res.end();
    }
    res.setHeader('Content-Type', 'text/css');
    res.writeHead(200, 'OK');
    res.write(data);
    return res.end();
  });

}

