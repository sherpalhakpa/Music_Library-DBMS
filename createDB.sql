create schema music_db collate utf8mb4_0900_ai_ci;

create table Album
(
	albumId int auto_increment
		primary key,
	albumName varchar(20) not null,
	albumDescription text null,
	albumImage varbinary(6000) null
);

create table Artist
(
	artistId int auto_increment
		primary key,
	artistName varchar(50) not null,
	artistDescription text null
);

create table Band
(
	bandId int auto_increment
		primary key,
	bandName varchar(20) not null
);

create table ArtistXAlbumXBand
(
	artistXAlbumXBand int auto_increment
		primary key,
	albumId int not null,
	artistId int not null,
	bandId int not null,
	constraint ArtistXAlbumXBand_Album_albumId_fk
		foreign key (albumId) references Album (albumId),
	constraint ArtistXAlbumXBand_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint ArtistXAlbumXBand_Band_bandId_fk
		foreign key (bandId) references Band (bandId)
);

create table ArtistXBand
(
	artistXBandId int auto_increment
		primary key,
	startDate date not null,
	endDate date null,
	artistId int not null,
	bandId int not null,
	constraint ArtistXBand_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint ArtistXBand_Band_bandId_fk
		foreign key (bandId) references Band (bandId)
);

create table Genre
(
	genreId int auto_increment
		primary key,
	genreName varchar(50) not null,
	genreDescription text null
);

create table Label
(
	labelId int auto_increment
		primary key,
	labelName varchar(50) not null
);

create table Playlist
(
	playlistId int auto_increment
		primary key,
	playlistName varchar(50) not null,
	playlistDescription text null
);

create table Song
(
	songId int auto_increment
		primary key,
	songTitle varchar(50) not null,
	songDuration time not null,
	songLyrics text null,
	albumId int not null,
	artistId int not null,
	genreId int not null,
	constraint Song_Album_albumId_fk
		foreign key (albumId) references Album (albumId),
	constraint Song_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint Song_Genre_genreId_fk
		foreign key (genreId) references Genre (genreId)
);

create table `Order`
(
	orderId int auto_increment
		primary key,
	playlistId int not null,
	songId int not null,
	constraint Order___fk1
		foreign key (playlistId) references Playlist (playlistId),
	constraint Order___fk2
		foreign key (songId) references Song (songId)
);

create table Venue
(
	venueId int auto_increment
		primary key,
	location varchar(30) not null,
	description text not null
);

create table Concert
(
	concertId int auto_increment
		primary key,
	concertDate date null,
	openerPerformer tinyint(1) null,
	mainPerformer tinyint(1) null,
	venueId int not null,
	constraint Concert_Venue_venueId_fk
		foreign key (venueId) references Venue (venueId)
);

create table ConcertXSongs
(
	concertXSongsId int auto_increment
		primary key,
	concertId int not null,
	songId int not null,
	constraint ConcertXSongs_Concert_concertId_fk
		foreign key (concertId) references Concert (concertId),
	constraint ConcertXSongs___fk2
		foreign key (songId) references Song (songId)
);

create table Recorded
(
	recordedId int auto_increment
		primary key,
	concertId int not null,
	labelId int not null,
	constraint Recorded_Concert_concertId_fk
		foreign key (concertId) references Concert (concertId),
	constraint Recorded_Label_labelId_fk
		foreign key (labelId) references Label (labelId)
);

create table concertXArtist
(
	concertXArtistId int auto_increment
		primary key,
	artistId int not null,
	concertId int not null,
	constraint concertXArtist_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint concertXArtist_Concert_concertId_fk
		foreign key (concertId) references Concert (concertId)
);
