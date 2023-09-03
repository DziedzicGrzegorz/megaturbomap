import {AdRecord} from "../record/record";
import {ValidationError} from "../utils/erros";
import {pool} from "../utils/db";
import {SimpleAdEntity} from "types";

jest.mock('uuid', () => ({
    v4: () => 'e92b2883-583e-4362-8c45-b84da199549c',
}));
describe('AdRecord', () => {

    const validAdRecord = {
        name: '[Test] ad',
        description: 'Test ad description',
        url: 'https://test-ad.com',
        price: 1000,
        lat: 52.2297,
        lon: 21.0122
    };
    it('creates AdRecord with valid data and sets a UUID v4', () => {

        const adRecord = new AdRecord(validAdRecord);
        expect(adRecord.name).toEqual(validAdRecord.name);
        expect(adRecord.description).toEqual(validAdRecord.description);
        expect(adRecord.url).toEqual(validAdRecord.url);
        expect(adRecord.price).toEqual(validAdRecord.price);
        expect(adRecord.lat).toEqual(validAdRecord.lat);
        expect(adRecord.lon).toEqual(validAdRecord.lon);
    });
    it('throws ValidationError for empty name', () => {
        const invalidAdRecord = {...validAdRecord, name: ''};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Name is required and must be less than 100 characters");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for long name', () => {
        const invalidAdRecord = {...validAdRecord, name: 'a'.repeat(101)};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Name is required and must be less than 100 characters");
            } else {
                throw error;
            }
        }
    });
    it('throws ValidationError for invalid price', () => {
        const invalidAdRecord = {...validAdRecord, price: -1};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Price is required and must be greater than 0 and less than 1000000");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for empty description', () => {
        const invalidAdRecord = {...validAdRecord, description: ''};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Description is required and must be less than 1000 characters");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for long description', () => {
        const invalidAdRecord = {...validAdRecord, description: 'a'.repeat(1001)};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Description is required and must be less than 1000 characters");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for negative price', () => {
        const invalidAdRecord = {...validAdRecord, price: -1};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Price is required and must be greater than 0 and less than 1000000");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for too high price', () => {
        const invalidAdRecord = {...validAdRecord, price: 1000001};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("Price is required and must be greater than 0 and less than 1000000");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for empty url', () => {
        const invalidAdRecord = {...validAdRecord, url: ''};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("URL is required and must be less than 1000 characters");
            } else {
                throw error;
            }
        }
    });

    it('throws ValidationError for long url', () => {
        const invalidAdRecord = {...validAdRecord, url: 'a'.repeat(1001)};
        try {
            new AdRecord(invalidAdRecord);
        } catch (error) {
            if (error instanceof ValidationError) {
                expect(error.message).toBe("URL is required and must be less than 1000 characters");
            } else {
                throw error;
            }
        }
    });
    it('return empty Array of ads', async () => {
        const adRecord = await AdRecord.findAll('------------');
        expect(adRecord).toEqual([]);
        expect(adRecord).toHaveLength(0);
    });
    it('return found by of given name', async () => {
        const adRecord = await AdRecord.findAll('testName1088280');
        expect(adRecord).not.toEqual([]);
        expect(adRecord.length).toBeGreaterThan(0);
    })
    it('return Array of all ads', async () => {
        const adRecord = await AdRecord.findAll('testName1088280');
        const referenceObject: SimpleAdEntity = {id: '', lat: 0, lon: 0,};

        adRecord.forEach((item) => {
            Object.keys(referenceObject).forEach((key) => {
                expect(item).toHaveProperty(key);
            });

            // Checking if item does not have extra keys
            Object.keys(item).forEach((key) => {
                expect(referenceObject).toHaveProperty(key);
            });
        });
    });
    it('Insert new Ad and return it with id', async () => {
        const newOne = new AdRecord(validAdRecord);
        await newOne.insert();

        expect(newOne.id).toBeDefined();
        expect(newOne.id).not.toBeNull();
        expect(typeof newOne.id).toBe('string');
        await pool.query("DELETE FROM advertisements WHERE name LIKE '%[Test] ad%'");
    })
    it('check if the inserted Ad is in the database', async () => {
        const newOne = new AdRecord(validAdRecord);
        await newOne.insert();
        if (newOne.id) {
            const Adv = await AdRecord.getAdById(newOne.id)
            expect(Adv).not.toBeNull();
        } else {
            throw new Error('newOne.id is undefined')
        }
    })
});
afterAll(async () => {
    try {
        await pool.query("DELETE FROM advertisements WHERE name LIKE '%[Test] ad%'");
    } catch (error) {
        console.error('Error occurred during cleanup:', error);

        return pool.end();
    }
});