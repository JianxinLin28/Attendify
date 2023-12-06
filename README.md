## How to get Aadi's part of code running >

1. Change the IP address to your own computers since the code is still running local.
2. Go to Screens/LoginPage.js
3. Go to line 152 and add your device ip address http://localhost:8080/login instead of localhost
4. Do the same at line 191 in Screens/SignUpPage.js
5. Now you can run Aadi's code on your device. 

## How to render app with Backend running on same device >

1. Download Backend code from Powall's or Ishan's branch
2. Open Backend code and run **npm install**
3. If your device is a mac, you need to uninstall bcrypt as you will face a compatibility issue as the backend was developed on windows laptops. 
   a. Run **npm uninstall bcrypt**
   b. Then run **npm install bcrypt**
4. Once this is done, you can run the Backend code by running **npm start**
5. Now, open the frontend code and run **npm start**
6. After scanning the qr, the expo go app should render the Attendify app. 

Here is an existing account for testing purpose:
Email: test@umass.edu
Password: test


