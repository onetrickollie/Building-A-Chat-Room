const socket = io('ws://localhost:3500')

const activity = document.querySelector('.activity')
const msgInput = document.querySelector('input')

function sendMessage(e) {
    e.preventDefault()
// if input is valid
// message sent and reset
    if (msgInput.value) {
        socket.emit('message', msgInput.value)
        msgInput.value = ""
    }
    msgInput.focus()
}
// Button

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages 
socket.on("message", (data) => {
    activity.textContent = ""
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

msgInput.addEventListener('keypress',() =>{
    socket.emit('activity',socket.id.substring(0,5))
})


//show typing activity
let activityTimer
socket.on("activity",(name)=>{
    activity.textContent = `${name} is typing...`

    // clear after 1.5 seconds
    clearTimeout(activityTimer)
    activityTimer = setTimeout(() =>{
        activity.textContent = ""
    },3000)

})