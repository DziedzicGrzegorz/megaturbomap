import {AdRecord} from "../record/record";
import {pool} from "../utils/db";

describe('AdRecordStatic', () => {
    it('should return a data from base', async () => {

        const ad = await AdRecord.getAdById('5518d92b-e383-4da6-9a83-82b610a13b48');

        expect(ad).toBeDefined();
        expect(ad?.description).toEqual('asdasdasd');
        expect(ad?.name).toEqual('asdasdasda');

    });
    it('null if no data', async () => {

            const ad = await AdRecord.getAdById('b0154d82-1953-4fad-afda-50c7a9dc1910');

            expect(ad).toBeNull();

    });

})
afterAll(() => {
    return pool.end();
});