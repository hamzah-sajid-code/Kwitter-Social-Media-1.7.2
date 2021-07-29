namee = localStorage.getItem('User name');
var ppN = document.getElementById('pp').value;
console.log(ppN)
document.getElementById('name').innerHTML = namee;

function logout() {
      localStorage.removeItem('User name')
      window.location = 'index.html';
}

function addRoom() {
      var ppN = document.getElementById('pp').value;
      console.log(ppN)
      if (ppN == 'public') {
            romnum = 1;
            roomname = document.getElementById('id_room').value;
            localStorage.setItem(roomname, roomname);
            firebase.database().ref('/chat').child(roomname).update({
                  'Room Name': roomname
            });
      } else if (ppN == 'private') {
            console.log('This is private room')
            roomname = document.getElementById('id_room').value;
            usernumm = localStorage.getItem('User name')
            localStorage.setItem(roomname, roomname);
            firebase.database().ref('/pass').child(roomname).update({
                  'Room Name': roomname
            });
            pus = document.getElementById('pusa').value;
            console.log('This is private room')
            roomname = document.getElementById('id_room').value;
            usernumm = localStorage.getItem('User name')
            localStorage.setItem(roomname, roomname);
            firebase.database().ref('/pus').child(roomname).update({
                  'Password': pus
            });
      }
      document.getElementById('pusa').value = "";
      document.getElementById('id_room').value = "";
}

function getData() {
      firebase.database().ref("/chat").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names)
                  roomnamewithhash = "#" + Room_names;
                  outputthing = "<div id=" + Room_names + " onclick='redirectToRoomname(this.id)'>" + roomnamewithhash + "</div><hr>"
                  document.getElementById('output').innerHTML += outputthing;

                  //End code
            });
      });
      firebase.database().ref("/pass").on('value', function (snapshot) {
            document.getElementById("out2").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names)
                  roomnamewithhash1 = "#" + Room_names;
                  outputthing1 = "<div id=" + Room_names + " onclick='redirectToRoomnamepass(this.id)'>" + roomnamewithhash1 + "</div><hr>"
                  document.getElementById('out2').innerHTML += outputthing1;

                  //End code
            });
      });
}

function redirectToRoomname(room_name_functio) {
      console.log(room_name_functio)
      localStorage.setItem('whichredirect', room_name_functio)
      window.location = 'kwitter_page.html';
}

function redirectToRoomnamepass(room_name_functio) {
      console.log(room_name_functio);
      poss = prompt("What's the room password:");
      firebase.database().ref("/pus/" + room_name_functio).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        if (poss == message_data) {
                              localStorage.setItem('whichredirect', room_name_functio)
                              window.location = 'kwitter_page.html';
                        } else {
                              alert('Wrong password')
                              window.location = 'kwitter_room.html';
                        }
                  }
            });
      });
}
getData();
firebase.database().ref("/pass").on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log(Room_names)

            //End code
      });
});