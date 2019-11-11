export interface UserData{
    id? : number,
    first_name : string,
    email : string,
    avatar : string
  }

export interface ResetPassword {
    old_password : string,
    new_password : string,
    confirm_password : string
}  

export interface BoardDetails{
    id? : number,
    board_name : string
}

export interface Choices{
    id? : number,
    choice : string,
    icon : string
}

export interface Members{
    id? : number,
    first_name : string,
    email : string,
    avatar : string
}


export interface HeaderElement{
    status : string,
    text  : string,
    peoples : string,
    date : Date,
    numbers : number
}


