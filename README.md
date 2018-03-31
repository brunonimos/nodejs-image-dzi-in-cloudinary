=============Upload Tiled Sources images with sharp for Node.js=============

##Name

-nodejs-dzi-in-cloudinary.

##Description

-It uploads dzi images with tiled sources in cloudinary then works with a modified openseadragon.js plugin.

##Version

-1.0.0.

##Setup

-If your server don't use https, delete htaccess file and lines from 13 until 23 in server.js file;

-Replace all 'your server url' expressions in js with your url;

##Know bugs

-After uploading, reload once more to see all images over caroulsel. Perhaps this delay will be fixed in future versions.

##Requirements

=======================================

-Server

 -Node 6.11.1;

=======================================

-Node js plugins

 -ejs;
 
 -express;
 
 -body-parser;
 
 -pg;
 
 -sharp;
 
 -rmdir;
 
 -fs-extras;
 
 -multer;
 
 -cloudinary.

=======================================

-Javascript plugins

 -Angular.js;
 
 -Jquery;
 
 -Owl.caroulsel;
 
 -Openseadragon.

=======================================

-CSS plugins

 -Owl.caroulel;
 
 -Animate (optional);
 
 -Material Icons (Optional).

=======================================

-ENV Variables

 -Cloudinary;
 
  -CLOUDINARY_KEY;
  
  -CLOUDINARY_NAME;
  
  -CLOUDINARY_SECRET;
  
  -CLOUDINARY_URL.
  
 -PostGreSQL;
 
  -PGDATABASE.
  
  -PGHOST;
  
  -PGHOSTADDR;
  
  -PGHOST;
  
  -PGHOSTADDR;
  
  -PGPASSWORD;
  
  -PGPORT;
  
  -PGUSER;
  
  -PGOPTIONS.

=======================================

-Database PostGreSQL (by example, created with ElephantSQL service and managed with PostGRE Admin 4)

Table: content

-titulo, Length 50, Not Null, Primary key, VARCHAR,

-autor, Not Null, VARCHAR,

-date, Default value:now(), Not Null, TIMESTAMP WITHOUT TIME ZONE

Table: multimidia

-link, Not Null, Primary key, VARCHAR,

-titulo, Length 50, Not Null, VARCHAR,

-name, Not Null, VARCHAR,

-extension, Length 5, Not Null, VARCHAR,

-autor, Not Null, VARCHAR,

-subject, Not Null, VARCHAR,

-creator, Not Null, VARCHAR,

-date, Default value:now(), Not Null, TIMESTAMP WITHOUT TIME ZONE

=======================================

##License

-MIT;

-All plugins are distributed with Free License, MIT License or Apache License and it can be found in ./doc.

##Author of this package

-Bruno Henrique Ferreira de Oliveira