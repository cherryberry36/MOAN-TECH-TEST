process.env.NODE_ENV = 'test'
const mongoose = require('mongoose')
const chai = require('chai')
const { logquestion } = require("../controller/questionController")
const chaiHttp = require('chai-http');
// const server = require('../server');
// const should = chai.should();
 
describe ("the log question", () => {
   it("should return an object", ()=> {
	const result = logquestion()
		assert.equal(
			result, 
		{})
	})
   })

