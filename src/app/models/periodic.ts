export interface PeriodicElement {
    status: string;
    text: string;
    peoples: {
      img : string,
      name : string
    };
    date: Date;
    numbers : number
  }


  export interface FullBoardList{
    board_name : string,
    tables : string
  }