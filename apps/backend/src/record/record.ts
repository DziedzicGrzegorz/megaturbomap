import {ValidationError} from "../utils/erros";
import {v4 as uuidv4} from 'uuid';
import {pool} from "../utils/db";
import type {AdEntity, Optional, SimpleAdEntity} from "types";

type NewAdEntity = Optional<AdEntity, 'id'>;

export class AdRecord implements NewAdEntity {
    public id: string | undefined;
    public name: string;
    public description: string;
    public url: string;
    public price: number;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError("Name is required and must be less than 100 characters");
        }
        if (!obj.description || obj.description.length > 1000) {
            throw new ValidationError("Description is required and must be less than 1000 characters");
        }
        if (!obj.price || obj.price < 0 || obj.price > 1000000) {
            throw new ValidationError("Price is required and must be greater than 0 and less than 1000000");
        }
        if (!obj.url || obj.url.length > 1000) {
            throw new ValidationError("URL is required and must be less than 1000 characters");
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.url = obj.url;
        this.price = obj.price;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getAdById(id: string) {
        const query = {
            text: 'SELECT * FROM advertisements WHERE id = $1',
            values: [id],
        };

        const {rows} = await pool.query(query) as { rows: AdEntity[] };

        return rows.length === 0 ? null : new AdRecord(rows[0])

    }

    static async findAll(testAd: string) {
        const {rows} = await pool.query('SELECT * FROM advertisements WHERE name = $1', [testAd]);

        return rows.map((row) => {
            const {id, lat, lon} = row as SimpleAdEntity;
            return {id, lat, lon};
        });

    }

    async insert() {
        if (this.id) {
            throw new Error("This ad already exists")
        } else {
            this.id = uuidv4()
        }
        await pool.query(
            'INSERT INTO advertisements(id, name, description, url, price, lat, lon) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [this.id, this.name, this.description, this.url, this.price, this.lat, this.lon],
        );
    }
}