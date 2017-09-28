var socket = io();
socket.on('connect', function(){
    console.log('connected to server');
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
    var messageBox = $('[name=message]');
    socket.emit(
        'createMessage',
        {
            from: "Jimmy",
            text: messageBox.val()
        },
        function(data) {
            messageBox.val('');
        }
    );
});

var locationButton = $('#send-location');
locationButton.click(function(event) {
    if(!('geolocation' in navigator)) {
        alert('Geolocation not supported by your browser');
    } else {
        locationButton.attr('disabled', 'disabled');
        locationButton.text('Sending Location...');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                socket.emit('createLocationMessage', {
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                });
                locationButton.removeAttr('disabled');
                locationButton.text('Send Location');
            },
            function() {
                locationButton.removeAttr('disabled');
                locationButton.text('Send Location');                
                alert('Unable to find location');                       
            }
        );
    }
});