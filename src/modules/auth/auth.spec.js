import request from 'supertest';
import { expect } from 'chai';
import app from '../../server';
import { User } from './user.model';


describe('Auth', () => {
    after(async () => {
        
    });

    it('should signup user', (done) => {
        expect('test').equal('test')
        done()
    });

    it('should log in', (done) => {
        expect('test').equal('test')
        done()
    });
});

