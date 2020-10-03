const socket = io();

const createUUID = () => {
    const date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
        const r = (date + Math.random() * 16) % 16 | 0;
        return (char == 'x' ? r : (r & 1)).toString(16);
    });
    return uuid;
}

const userId = createUUID();

const submitData = () => {
    const input = document.getElementById('input');
    socket.emit('chat message', JSON.stringify({
        message: input.value,
        userId
    }));
    input.value = '';
}

const updateMsgList = (msgJsonString) => {
    const msgDetail = JSON.parse(msgJsonString)
    const li = document.createElement('li');
    li.classList.add(msgDetail.class);
    li.innerText = `${msgDetail.timestamp} : ${msgDetail.message}`;
    document.getElementById('messages').appendChild(li);
}

socket.on('chat message', updateMsgList);