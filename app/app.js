const socket = new WebSocket('ws://localhost:3000')

function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
// if input is valid
// message sent and reset
    if (input.value) {
        socket.send(input.value)
        input.value = ""
    }
    input.focus()
}
// Button
document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages 
socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})