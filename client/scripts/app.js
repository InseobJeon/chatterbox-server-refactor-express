// eslint-disable-next-line
const app = {
  server: 'http://127.0.0.1:3002/messages',
  // send method 가 존재 
  // 나머지 method 들도 app 안에 존재해야 한다
  init: function() {
    
    app.fetch().then(json => {
      // 배열 형태로 먼저 전달하기 위해 map method 이전 renderRoom 실행
        app.renderRoom(json.results)
        json.results.map(arg => {
        app.renderMessage(arg)  
        
      })
    })
  },

  fetch: function() {
    return fetch(app.server).then(res => res.json())
  },

  send: function(message) {
    // console.table(message)
    // This is the url you should use to communicate with the AWS server.
    
    fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      return response.json();
    }).then(json => {
      // console.table(json)
      app.renderMessage(json)
    })
  },

  clearMessages : function() {
    let chats = document.getElementById('chats');
    while(chats.firstChild){
      chats.removeChild(chats.firstChild);
    }
  },

  renderMessage: function(messageData) {

    let chats = document.querySelector("#chats")
    
    let chat = document.createElement("div");
    chat.className = "chat";
        
    let userName = document.createElement("div");
    userName.className = "username";

    let userText = document.createElement("div");
    userText.className = "text"

    let name = document.createTextNode(messageData.username)
    let text = document.createTextNode(messageData.text)

    userName.appendChild(name)
    userText.appendChild(text)

    chat.appendChild(userName)
    chat.appendChild(userText)

    chats.prepend(chat)
  },

  renderRoom: (messageData) => {
    console.log(messageData)
    let roomList = messageData.map(eachData => {
      return eachData.roomname
    })
    let filteredRoomList = [...new Set(roomList)]
    filteredRoomList.filter(eachRoom => {
      (eachRoom === undefined) || (eachRoom === '')
    })
    console.log(filteredRoomList)
    filteredRoomList.map(eachRoom => {
      let roomList = document.querySelector("#rlist")
      let roomData = document.createElement("option")
      roomData.value = eachRoom
      roomData.innerText = eachRoom
      roomList.appendChild(roomData)
    })
  }

};


// add event listner on submit button
let submitButton = document.querySelector("#submitButton")
submitButton.addEventListener("click", () => {
  app.send(makingMessage())
})

// add event listner on delte button 
let deleteButton = document.querySelector("#deleteButton")
deleteButton.addEventListener("click", app.clearMessages)

// render message by DOM method 
let makingMessage = () => {
  return {
    "username":document.querySelector("#nameInput").value,
    "roomname":"IM22",
    "date":String(new Date()),
    "text":document.querySelector("#textInput").value
  }
}

/**
 * auto fetching 은 어떻게 구현할 수 있을까? 
 * fetch 를 해서 데이터를 가져온다 
 * dom 에 있는 chat 태그의 갯수보다 가져온 데이터의 배열에 담긴 인자의 갯수가 더 많다면
 * 나머지 갯수들을 추가해준다
 * 
 * room 은 어떻게 구현할 수 있을까?
 * 모든 message 들의 room 을 가져와 배열에 담는다
 * 그 중에서 중복을 제거한다
 * 그 중복을 제거한 배열의 데이터들을 room 을 선택할 수 있는 html tag 에 넣어준다
 * 해당 html tag 에 따라 room 을 정렬해서 render 한다  
 */

// let renderRoom = () => {
//   app.fetch(app.server).then(data => {
//     let roomArr = [];
//     roomArr.push(data.roomname)
//     return roomArr
//   })
//   .then(roomArr => {
//     roomArr.map(room => {
//       let roomData = document.createElement("option")
//       roomData.value = room
//       roomData.innerText = room
//       document.getElementById("#rooms").appendChild(roomData)
//     })
//   })
// }

app.init();
// app.send();

  







// fetch method 사용하기 
// fetch 로 get 요청을 보내는데, DOM 을 조작해선 안 된다 

// 메시지 전달, 메시지 받아오기 

// renderMessage, clearMessage method 구현 

/**
 * fetch 를 통해서 get 도 하고, post 도 해야 한다 
 * get 은 요청, post 는 제출
 * 그런데 fetch 는 데이터를 가져오는 건데, post 는 어떻게? 
 * browser 에서만 가능한 method 인지, server 에서도 사용한 method 인지 
 */

 /**
  * 만드는 순서
  * 1. html 수정 (message 를 담을 수 있는, 입력할 수 있는 form)
  * 2. testCase 순서대로 하나하나 만들어보기 (guide 로 참고해서)
  * 3. init() 이라는 메서드는? : 초기화면을 잡아주는 method 
  * 
  * fetch - get 을 통해 서버의 메시지를 받아온다
  * 그리고 받아온 것들을 init() 을 활용해서 DOM 을 조작한 뒤, 화면에 띄워준다 
  * -> 이것이 초기화면!! 
  * 
  * 4. GET method 를 통해서 데이터를 가져오는데, 여기서 DOM 조작은 하지 않는다
  * -> 추측 이유? : 확실한 기능 분할을 위해 (and 가독성)
  * 
  * 5. POST method 를 통해서 데이터를 전송한다, 마찬가지로 DOM 조작은 하지 않는다 
  * 
  * figma -> 근데 이거는 공짜버전에서는 2명까지밖에 안됨 
  * 다시 한번 figma 2명이상되는지 확인해보고, 안되면 대안을 찾아봅시다!! 
  * 
  * 다른 사람들이 한 것들도 올라간 뒤에 우리 메시지가 맨 위에 있어야하는지 (v)
  * 혹은 처음에 render 시켰던 그 위에 
  */
