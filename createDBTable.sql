create table Artist
(
	artistId int auto_increment
		primary key,
	artistName varchar(50) not null,
	artistDescription varchar(6000) null
);

create table Band
(
	bandId int auto_increment
		primary key,
	bandName varchar(50) not null
);

create table ArtistXBand
(
	startDate year not null,
	endDate year null,
	artistId int not null,
	bandId int not null,
	primary key (artistId, bandId),
	constraint ArtistXBand_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint ArtistXBand_Band_bandId_fk
		foreign key (bandId) references Band (bandId)
);

create table Concert
(
	concertId int not null,
	concertName varchar(50) not null,
	concertLocation varchar(50) not null,
	concertYear int not null,
	primary key (concertId, concertYear)
);

create table Genre
(
	genreId int not null
		primary key,
	genreName varchar(50) not null,
	genreDescription varchar(6000) null
);

create table Label
(
	labelId int not null
		primary key,
	labelName varchar(50) not null
);

create table Album
(
	albumName varchar(50) not null,
	albumId int not null
		primary key,
	albumDescription varchar(6000) null,
	albumImage varbinary(6000) null,
	labelId int null,
	constraint Album_Label_labelId_fk
		foreign key (labelId) references Label (labelId)
);

create table ArtistXAlbum
(
	albumId int not null,
	artistId int not null,
	primary key (albumId, artistId),
	constraint ArtistXAlbum_Album_albumId_fk
		foreign key (albumId) references Album (albumId),
	constraint ArtistXAlbum_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId)
);

create index ArtistXAlbum_albumId_index
	on ArtistXAlbum (albumId);

create table BandXAlbum
(
	bandId int not null,
	albumId int not null,
	primary key (albumId, bandId),
	constraint BandXAlbum_Album_albumId_fk
		foreign key (albumId) references Album (albumId),
	constraint BandXAlbum_Band_bandId_fk
		foreign key (bandId) references Band (bandId)
);

create index BandXAlbum_albumId_index
	on BandXAlbum (albumId);

create index BandXAlbum_bandId_index
	on BandXAlbum (bandId);

create table ConcertXLabel
(
	concertId int not null,
	labelId int not null,
	primary key (concertId, labelId),
	constraint ConcertXLabel_Concert_concertId_fk
		foreign key (concertId) references Concert (concertId),
	constraint ConcertXLabel_Label_labelId_fk
		foreign key (labelId) references Label (labelId)
);

create table Playlist
(
	playlistId int not null
		primary key,
	playlistName varchar(50) not null,
	playlistDescription varchar(6000) null
);

create table Song
(
	songTitle varchar(50) not null,
	songDuration time not null,
	songLyrics text null,
	songId int not null
		primary key,
	genreId int not null,
	albumId int null,
	constraint Song_Album_albumId_fk
		foreign key (albumId) references Album (albumId),
	constraint Song_Genre_genreId_fk
		foreign key (genreId) references Genre (genreId)
);

create table ConcertXSongs
(
	concertId int not null,
	songId int not null,
	primary key (concertId, songId),
	constraint ConcertXSongs_Concert_concertId_fk
		foreign key (concertId) references Concert (concertId),
	constraint ConcertXSongs_Song_songId_fk
		foreign key (songId) references Song (songId)
);

create table PlaylistXSong
(
	playlistId int not null,
	songId int not null,
	primary key (playlistId, songId),
	constraint PlaylistXSong_Playlist_playlistId_fk
		foreign key (playlistId) references Playlist (playlistId),
	constraint PlaylistXSong_Song_songId_fk
		foreign key (songId) references Song (songId)
);

create index PlaylistXSong_playlistId_index
	on PlaylistXSong (playlistId);

create table SongXArtist
(
	songId int not null,
	artistId int not null,
	primary key (songId, artistId),
	constraint SongXArtist_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint SongXArtist_Song_songId_fk
		foreign key (songId) references Song (songId)
);

create table concertXArtist
(
	artistId int not null,
	concertId int not null,
	mainPerformer tinyint(1) null,
	openerPerformer tinyint(1) null,
	primary key (concertId, artistId),
	constraint concertXArtist_Artist_artistId_fk
		foreign key (artistId) references Artist (artistId),
	constraint concertXArtist_Concert_concertId_fk
		foreign key (concertId) references Concert (concertId)
);

create index concertXArtist_concertId_index
	on concertXArtist (concertId);

