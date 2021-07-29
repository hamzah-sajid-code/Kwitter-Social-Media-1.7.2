function addUser(){
    user_name = document.getElementById('name').value;

    localStorage.setItem('User name', user_name);
    window.location = 'kwitter_room.html';
}