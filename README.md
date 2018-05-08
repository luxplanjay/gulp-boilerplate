# Gulp Starter Kit - basic gulp boilerplate

![banner.png](https://cdn.rawgit.com/axZerk/gulp-starter-kit/741020f0/banner.png)

* Able to assemble _html, sass, images, fonts_
* Uses gulp-rigger to include html-chunks
* Generates _svg sprite_
* Uses _stylelint_ to lint _scss_
* All errors are printed to the console
* Adds vendor prefixes
* Optimizes images
* Merges same media queries
* Minifies build files

## Node version

**[LTS version](https://nodejs.org/en/) of NodeJS is required**

## Warning

* If you are a Linux user please execute this command in your terminal

  **sudo apt-get install gcc g++ make**

* If you are a Windows user please execute this command in your terminal

  **npm install --global --production windows-build-tools**

## How to use

* Download, clone or fork this repo
* In terminal, navigate to the root folder
* Run **npm i**, this will install all dependencies and get rid of junk files
* After all deps are installed, start developement with **npm start** command
* **npm run build** will prepare your project for deployment
* Running **npm run svg-sprite** will rebuild svg sprite
* Running **npm run images** will rebuild non sprite image files

## Folders

* Put all styles in **src/scss** and import everything in **styles.scss**
* Put images in **src/img** folder
* If u need svg sprite, put all svg files in **src/img/sprite**
* All fonts need to go in **src/fonts** folder
* Pull all html chunks to be processed by rigger in **src/html**

## Updates/Bugs

If you've found a bug or would like to propose an update, make a fork of this repo and open a pull request with some comments about an update.
