// app.js

// Change this before push!!!!
// Running locally, do:
//const socket = io('ws://localhost:3500')
// Before pushing, change it to:
const socket = io('https://anonymouschat-lwyq.onrender.com/');

const msgInput = document.querySelector('#message');
const nameInput = document.querySelector('#name');
const chatRoom = document.querySelector('#room');
const activity = document.querySelector('.activity');
const usersList = document.querySelector('.user-list');
const roomList = document.querySelector('.room-list');
const chatDisplay = document.querySelector('.chat-display');

// Profile pictures for users
const profilePics = {
    'kirby': 'assets/kirbyPFP.png',
    'mt': 'assets/meta_knight.webp'
};

// Default profile pictures
const defaultProfilePic1 = 'assets/marioPFP.png';
const defaultProfilePic2 = 'assets/peachPFP.webp';

// Helper function to determine which default profile picture to use
function getDefaultProfilePic(name) {
    // You can customize this logic to alternate or choose based on certain criteria
    const defaultPics = [defaultProfilePic1, defaultProfilePic2];
    const index = name.charCodeAt(0) % 2; // Simple even/odd logic for demo
    console.log(`Assigning default profile pic: ${defaultPics[index]} to user: ${name}`);
    return defaultPics[index];
}

function sendMessage(e) {
    e.preventDefault();
    if (nameInput.value && msgInput.value && chatRoom.value) {
        socket.emit('message', {
            name: nameInput.value,
            text: msgInput.value
        });
        msgInput.value = "";
    }
    msgInput.focus();
}

function enterRoom(e) {
    e.preventDefault();
    if (nameInput.value && chatRoom.value) {
        socket.emit('enterRoom', {
            name: nameInput.value,
            room: chatRoom.value
        });
    }
}

document.querySelector('.form-msg')
    .addEventListener('submit', sendMessage);

document.querySelector('.form-join')
    .addEventListener('submit', enterRoom);

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', nameInput.value);
});

// Listen for messages 
socket.on("message", (data) => {
    activity.textContent = "";
    const { name, text, time } = data;
    console.log(`Received message from: ${name}, text: ${text}, time: ${time}`);
    const li = document.createElement('li');
    li.className = 'post';
    if (name === nameInput.value) li.className = 'post post--left';
    if (name !== nameInput.value && name !== 'Admin') li.className = 'post post--right';
    if (name !== 'Admin') {
        const profilePicUrl = profilePics[name] || getDefaultProfilePic(name);
        console.log(`Using profile picture: ${profilePicUrl} for user: ${name}`);
        li.innerHTML = `<div class="post__header ${name === nameInput.value
            ? 'post__header--user'
            : 'post__header--reply'
            }">
            <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic">
            <span class="post__header--name">${name}</span> 
            <span class="post__header--time">${time}</span> 
        </div>
        <div class="post__text">${text}</div>`;
    } else {
        li.innerHTML = `<div class="post__text">${text}</div>`;
    }
    document.querySelector('.chat-display').appendChild(li);

    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

let activityTimer;
socket.on("activity", (name) => {
    console.log(`${name} is typing...`);
    activity.textContent = `${name} is typing...`;

    // Clear after 3 seconds 
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        activity.textContent = "";
    }, 3000);
});

socket.on('userList', ({ users }) => {
    console.log(`Received user list: ${JSON.stringify(users)}`);
    showUsers(users);
});

socket.on('roomList', ({ rooms }) => {
    console.log(`Received room list: ${JSON.stringify(rooms)}`);
    showRooms(rooms);
});

function showUsers(users) {
    usersList.textContent = '';
    if (users) {
        usersList.innerHTML = `<em>Users in ${chatRoom.value}:</em>`;
        users.forEach((user, i) => {
            usersList.textContent += ` ${user.name}`;
            if (users.length > 1 && i !== users.length - 1) {
                usersList.textContent += ",";
            }
        });
    }
}

function showRooms(rooms) {
    roomList.textContent = '';
    if (rooms) {
        roomList.innerHTML = '<em>Active Rooms:</em>';
        rooms.forEach((room, i) => {
            roomList.textContent += ` ${room}`;
            if (rooms.length > 1 && i !== rooms.length - 1) {
                roomList.textContent += ",";
            }
        });
    }
}
