# Lareact

Laravel + React startup project. 

*This project is intended to be used for large & scalable platforms, built with Laravel and React JS / React Native.
*

This project will help you start developing your app right away. It contains the most basic front-end and back-end features to start developing platform based on Laravel and React JS. (back-end in development)



## Features

### Backend
- Login / Register
- Dashboard
- Translations
### Frontend
- Sass
- Transitions









## Installation

Clone the repo to `my-project` (or whatever). Run the following set of commands
```
cd my-project
```
```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache
composer install
cp .env.example .env
vim .env
```
Add your database configs. Then run
```
php artisan key:generate
php artisan passport:install
npm install
npm start
```


## To Do

- Finish React Authentication process

- Create backend migrations / models
- Create React Native alternative version


## Conclusion
This project is just starting. Feel free to contribute to this project
