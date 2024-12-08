export const nameValidation=(name)=>{
    const nameRegex= /^[a-zA-Z\s]{5,}$/
    if(!nameRegex.test(name)){
        return "Name must be at least 5 characters long and contain only alphabets.";
    }
    return null
}

export const phoneValidation = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    if (!phoneRegex.test(phone)) {
      return "Phone number must be 10 digits long.";
    }
    return null;
  };


  export const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/; 
    if (!passwordRegex.test(password)) {
      return "Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    return null;
  };