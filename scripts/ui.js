//render chat templates to the Dom
// clear the list of chats (when the room changes)

class chatUi{
constructor(list){
    this.list=list;
}

clear(){

    this.list.innerHTML ='';
}


render(data){
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(),{addSuffix:'ago'});
    

const html =`
<li class="list-group-item">
<span class ="username">${data.username}  :  </span>
<span class ="xbox message">${data.message} </span>
<div class="time"> ${when}</div>
</li>
`;
this.list.innerHTML += html;
}


}