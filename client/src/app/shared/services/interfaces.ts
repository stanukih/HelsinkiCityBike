export interface AuthUser{
    email:string,
    passwort:string
}
export interface Travel {
    departure_time:Date;
    return_time:Date;
    departure_station_id:Number;
    departure_station_name:String;
    return_station_id:Number;
    return_station_name:String;
    distance:Number;
    duration:Number;
  }

export interface Stantion {
    fid:Number;
    id:Number;
    nimi:String;
    namn:String;
    name:String;
    osoite:String;
    adress:String;
    kaupunki:String;
    stad:String;
    operaattor:String;
    kapasiteet:Number;
    positionX:Number;
    positionY:Number;
  }