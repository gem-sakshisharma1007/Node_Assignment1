const http = require('http');
const fs = require('fs');

const server_obj = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {

    fs.readFile('text.json', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal server Error');
        return;
      }

      let jsonData = JSON.parse(data);
      let responseObject = { message: 'Data is wriiten to the required file.', data: jsonData };

     
      fs.writeFile('data.txt', JSON.stringify(responseObject), 'utf8', (err) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal server_obj Error');
          return;
        }

        
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(responseObject));
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Page not found!');
  }
});

server_obj.listen(8080, () => {
  console.log('Server is running on port 8080');
});



