export default class Gate{

  constructor(user){
      //console.log(user);
      this.user = user;
  }

  isAdmin(){
    return this.user.type === "admin";
  }
  isUser(){
    return this.user.type === "user";
  }
  isAuthor(){
    return this.user.type === "author";
  }

  isUserOrAuthor(){
      if(this.user.type === 'user' || this.user.type === 'author'){
          return true;
      }

  }
}
