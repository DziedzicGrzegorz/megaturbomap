export interface AdEntity{
    id:string;
    name:string;
    description:string;
    price:number;
    url:string;
    lat:number;
    lon:number;

}
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export interface SimpleAdEntity extends Pick<AdEntity, 'id' | 'lat' | 'lon' >{}

