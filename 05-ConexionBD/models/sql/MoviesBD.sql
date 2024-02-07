create table movies(
id UNIQUEIDENTIFIER PRIMARY KEY  DEFAULT(newid()),
title VARCHAR(255) not NULL,
year int not NULL,
director varchar(255) not NULL,
duration INT NOT NULL,
poster text,
rate DECIMAL(2,1) not NULL
);

create table genre(
    id INT PRIMARY key IDENTITY(1,1),
    name VARCHAR(255) not NULL UNIQUE
);
CREATE TABLE movie_genre(
movie_id UNIQUEIDENTIFIER REFERENCES movies(id),
genre_id  int REFERENCES genre(id),
PRIMARY KEY(movie_id, genre_id)
);

insert into genre(name) VALUES
('Drama'),('Action'),('Crime'),('Adventure'),('Sci-Fi'),('Romance')
INSERT Into movies(id, title,[year], director, duration, poster, rate) VALUES
(default, 'The Shawshank Redemption',1994, 'Frank Darabont',142,'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp',9.3),
(default, 'The Dark Knight',2008, 'Christopher Nolan',152,'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg',9.0),
(default, 'Inception',2010, 'Christopher Nolan',148,'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg',8.8)

insert into movie_genre(movie_id, genre_id) VALUES
((select id from movies where title='Inception'),(select id from genre where name='Drama')),
((select id from movies where title='Inception'),(select id from genre where name='Crime')),
((select id from movies where title='The Dark Knight'),(select id from genre where name='Action')),
((select id from movies where title='The Dark Knight'),(select id from genre where name='Sci-Fi')),
((select id from movies where title='The Shawshank Redemption'),(select id from genre where name='Romance'))

SELECT * from movies where id=convert(uniqueidentifier,'9be45eb7-ff65-4156-bfe3-20daf99c77d3')
SELECT * from movie_genre
SELECT * FROM genre where name='anime';

select distinct m.id, m.title,m.[year],m.director,m.duration,m.rate,poster=CAST(m.poster as varchar(max)),
genre=(select g.name from genre g
INNER JOIN movie_genre mg on g.id=mg.genre_id
WHERE mg.movie_id=m.id
for json PATH
)
from movies m
INNER JOIN movie_genre mg on m.id=mg.movie_id
INNER JOIN genre g ON mg.genre_id=g.id
WHERE g.name='action' 
for  JSON PATH

UPDATE movies
set title='The Shawshank Redemption 3', [year]=1993
where id=CONVERT(uniqueidentifier, '0c5f82d7-83d2-4de0-aab7-daaf2eab58c9')


select * from movies
WHERE id = CONVERT(uniqueidentifier, '2908E95C-A0B7-43DB-9951-6111CC4F8E13')
select * from movie_genre
WHERE movie_id = CONVERT(uniqueidentifier, '2908E95C-A0B7-43DB-9951-6111CC4F8E13')

delete from movies 
where id = CONVERT(uniqueidentifier, '0c5f82d7-83d2-4de0-aab7-daaf2eab58c9')