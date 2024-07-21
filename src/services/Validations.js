export default class Validations {
    static checkusername(username) {
      // Modify the validation logic for usernames
      if (/^[a-zA-Z0-9_]+$/.test(username)) {
        return true;
      }
      return false;
    }

    static minLength(name, minLength) {
        if (name.length < minLength) {
            return false;
        }
        return true;
    }
}
