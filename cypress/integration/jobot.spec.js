import jobot from "../fixtures/jobot.json"
import selectors from "../Selectors/jobotSelectors.json"
import validation from "../fixtures/Validation.json"


const {invalidEmailId, missingDomain, missingSubDomain, emailId, firstName, lastName,phoneNumber, company, companyWebsite,jobTitle,accounting,Position, ZipCode, Text, emailValidationText, invlidPhoneNumber, invalidZipCode} = jobot
describe('Become a client', () => {
    beforeEach('', () => {
        cy.visit('/become-a-client')
    })

    it('Verify if user is able to submit the form with valid email address', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user should not be able to submit the form with already existing email', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.button(selectors.submitBtn)
        cy.contains(validation.existingEmailMsg)
    })
    it('Verify that user is not able to submit the form with invalid Email address', () => {
        cy.typeInput(selectors.emailAddress, invalidEmailId)
        cy.button(selectors.submitBtn)
        cy.contains(validation.emailFieldValidationMsg)
    })

    it('Verify the missing domain in the email id field.', () => {
        cy.typeInput(selectors.emailAddress, missingDomain)
        cy.button(selectors.submitBtn)
        cy.contains(validation.emailFieldValidationMsg)
    })

    it('Verify the missing subdomain in the email id field.', () => { 
        cy.typeInput(selectors.emailAddress, missingSubDomain)
        cy.button(selectors.submitBtn)
        cy.contains(validation.emailFieldValidationMsg)
    })

    it('Verify if user is able to submit the form without entering first name', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, ' ')
        cy.button(selectors.submitBtn)
        cy.contains(validation.firstNameFieldValidationMsg)
    })

    it('Verify if user is able to submit the form without entering last name', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, ' ')
        cy.button(selectors.submitBtn)
        cy.contains(validation.lastNameFieldValidationMsg)
    })

    it('Verify if user is able to submit the form with valid data', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span ,animation)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it.only('Verify that proper validation messages are generated for all the the required/mandatory fields.', () => {
        cy.button(selectors.submitBtn)
       
            cy.validationMessage(selectors.emailValidationMessage, emailValidationText)
        
        
    })

    it('Verify that user is not able to submit the form, leaving mandetery fields empty', () => {
        cy.button(selectors.submitBtn)
        cy.validationMessage(selectors.emailValidationMessage, emailValidationText)
        
    })

    it('Verify validation on phone No. field by entering alphabets and special characters.', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.phoneNumberField, invlidPhoneNumber)
    })

    it('Verify that entering blank spaces on mandatory fields leads to the validation error.', () => {
        cy.typeInput(selectors.emailAddress, 'test @gmail .com')
        cy.button(selectors.submitBtn)
        cy.contains(validation.validationMsgOnBlankSpaces)
    })

    it('Verify validation on Zipcode by entering alphabets and special characters.', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.zipCodeField, invalidZipCode)
        cy.button(selectors.submitBtn)
        cy.contains(validation.zipCodeValidationMessage)
    })

    it('Verify validation on Zipcode by entering numeric values less than five characters. (if min length is 5)', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.zipCodeField, 123)
        cy.button(selectors.submitBtn)
        cy.contains(validation.zipCodeLessThanFiveCharactersValidation)
    })

    it('Verify validation on Zipcode by entering numeric values more than ten characters. (if max length is 10)', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.zipCodeField, 123456789101)
        cy.button(selectors.submitBtn)
        cy.contains(validation.zipCodeMoreThantenCharactersValidation)
    })

    // If required
    it('Verify that user is not able to submit the form without entering Workphone', () =>{
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
        cy.contains(validation.workPhoneFieldValidation)
    })

    it('Verify that user is not able to submit the form without entering Company', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
        cy.contains(validation.companyFieldValidation)
    })
    it('Verify that user is not able to submit the form without entering Company Website', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
        cy.contains(validation.companyWebsiteFieldValidation)
    })
    
    it('Verify that user is not able to submit the form without entering Your Job Title',() =>{
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span ,accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
        cy.contains(validation.yourJobTitleFieldValidation)
    })
    
    it('Verify that user is not able to submit the form without entering Position', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span ,accounting)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
        cy.contains(validation.positionFieldValidation)
    })

    it('Verify that user is not able to submit the form without entering Zip code', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
        cy.contains(validation.zipCodeFieldValidation)
    })

    it('Verify that user is not able to submit the form without entering Hiring goals', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.button(selectors.submitBtn)
        cy.contains(validation.hiringGoalsValidation)
    })


    //If Optional

    it('Verify that user is able to submit the form without entering Workphone', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user is able to submit the form without entering Company', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user is able to submit the form without entering Company Website', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user is able to submit the form without entering Your Job Title', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user is able to submit the form without entering Position', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user is able to submit the form without entering Zip code', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.button(selectors.remotePosition)
        cy.typeInput(selectors.textArea, Text)
        cy.button(selectors.submitBtn)
    })

    it('Verify that user is able to submit the form without entering Hiring goals', () => {
        cy.typeInput(selectors.emailAddress, emailId)
        cy.typeInput(selectors.firstNameField, firstName)
        cy.typeInput(selectors.lastNameField, lastName)
        cy.typeInput(selectors.phoneNumberField, phoneNumber)
        cy.typeInput(selectors.companyField, company)
        cy.typeInput(selectors.companyWebsiteField, companyWebsite)
        cy.typeInput(selectors.jobTitleField, jobTitle)
        cy.button(selectors.dropDownBtn)
        cy.selectIndustry(selectors.industry, selectors.span, accounting)
        cy.typeInput(selectors.positionField, Position)
        cy.typeInput(selectors.zipCodeField, ZipCode)
        cy.button(selectors.remotePosition)
        cy.button(selectors.submitBtn)
    })

    
})