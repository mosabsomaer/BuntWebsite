import Validations from './Validations';

export default class SignupValidations {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    checkValidations() {
        let errors = [];

        //username validations
        if (!Validations.checkusername(this.username)) {
            errors['username'] = 'Invalid Username';
        }

        //password Validations
        if (!Validations.minLength(this.password, 8)) {
            errors['password'] = 'password should be of 8 characters';
        }

        return errors;
    }

    static getErrorMessageFromCode(errorCode) {
        console.log(errorCode);
        switch (errorCode) {
            case 'username & Password does not match with our record.':
                return 'Credentials dont match.';
            default:
                return errorCode;;
        }
    }
}
