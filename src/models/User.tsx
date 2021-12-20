class User {
  email: string;
  password: string;
  name: string;
  surname: string;
  currency: string;
  isLoggedIn: boolean = false;

  constructor(email: string, password: string, name: string, surname: string, currency: string) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.currency = currency;
  }
}

export default User;

export const getEmptyUser = (): User => {
  return new User('', '', '', '', '');
};
