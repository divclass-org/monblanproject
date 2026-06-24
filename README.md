# Divclass Gulp Html Setup


## Project Overview

[LIVE ->](app/index.html)

- **Development Setup**: Automates tasks like compiling Sass, using PostCSS for additional optimizations, and enabling hot-reloading with BrowserSync.
- **Tailwind CSS Integration**: Supports optional use of Tailwind CSS.
- **Pug Templating**: Optionally compiles Pug templates into HTML files.
- **Minification and Optimization**: Includes tools like CSSNano and UglifyJS for production builds.
- **Cross-Environment Compatibility**: Uses `cross-env` to manage different environment variables for development and production builds.

## Installation

### Install dependencies

Ensure you have Node.js and npm installed. Then run:

```bash
npm install
```

This will install all necessary dependencies defined in `package.json`.

## Available Scripts

`npm run dev`

Runs the development environment with Gulp, enabling live reloading via BrowserSync and watching for changes in your files.

- Environment: `development`
- Watches Sass, JavaScript, and HTML/PHP files
- Enables browser live reload when changes are detected

`npm run build`

Builds the project for production with optimized files (minified CSS and JavaScript).

- Environment: `production`
- Runs tasks to compile Sass, minify JavaScript, and optimize assets

`npm run dev:tailwindcss`

Runs the development environment with TailwindCSS enabled.

- Environment: `development`
- Enables TailwindCSS compilation alongside standard tasks
- Watches for changes in files and live reloads the browser

`npm run build:tailwindcss`

Builds the project with TailwindCSS for production.

- Environment: `production`
- Optimizes and compiles Sass with TailwindCSS

`npm run dev:pug`

Runs the development environment with **Pug templating** enabled. This will compile Pug files into HTML during development.

- **Environment**: `development`
- **Features**: Compiles Pug templates and watches for changes

`npm run build:pug`

Builds the project for production with **Pug templating** enabled.

- **Environment**: production
- **Features**: Compiles Pug templates into optimized HTML files

`npm run dev:full`

Runs the development environment with **Pug** and **TailwindCSS** enabled.

- **Environment**: development
- **Features**: Compiles Pug templates and TailwindCSS

`npm run build:full`

Builds the project for production with both **Pug** and **TailwindCSS** enabled.

- **Environment**: production
- **Features**: Optimizes and compiles Pug templates and TailwindCSS


## Configuration

The project is configured using a `config.json` file, which contains paths to source and destination folders for the tasks.

Config Directory Structure:


- `tasks_dir`: Directory containing your custom Gulp tasks (default: template-config/tasks).
- `src`: Contains your source files for various assets:
    - `root`: The root project directory (app).
    - `assets`: Folder containing all assets (app/assets).
    - `templates`: Folder containing all pug files.
    - `css`: Directory for compiled CSS files (app/assets/css).
    - `fonts`: Directory for font files (app/assets/fonts).
    - `sass`: Directory for Sass files (app/assets/sass).
    - `js`: Directory for JavaScript files (app/assets/js).
    - `jsLibs`: Directory for external JavaScript libraries (app/assets/js/libs).


## Tasks Overview

Here are the tasks defined in `gulpfile.js`:

- `sass`: Compiles Sass to CSS and includes support for TailwindCSS if enabled
- `mainjs`: Minifies and compiles JavaScript files
- `scripts`: Moves and processes external JavaScript libraries
- `browserSync`: Starts a local server and automatically reloads the browser when changes are made
- `pug`: Compiles Pug templates into HTML files (only runs if USE_PUG=true)
- `pug:watch`: Watches for changes in Pug templates and compiles them into HTML files during development


## Example Gulp Tasks

- `gulp sass`: Compiles Sass to CSS, optionally including TailwindCSS
- `gulp pug`: Compiles Pug templates into HTML
- `gulp browserSync`: Starts the development server and watches for changes
- `gulp mainjs`: Minifies and compiles JavaScript files

These tasks are invoked automatically based on the environment variable set (e.g., USE_PUG=true for Pug or USE_TAILWINDCSS=true for TailwindCSS).


## Dependencies

The following dependencies are included for use in development:

- **PostCSS Plugins**: Autoprefixer, CSSNano, PostCSS Combine Duplicated Selectors, etc.
- **Gulp Plugins**: For tasks like compilation, minification, live reload, and more.
- **TailwindCSS**: For utility-first CSS framework support.
- **Pug**: For templating, converting .pug files into .html files.
