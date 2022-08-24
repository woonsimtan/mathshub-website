# mathshub-website

-- Run Commands --\
**backend:** \
node index.js

**react:** \
cd client \
npm start

**eslint:** \
npx eslint yourfile.js \
npx eslint --fix .\
npx eslint . for a preview

**Database Tables:**\
accounts - CREATE TABLE accounts(id SERIAL PRIMARY KEY, username VARCHAR(30), password VARCHAR(30), role VARCHAR(10));\
students - CREATE TABLE students(id SERIAL PRIMARY KEY, username VARCHAR(30), year_group INT, key_stage INT, tutor VARCHAR(30)); \
attendance - CREATE TABLE attendance (id SERIAL PRIMARY KEY, username VARCHAR(30), date DATE, attended VARCHAR(1), comment VARCHAR(250)); \
tutors - CREATE TABLE tutors (id SERIAL PRIMARY KEY, username VARCHAR(30), start_date DATE, under18 BOOLEAN);
