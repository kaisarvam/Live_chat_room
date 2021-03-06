 
 
 class chatroom{

constructor(room,username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
}


async addChat(message){
    //format a chat object
    const now = new Date();
    const chat = {
        message:message,
        username:this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
//  await this.db_collection_name.add(chat)
    const response = await this.chats.add(chat);
    return response;
   }

getChats(callback){
  
    this.unsub = this.chats
    .where('room','==',this.room)
    .orderBy('created_at')
    .onSnapshot(snapshot=>
        {

        snapshot.docChanges().forEach(change => 
            {
            if(change.type==='added')
            {
               //update ui
               console.log('x-file data',change.doc.data());
               callback(change.doc.data());
            }
        });

    });
}
   
    updateName(username){
        this.username = username;
        localStorage.setItem('username',username);
        
    }

    updateRoom(room)
    {
        this.room =room;
        console.log('room updated');
        if(this.unsub)
        {  
       this.unsub();
        }
       
    }
}

 

 

