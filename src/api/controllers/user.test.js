// const {expect, jest, test} = require( '@jest/globals');
const { register } = require("./user");
// import db from "../../database/index.js";
// import jwt from "jsonwebtoken";
// import bcryt from "bcryptjs";
// import {
//   validateEmailOrContact,
//   validatePassword,
//   validateContact,
//   validateEmail,
// } from "../../utils/validation.js";
// import { decrypt } from "dotenv";

jest.mock('bcryptjs', ()=>{
    AES:{
        bcryt: jest.en.fn().mockReturnValue('bcrypted_password')
    }
})

describe('register',()=>{
    test('create new user and return it',async()=>{
        const req = {
            body: {
                username:'testuser',
                email: 'testuser@example.com',
                password: 'test@123',
                contact: '1236547892'
            }
        }
        const saveMock = jest.fn().mockResolvedValue({
            _id:'id',
            username: req.body.username,
            email: req.body.email,
            contact: req.body.email
        })
        user.mockReturnValue({save : saveMock})

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await register(req, res)
        
        expect(user).toHaveBeenCalledTimes(1);
        expect(user).toHaveBeenCalledWith({
            username: req.body.username,
            email: req.body.email,
            password: 'bcrypted_password',
            contact: req.body.contact
        })
    })
})

// test('user registertion', () => {
//     expect().toBe()
// })
