import request from 'supertest';
import { expect } from 'chai';
import app from '../../server';
import { User } from './user.model';


describe('User', () => {
    after(async () => {
        
    });

    it('should create user', (done) => {
        expect('test').equal('test')
        done()
    });
});

