roomid = localStorage.getItem('whichredirect')
usernamesa = localStorage.getItem('User name')
console.log(roomid)
console.log(usernamesa)

function getData() {
  firebase.database().ref('/'+roomid+'/').on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        //Start code
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        if(message_data['type'] == 'Msg'){
          name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        message_with_tag = "<h4 class='message_h4' style='word-break: break-all;'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button> <button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletet(this.id)'>Delete</button><hr><br>";
//         bu = "";
        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        console.log('Msg')
        document.getElementById("output").innerHTML += row;
        } else if(message_data['type'] == 'Img'){
        document.getElementById("output").innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>"+'<img src='+message_data['dataUriOfImage']+' class="img-responsive" height="200px" width="200px"><button class="btn btn-danger" id='+ firebase_message_id + ' onclick="deletet(this.id)">Delete</button><hr><br><br>';
        console.log('Img')
        } else if(message_data['type'] == 'Vid'){
          document.getElementById("output").innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>"+'<video src='+message_data['dataUriOfVideo']+' class="img-responsive" height="400px" width="500px" controls><button class="btn btn-danger" id='+ firebase_message_id + ' onclick="deletet(this.id)">Delete</button><hr><br><br>';
  
          }
          else if(message_data['type'] == 'Aud'){
            document.getElementById("output").innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>"+"<audio controls><source src="+message_data['dataUriOfAudio']+"></audio><button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletet(this.id)'>Delete</button><hr><br><br>";
            
            }
            else if(message_data['type'] == 'file'){
                url1 = 'https://firebasestorage.googleapis.com/v0/b/kwitter-database-96237.appspot.com/o/';
                url2 = '?alt=media';
                mainUrl = url1 + message_data['fileUrl'] + url2;
                if(message_data['fileUrl'].includes('pdf')){
                  console.log(mainUrl)
                  document.getElementById('output').innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>"+"<embed src="+mainUrl+" width='750' height='1000'><button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletet(this.id)'>Delete</button><hr><br><br>";
                } else{
                  slug = message_data['fileUrl'].split('.').pop();
                  console.log(slug)
                  str2 = slug.charAt(0).toUpperCase() + slug.slice(1);
                  document.getElementById('output').innerHTML += "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>"+"<h4>Download Button of your"+str2+" file:<a href="+mainUrl+"><button class='btn btn-info'><img src='download.svg'></img> Download</button></h4></a><button class='btn btn-danger' id=" + firebase_message_id + " onclick='deletet(this.id)'>Delete</button><hr><br><br>";
                  
                }
                
            }
        
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById('ting12').play();
        //End code
      }
    });
  });
}
getData();

function send() {
  messageval = document.getElementById('msg').value;
  if (messageval != "") {
    console.log('Nop !!!')
    document.getElementById('msg').value = "";
    firebase.database().ref(roomid).child('/').push({
      name: usernamesa,
      message: messageval,
      like: 0,
      type: 'Msg'
    });
  }
}

function logout() {
  localStorage.removeItem('User name');
  localStorage.removeItem('whichredirect')
  window.location = 'index.html';
}

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(roomid).child(message_id).update({
    like: updated_likes
  });

}
function deletet(message_idd){
  w1 = localStorage.getItem('whichredirect');
  firebase.database().ref(w1+'/'+message_idd).remove();
}

function back() {
  window.location = 'kwitter_room.html';
}
document.getElementById('roomname').innerHTML = "#" + roomid.replace('_', ' ');
window.addEventListener('keydown', ejd)

function ejd(e) {
  key = e.keyCode;
  console.log(key)
  if (key == '13') {
    console.log('Enter Pressed');
    send();
  }
}

// Image get it

function encodeImageFileAsURL(element) {
  console.log(element);
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    if (reader.result.includes('data:video')) { 
      console.log('RESULT', reader.result)
    firebase.database().ref('/'+roomid+'/').push({
      dataUriOfVideo: reader.result,
      type: 'Vid',
      name:usernamesa

    });

    }
    else if(reader.result.includes('data:image')){
      console.log('RESULT', reader.result)
      firebase.database().ref('/'+roomid+'/').push({
        dataUriOfImage: reader.result,
        type: 'Img',
        name:usernamesa
  
      });
    }
    else if(reader.result.includes('data:audio')){
    console.log('RESULT', reader.result)
    firebase.database().ref('/'+roomid+'/').push({
      dataUriOfAudio: reader.result,
      type: 'Aud',
      name:usernamesa

    });
  }
}
  reader.readAsDataURL(file);
}

// Get File

function getFile(){
  file = document.getElementById("myFile").files[0];
  name1 = +new Date() + "-" + file.name;
  firebase.database().ref('/'+roomid+'/').push({
    fileUrl: name1,
    type: 'file',
    name:usernamesa
  });
  const ref = firebase.storage().ref();
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name1).put(file, metadata);
}
