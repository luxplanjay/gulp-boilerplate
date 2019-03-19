# Gulp Starter Kit - basic boilerplate

![banner.png](https://i.ibb.co/2tX2gRk/banner.png)

- Able to assemble _html, sass, images, fonts_
- Uses gulp-rigger to include html-chunks
- Generates _svg sprite_
- Uses _stylelint_ to lint _scss_
- All errors are printed to the console
- Adds vendor prefixes
- Optimizes images
- Merges same media queries
- Minifies build files

## Warning

If you are a Windows user please execute this command in your terminal

```plain
npm install --global windows-build-tools
```

If you are a Linux user please execute this command in your terminal

```plain
sudo apt-get install gcc g++ make
```

## How to use

- Download, clone or fork this repo
- In terminal, navigate to the repo's root folder
- Run `npm install`, this will install all dependencies and get rid of junk files
- After all deps are installed, start developement with `npm start`
- Executing `npm run build` will prepare your project for deployment
- Executing `npm run sprite` will rebuild svg sprite
- Executing `npm run images` will rebuild non sprite images

## Folders

- Put all styles in `src/sass` and import everything in `styles.scss`
- Put images in `src/images` folder
- If you need a svg sprite, put all svg files in `src/images/icons`, while naming them `icon-[name].svg`. Filename will be used as a symbol `id`
- Put fonts in `src/fonts` folder
- Pull all html chunks to be processed by rigger in `src/html`

## Updates and bugs

If you've found a bug or would like to propose an update, make a fork of this repo and open a pull request with some comments about an update. Thx!
