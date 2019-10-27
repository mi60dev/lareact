# Lareact

Laravel + React startup project

## Features
- Login / Register
- Dashboard


## Installation

Clone the repo to `my-project` (or whatever). Run the following set of commands
```cd my-project
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
