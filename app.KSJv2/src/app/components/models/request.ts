export interface IRequest {
    _id     : String;
    partyID : String;
    team    : { teamName:String,
                teamPin:String,
                partyID:String,
                singers:[String]};    
    song    : { artist:String,
                title:String,
                location : [ 
                    {discID:String,
                    file:String,
                    trackNo:String} ],
                christmas : Boolean};
    singers : [String];
    status  : Number;
    created : Date;
}