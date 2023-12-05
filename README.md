# Welcome to the Attendify Mobile front-end development
**Please treat this branch like a main branch.
If you want to contribute, create a new branch and make
its source to this branch!**

Developer: Jianxin Lin & Aadi Deshmukh

## What we are using?
We are using React Native Expo framework to develop & deploy our app!
If you don't have any experience and you want to try out Expo, you can
start by using command:
```
npx create-expo-app --template
```
The command will create an Expo managed project for you, then choose 
the blank templet and name your project. The templet can be the
foundation of your app and it can also be used for quick experiments.
Also, remember to change directory to the newly created folder.

## How to run the app?
If you want to run your app, use command:
```
npm start
```
Expo will generate a QR code, along with many other instructions.
It is highly recommended to use the QR code approach because 
it is easy and has no overhead. To use the QR code, first, download
the "Expo go" App. The app can be found in both Apple Store and Google Play.
Second, use your camera to scan the QR code. You will be redirected to
"Expo go" and your project will be opened on your phone.

Of course, you can use the mobile simulators too. There are only two you need to know.
Pressing 'i' will open an iOS simulator. Pressing 'a' will open an Android simulator. 

## Installing our project
Download the project as a zip file and unzip it. Change directory to the unzip folder,
then run the app by following the above instruction "How to run the app?"

## How to contribute to our development?
### Understanding the structure
We will be mostly following the interface designs from this figma page:
https://www.figma.com/file/l5uew2GAntMmYJgnwMoHcD/Attendify-Student?type=design&node-id=1669%3A162202&mode=design&t=CWdsPYv5Xxg4tlXk-1

For screen navigations, we plan to use the stack navigator library by React Native.
Tutorial I wrote:
https://docs.google.com/document/d/1_EzUmDY-dMop2H4Ky1Bvnebc8gwR2QuCnwDDyu6vWHQ/edit?usp=sharing

### Coding practice
1. Always including things in a SafeAreaView. This makes sure the app looks good on
every iOS devices.
2. Be sure all your logs can be disabled in some way.
3. Name all your folders starting with a lower case letter, i.e. **stardewValley**
4. Name all other files with the Pascal Case style, i.e. **MyDude.js**
5. Make use of style sheets, do avoid extensive inline style. 

## Troubleshooting
### Asset bundle works on an iOS simulator but not a real iOS device
This issue could happen due to various reasons. The one bothered me was my naming
of file path. You should not include space in any file that is in the path of your
project. So, instead of "CS 320", name it to "CS_320".

### My custom font does not work on a real iOS device
We discourage you to add other custom fonts to this project.
The configuation of a new font can be tedious and I do not intend to add others.
The main reason being Apple is using the font family name and Android is using the file
name. 

### Troubleshooting on a real iOS device as an App
This following steps will only work if you have XCode. 
[Warning: XCode is very large]
1. Run this command in the project directory
   ```
   npx expo run:ios
   ```
   This will create an iOS folder for the app. If the project already has it you
   don't have to run this command.
2. Open the iOS folder in XCode. If you have not worked with XCode before, start
   by creating an developer account using your Apple Store account.
3. Allow 'Developer Mode' on your iPhone by going to 'Setting -> Privacy & Security
   -> Developer Mode'. Turn on the developer mode, but remember **your iOS device
   might be vunlnerable to certain attacks if this mode is opened**. Your iOS device
   will be forced to restart and you will be asked to turn on developer mode.
4. With 'Developer Mode', you will be allowed to create a _real App_ on your iOS device.
   This is very similar to using Swift and Object-C. First, you need to connect your mobile
   device to your Mac via a USB cable. Your mobile device will be asked to trust your Mac.
   Second, in XCode, select your simulator device to your device (not a simulator).
   Third, click the run button in XCode to run the App. After these three steps, a real app
   will be created. Before opening it, you need to trust yourself on your mobile device.
   To do that, go to "Setting -> General -> VPN&Device Management" and trust Attendify.
5. Now you can open the app. With this approach, your app will have absolutely zero overhead
   and it is equivalent to the Apps deployed in App Store.

## How to get Backend code running on Mac

1. Download Backend code zip from github
2. Run npm install once in Backend folder
3. Run  npm uninstall bcrypt
4. Then run npm install bcrypt
5. Now you should be able to run the code on a mac.
6. If you're still facing trouble, remove all cache during start by running npm start -c

   
## How to get Aadi's part of code running >

1. Change the IP address to your own computers since the code is still running local.
2. Go to Screens/LoginPage.js
3. Go to line 152 and add your device ip address http://localhost:8080/login instead of localhost
4. Do the same at line 191 in Screens/SignUpPage.js
5. Now you can run Aadi's code on your device. 

   

   
