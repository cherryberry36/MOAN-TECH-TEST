const assert = require("assert")
const { validateSignUpInput, validateSignupInput} = require("../utils/validation")

// describe ("the log question", () => {
//    it ("should save a new question" , () =>{
//     const result = 
//    })
// })
describe("validator isValid()", () => {
	//test a function for a specific case
	it("should return true for a number in between 10 and 70", ()=> {
        const result = validateSignupInput();
       expect  (result) to.be.eq 
	})
	it("should return false when the number is less than or equal to 10", () => {
	})
	it("should return false when the number is greater than or equal to 70", () => {
	})
})