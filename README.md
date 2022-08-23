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
accounts - CREATE TABLE accounts( id SERIAL PRIMARY KEY, username VARCHAR(260), password VARCHAR(260), year_group INT, key_stage INT, tutor VARCHAR(260) );  \
accounts - CREATE TABLE accounts(id SERIAL PRIMARY KEY, username VARCHAR(30), password VARCHAR(30));\
students - CREATE TABLE student(id SERIAL PRIMARY KEY, username VARCHAR(30), year_group INT, key_stage INT, tutor VARCHAR(30)); \
attendance - CREATE TABLE attendance (id SERIAL PRIMARY KEY, username VARCHAR(30), date DATE, attended VARCHAR(1), comment VARCHAR(250));
