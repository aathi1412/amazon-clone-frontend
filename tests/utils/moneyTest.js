import { currencyFormat } from "../../scripts/utils/money.js";

describe('test suite: currencyFormat', () => {
    it('converts cents into dollars', () => {
        expect(currencyFormat(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(currencyFormat(0)).toEqual('0.00');
    });

    it('rounds up to nearest value', () => {
        expect(currencyFormat(2000.5)).toEqual('20.01');
    });

    it('rounds down to nearest value', () => {
        expect(currencyFormat(2000.4)).toEqual('20.00');
    });

    it('works with negative number', () => {
        expect(currencyFormat(-5)).toEqual('-0.05');
    });
});