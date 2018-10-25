export interface ISong {
    _id: string;
    artist: string;
    title: string;
    location : [
        {discID:string,
        file:string,
        trackNo: string }];
    christmas : boolean;
  }