const moment=require('moment');

module.exports={
    formatDate:(date,format)=>{
        return moment(date).format(format);
    },
    trancate:(str,len)=>{
        return str.length>len?str.substr(0,len)+'...':str;
    },
    editIcon:(storyUserId,loggedUserId,storyId)=>{
        if(storyUserId.toString() == loggedUserId.toString()){
           return  `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="fas fa-edit" style="font-size: 16px;"></i></a>`
        }else 
        return ''
    }
};