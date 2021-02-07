//DOM queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit',e=>{
e.preventDefault();
const message = newChatForm.message.value.trim();
general.addChat(message)
.then(e=>{
    newChatForm.reset();
}).catch(err=>{
    console.log(err);
});

})

// update username
newNameForm.addEventListener('submit',e=>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    // update name by-- general-- (chatroom) class
    general.updateName(newName);

        //reset the form
        newNameForm.reset();
         //show and hide update message
         updateMsg.innerText = `your name is updated to "${newName}" `;
setTimeout(e=>
    {updateMsg.innerText = ``;
    },3000); 
    })



    //update chat room
    rooms.addEventListener('click',e=>{
        console.log(e.target.id);
        const room = e.target.id
   
    
        if(e.target.tagName==="BUTTON" )
        {
            
            chatUI.clear();
            e.target.classList.add('highlight');
            setTimeout(f=>{
                e.target.classList.remove('highlight');
            },4000);
            e.target.classList.add('highlight');
            general.updateRoom(room);
            general.getChats(e=>{
            chatUI.render(e);
            });
          
        }
    });
//check local storage for a name
const username =localStorage.username ? localStorage.username : 'anone';


// class instances
const chatUI = new chatUi(chatlist);

const general = new chatroom('general',username);
 

 // getting the chat and render

 general.getChats((data)=>{
     chatUI.render(data);
  
 });