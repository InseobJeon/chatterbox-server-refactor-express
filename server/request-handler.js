/*************************************************************
request handler 함수를 여기서 작성합니다.
reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.
requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요
**************************************************************/

let container = {
  "results" : []
};


const requestHandler = function (request, response) {
  // node server 의 requestHandler는 항상 request, response를 인자로 받습니다.

  // 또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.
  //
  // 이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.
  //
  // 기본적인 로그를 작성 하세요
  //
  // 간단한 로그를 작성 하는 것은, 서버를 디버깅 하는데 매우 수월하게 해줍니다.
  // 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
  /* eslint no-console: 0 */
  // if (request.url === '/messages') { 
  //   console.log("Serving request type " + request.method + " for url " + request.url);
  // }
  console.log("Serving request type " + request.method + " for url " + request.url);

  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  // CORS에 대해서는 조금더 알아보세요.
  const headers = defaultCorsHeaders;
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
  headers["Content-Type"] = "application/json";

  // .writeHead() 메소드의 두번째 인자로는 응답 헤더와 키와 값을 객체 형태로 적어줍니다.
  // response.writeHead(200, headers);

  // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
  // response.end("Hello, World!");


  // method 기준으로 분기하자!
  // 가장 먼저, url 기준으로 먼저 만들어주자
  if (request.url === "/messages") {
    // 그 다음, method 기준으로 분기를 해주자
    if (request.method === "POST") {
      let data = '';
      // request.on('error') => 
      request.on('data', (chunk) => {
        data += chunk;
      });
      request.on('end', () => {
        data = data.toString(); // 일단은 buffer -> string (json) 으로 바꿔줌
        console.log(data);
        // console.log(JSON.parse(data))
        container.results.push(JSON.parse(data));
        // console.log(msgDatas)
        response.writeHead(201, headers);
        response.end(data); // 그리고 json -> object 로 바꿔줌
      })
    }
    else if (request.method === "GET") {
      response.writeHead(200, headers);
      // console.log(msgDatas)
      // console.log(msgDatas[0])
      response.end(JSON.stringify(container));
    }
    else if (request.method === "OPTIONS") {
      response.writeHead(201, headers);
      response.end();
    }
    // endpoint가 /messages 가 아닌 경우는 모두 404 status code 를 response 
  } else {
    response.writeHead(404, headers);
    response.end();
  }


};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

// module exporting
module.exports = requestHandler;