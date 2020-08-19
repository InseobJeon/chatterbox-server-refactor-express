# chatterbox-server API docs

## 개요

chatterbox-server 의 API 를 작성한 문서입니다. 

---

## API LIST

### 1. GET

`/messages` 

- **description** : got messages from server
- **expected returned value type** : `JSON`
- **example code** :

```jsx
// using fetch
fetch(url).
then(res => {
	console.log(res);
}

// then you get
{"results":[{"username":"messages","roomname":"IM22","date":"Tue Aug 18 2020 19:11:56 GMT+0900 (대한민국 표준시)","text":"1"},{"username":"messages","roomname":"IM22","date":"Tue Aug 18 2020 19:11:57 GMT+0900 (대한민국 표준시)","text":"2"},{"username":"messages","roomname":"IM22","date":"Tue Aug 18 2020 19:11:58 GMT+0900 (대한민국 표준시)","text":"3"}]}
```

## 2. POST

`/messages`

- **description :** send messages to server
- **require value type :** `JSON`
- **value spec**

```jsx
{
    "username": "string type, type sender name",
    "roomname": "string type, type room name which you want to send message",
    "date": "any type okay, but Date() based string type is the best",
    "text": "string type, type a message content what you want to send"
}
```

- **example code :**

```jsx
//sample of message
let message = {
    "username": "string type, type sender name",
    "roomname": "string type, type room name which you want to send message",
    "date": "any type okay, but Date() based string type is the best",
    "text": "string type, type a message content what you want to send"
} 

//using fetch
fetch(url, {
	method : "POST",
	body : JSON.stringify(message),
	headers : {
		"Content-Type": "application/json"
	}
}).then(res => {
	return res.json();
})

//then your message is sent to server	
```