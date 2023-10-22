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
Start by running this command in the terminal:
```
npm install
```
Then
```
npm start
```
Now you should see the QR code along with many instructions. The next thing to do
is to follow the "How to run the app?" section.

## Uploading to sub-branches
Remember, whenever you upload a project, **delete the node_modules file**.
Also, **delete the ios file and android file**. They are huge!
After done that, name your project to 'Attendify_Student' and upload.
**Do not** directly upload to other people's branch without their permission.

## How to contribute to our development?
### Understanding the structure
We will be mostly following the interface designs from this figma page:
https://www.figma.com/file/l5uew2GAntMmYJgnwMoHcD/Attendify-Student?type=design&node-id=1669%3A162202&mode=design&t=CWdsPYv5Xxg4tlXk-1

For screen navigations, we plan to use the stack navigator library by React Native.
Tutorial I wrote:
https://docs.google.com/document/d/1_EzUmDY-dMop2H4Ky1Bvnebc8gwR2QuCnwDDyu6vWHQ/edit?usp=sharing

### Project UI structure (Navigation)
First of all, everything originates from App() function in the App.js file. 
(Very) general structure
```
<NavigationContainer>
   <Stack.Navigator>
      <Stack.Screen login page>
      <Stack.Screen signup page>
      <Stack.Screen bottom tab>

<Stack.Screen bottom tab>
   <Tab.Navigator>
      <Tab.Screen bluetooth page>
      <Tab.Screen camera page>
      <Tab.Screen course page>
      <Tab.Screen clicker page>
      <Tab.Screen profile page>
```
There is only one Navigation Container across the entire app.
Inside of it, there is navigator. We have two navigators here: Stack and Tab.
Notice that Tab is a nested navigator of Stack. (inside of Stack)
The Tab is also equivalent to 'bottom tab'. If you have took a look on my
figma design, you will know what I mean. I decided to put the bottom tab 
as a "page" of the main Stack because it seems to be easier to manage in
this way. The login page and the signup page do not have bottom tab. 

### Coding practice
1. Always including things in a SafeAreaView. This makes sure the app looks good on
every iOS devices.
2. Be sure all your logs can be disabled in some way.
3. Name all your folders starting with a lower case letter, i.e. **stardewValley**
4. Name all js and ts files with the Pascal Case style, i.e. **MyDude.js** and **YuGiOh.ts**
5. For system generated files, please leave it as it is.
6. The use of StyleSheet: for each page, please make it its own file,
   and concentrate styles as much as possible.
7. Your Component functions all start with capital letters!
8. Almost all other functions start with lower letters!
9. One file === one page || One file === one functionality

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

## Deploy to iOS
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
   
