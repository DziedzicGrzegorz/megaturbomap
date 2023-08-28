import {AdEntity} from "types/dist/AdRecord/Adrecord";
import {Optional} from "types";
import {ValidationError} from "../utils/erros";
import { v4 as uuidv4 } from 'uuid';

type NewAdEntity = Optional<AdEntity, 'id'>;

export class AdRecord implements AdEntity{
    public id: string;
    public name: string;
    public description: string;
    public url: string;
    public price: number;
    public lat: number;
    public lng: number;

    constructor(obj:NewAdEntity) {
        if(!obj.name || obj.name.length > 100){
            throw new ValidationError("Name is required and must be less than 100 characters");
        }
        if(!obj.description || obj.description.length > 1000){
            throw new ValidationError("Description is required and must be less than 1000 characters");
        }
        if(!obj.price || obj.price < 0 || obj.price > 1000000){
            throw new ValidationError("Price is required and must be greater than 0 and less than 1000000");
        }
        if(!obj.url || obj.url.length > 1000){
            throw new ValidationError("URL is required and must be less than 1000 characters");
        }

        this.id = uuidv4()
        this.name = obj.name;
        this.description = obj.description;
        this.url = obj.url;
        this.price = obj.price;
        this.lat = obj.lat;
        this.lng = obj.lng;
    }

}