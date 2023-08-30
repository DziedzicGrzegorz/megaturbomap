import {AdRecord} from "../record/record";
import {ValidationError} from "../utils/erros";
jest.mock('uuid', () => ({
    v4: () => '1234567891',
}));
describe('AdRecord', () => {

    const validAdRecord = {
        name: 'Test ad',
        description: 'Test ad description',
        url: 'http://test-ad.com',
        price: 1000,
        lat: 52.2297,
        lng: 21.0122
    };
    it('creates AdRecord with valid data and sets a UUID v4', () => {

        const adRecord = new AdRecord(validAdRecord);
        expect(adRecord.name).toEqual(validAdRecord.name);
        expect(adRecord.description).toEqual(validAdRecord.description);
        expect(adRecord.url).toEqual(validAdRecord.url);
        expect(adRecord.price).toEqual(validAdRecord.price);
        expect(adRecord.lat).toEqual(validAdRecord.lat);
        expect(adRecord.lng).toEqual(validAdRecord.lng);

        // Use a regular expression to validate UUID v4.

        expect(adRecord.id).toEqual('1234567891');
    });
    it('creates AdRecord with valid data', () => {
        const adRecord = new AdRecord(validAdRecord);
        expect(adRecord.name).toEqual(validAdRecord.name);
        expect(adRecord.description).toEqual(validAdRecord.description);
        expect(adRecord.url).toEqual(validAdRecord.url);
        expect(adRecord.price).toEqual(validAdRecord.price);
        expect(adRecord.lat).toEqual(validAdRecord.lat);
        expect(adRecord.lng).toEqual(validAdRecord.lng);
    });

    it('throws ValidationError for empty name', () => {
        const invalidAdRecord = { ...validAdRecord, name: '' };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for long name', () => {
        const invalidAdRecord = { ...validAdRecord, name: 'a'.repeat(101) };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for empty description', () => {
        const invalidAdRecord = { ...validAdRecord, description: '' };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for long description', () => {
        const invalidAdRecord = { ...validAdRecord, description: 'a'.repeat(1001) };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for negative price', () => {
        const invalidAdRecord = { ...validAdRecord, price: -1 };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for too high price', () => {
        const invalidAdRecord = { ...validAdRecord, price: 1000001 };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for empty url', () => {
        const invalidAdRecord = { ...validAdRecord, url: '' };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });

    it('throws ValidationError for long url', () => {
        const invalidAdRecord = { ...validAdRecord, url: 'a'.repeat(1001) };
        expect(() => new AdRecord(invalidAdRecord)).toThrow(ValidationError);
    });
    
});