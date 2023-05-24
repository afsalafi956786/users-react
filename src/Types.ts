export interface Users {
    id:string;
    name:{title:string,first:string,last:string};
    picture:{
     large:string,
     medium:string,
      thumbnail:string;
    };
    login:{uuid:string}
  }