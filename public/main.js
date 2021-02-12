var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('messages', function(data) {
    console.log(data);
    render(data);
})

function render(data) {
    var html = data.map(function(element, index) {
        return (`<div>
                    <strong>${element.author}</strong>
                    <em>${element.text}</em>  
                </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function login(e) {
    let username = "Jugador-" + Math.floor(Math.random() * 100);
    socket.emit('login', username);
    return false;
}