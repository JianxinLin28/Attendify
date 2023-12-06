## How to get Aadi's part of code running >

1. Change the IP address to the wifi network you are using
    since the code is still running local.

   > If you are using Mac, Click on the apple icon located on
   the top left corner of the screen -> Click 'System Settings...'
   -> Click 'Wi-Fi' -> Click 'Details' button next to the network
   you are using -> You will see your network's IP address.
3. Go to Screens/LoginPage.js
4. Go to line 152 and replace the part of string 'localhost' in
   http://localhost:8080/login with the ip address you just got.
   > For example: http://888.88.88.888:8080/login
5. Do the same at line 191 in Screens/SignUpPage.js
6. Now you still have to connect to the backend first
   before you can run Aadi's code. See below.

## How to render app with Backend running on same device >

1. Download Backend code from Powall's or Ishan's branch
2. cd to the Backend directory and run **npm install** 
3. If your device is a mac, you need to reinstall bcrypt as you will
   face a compatibility issue as the backend was developed on windows laptops. 
   > Step 1: Run **npm uninstall bcrypt**
   > 
   > Step 2: Then run **npm install bcrypt**
6. Once this is done, you can run the Backend code by running **npm start**
   > To verify your action was successful, you should see log message:
   > 'Successfully connected to MongoDB Atlas!'
7. Now, We will get back to the frontend code:
   > Step 1: Open Attendify-Aadi folder in your code editor, make sure you go to the
   > Attendify-Aadi directory inside the Attendify-Aadi folder (They have the same name).
   > You can verify that you are in the right directory by using the 'ls' command,
   > you should see at least 15+ items, not just two.
   >
   > Step 2: Enter **npm install** command
   >
   > Step 3: Enter **npm start** command
   >
   > Note: If for some reason you get a bunch of errors indicating there is no
   > permission. Use 'sudo npm install' or 'sudo npm start' instead. You will
   > have to enter your computer's password after that and everything should
   > work normally.
8. Verify that you are doing well by checking if there is a QR code generated
   by expo. You can use your camera (iPhone) to scan this code directly or
   using the 'expo go' app's scanning (Android) to scan this code.
9. After you have scanned the code, the Attendify app should be rendered in
   the 'expo go' app.


## Here is an existing account for testing purpose:

Email: test@umass.edu

Password: test


