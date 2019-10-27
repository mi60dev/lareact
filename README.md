# Lareact

Laravel + React startup project

## Features
- Login / Register
- Dashboard


Auth included (Passport / React Login pages)


```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache
composer install
cp .env.example .env
php artisan key:generate
php artisan passport:install
npm install
npm start
```
Under question 

php artisan vendor:publish
