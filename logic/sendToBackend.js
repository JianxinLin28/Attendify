// This file is for all the functions that will help sending data to the Backend
// and also receiving data from the Backend

//Please change localhost to your device IP
apiUrl = 'http://localhost:8080/'

export function sendLoginCred (userData){
  // Use fetch API to send the user data to the backend

  return fetch(apiUrl + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      if (data["message"] === "Login Successful") {
        console.warn("Login Successful")
        return true;
      } 
      else
      {
        
        onChangeErrorText(data["message"]);
        return false;
      }
    })
    .catch(error => {
      // If there is any error during the communication with the backend, show it to the user
      //console.log(error)
      console.warn('Login Unsuccessful');
      return [error["message"]]
    });

}

//This function is to send SignUp credentials to the Backend and register a user.

export function sendSignUpCred (userData){
    // Use fetch API to send the user data to the backend

    return fetch(apiUrl + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => response.json())
  
  }

