const sourceFolder = 'src';
const distFolder = 'dist';

const paths = {
    sourceFolder,
    distFolder,
    src: {
        html: `${sourceFolder}/*.html`,
        css: `${sourceFolder}/sass/main.scss`,
        js: `${sourceFolder}/js/**/main.js`,
        images: [
            `${sourceFolder}/images/**/*.{png,jpg,jpeg,webp,svg}`,
            `!${sourceFolder}/images/svg-sprite/**/*.svg`,
        ],
        sprite: `${sourceFolder}/images/svg-sprite/**/*.svg`,
        fonts: `${sourceFolder}/fonts/**/*.{woff,woff2}`,
    },
    watch: {
        html: `${sourceFolder}/**/*.html`,
        css: `${sourceFolder}/sass/**/*.scss`,
        js: `${sourceFolder}/js/**/*.js`,
        images: [
            `${sourceFolder}/images/**/*.{png,jpg,jpeg,webp,svg}`,
            `!${sourceFolder}/images/svg-sprite/**/*.svg`,
        ],
        sprite: `${sourceFolder}/images/svg-sprite/**/*.svg`,
        fonts: `${sourceFolder}/fonts/**/*.{woff,woff2}`,
    },
    dist: {
        html: `${distFolder}`,
        css: `${distFolder}/css`,
        js: `${distFolder}/js`,
        images: `${distFolder}/images`,
        fonts: `${distFolder}/fonts`,
    },
    inject: {
        html: `${distFolder}/index.html`,
        css: `${distFolder}/css/**/*.css`,
        js: `${distFolder}/js/**/*.js`,
    },
    clean: `${distFolder}`,
};

export default paths;
