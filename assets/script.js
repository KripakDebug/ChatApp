

const socket = io();


const modalReg = document.querySelector('.modal');
const messageList = document.querySelector('.message-list');
const formRegistration = document.querySelector('.form');
const inputGetName = document.querySelector('#inputAddName');
const listUsers = document.querySelector('.users');
const formMessageSend = document.querySelector('.form-mesage');
const inputSendMessage = document.querySelector('.message-input');



function formListener() {
    formRegistration.addEventListener('submit', (e) => {
        e.preventDefault()
        
        if(inputGetName.value !== '' ){
            socket.emit('name', inputGetName.value)
            modalReg.style.display = 'none';
        }
        
    })
    
    formMessageSend.addEventListener('submit', (e) => {
        e.preventDefault();
        if(inputSendMessage.value !== ''){
            let audio = new Audio('./sentmessage.mp3');
            audio.play();
            socket.emit('chat message', {message: inputSendMessage.value, name: inputGetName.value })
            inputSendMessage.value = '';
        }
    })
    socket.on('get users', (data) => {
        listUsers.innerHTML = '';
        data.forEach(element => {
            let listItem = document.createElement('li');
            listItem.textContent = element;
            listUsers.append(listItem);
        });
        
    })
    socket.on('chat message', (data) => {
        const date = new Date();
        const output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '   ' + String(date.toLocaleTimeString().slice(0,-3));
        const messageWrapp = document.createElement('div');
        messageWrapp.classList.add('message-wrap');
        const messageLi = document.createElement('li');
        const span = document.createElement('span');
        const paragraph = document.createElement('p');
        const strong = document.createElement('strong');
        span.textContent = data.name;
        paragraph.textContent = data.message;
        messageLi.append(span);
        messageLi.append(paragraph);
        strong.append(output);
        gsap.from(strong, {
            x: 10,
            opacity: 0,
        })
        gsap.to(strong, {
            x: -5,
            opacity: 1,
        })
        gsap.from(messageLi, {
            x: -50,
            opacity: 0,
        })
        gsap.to(messageLi, {
            x: 5,
            opacity: 1,
        })

        messageWrapp.append(messageLi);
        messageWrapp.append(strong);
        messageList.append(messageWrapp);
        messageList.scrollTo(0, messageList.scrollHeight);
        
    })
}



formListener()