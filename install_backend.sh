# First do this
# cp .env.example .env
# Change DB name, username and password in .env
# Create DB

composer install &&
php artisan key:generate &&
php artisan storage:link &&
php artisan migrate &&
php artisan serve