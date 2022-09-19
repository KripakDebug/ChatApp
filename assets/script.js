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
        if(inputGetName.value !== ''){
            socket.emit('name', inputGetName.value)
            modalReg.style.display = 'none';
        }
        
    })
    
    formMessageSend.addEventListener('submit', (e) => {
        e.preventDefault();
        if(inputSendMessage.value !== ''){
            socket.emit('chat message', {message: inputSendMessage.value, name: inputGetName.value })
            inputSendMessage.value = '';
        }
    })
    socket.on('get users', (data) => {
        listUsers.innerHTML = '';
        data.forEach(element => {
            listUsers.innerHTML += `<li>${element}</li>`;
        });
        
    })
    socket.on('chat message', (data) => {
        let date = new Date();
        let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '   ' + String(date.toLocaleTimeString().slice(0,-3));
        messageList.innerHTML += `<div class='message-wrap'><li><span>${data.name}  </span> <p>${data.message}</p></li> <strong>${output}</strong></div>`;
        messageList.scrollTo(0, messageList.scrollHeight);
        
    })
}



formListener()