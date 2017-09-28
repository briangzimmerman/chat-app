var socket = io();
socket.on('connect', function(){
    console.log('connected to server');
    // socket.emit(
    //     'createMessage',
    //     {
    //         from: 'Frankie',
    //         text: "asdljfnsdf"
    //     },
    //     function(data) { 
    //         console.log(data.reply);
    //     }
    // );
});

socket.on('disconnect', function(){
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);

    createNotification(message);
});

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $(`<a target='_blank'>My Location</a>`);

    a.attr('href', message.url)
    li.text(`${message.from}: `);

    li.append(a);
    $('#messages').append(li);
    
    createNotification({
        from: message.from,
        text: `${message.from} shared their location`
    });
})

$('#message-form').on('submit', function(event) {
    event.preventDefault();
    socket.emit(
        'createMessage',
        {
            from: "Jimmy",
            text: jQuery('[name=message').val()
        },
        function(data) {
            return;
        }
    );
});

var locationButton = $('#send-location');
locationButton.click(function(event) {
    if(!('geolocation' in navigator)) {
        alert('Geolocation not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                socket.emit('createLocationMessage', {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                });
            },
            function() {
                alert('Unable to fetch location');
            }
        );
    }
});