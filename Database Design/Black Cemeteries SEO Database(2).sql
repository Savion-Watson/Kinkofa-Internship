CREATE TABLE `Grave` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `person_id` int,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `birthYear` int(4),
  `deathYear` int(4),
  `cemetery_id` int,
  `cremated` bool,
  `unmarked` bool COMMENT 'If unmarked, graves should have an empty or numbered name'
);

CREATE TABLE `GraveDetails` (
  `id` int,
  `birthDate` datetime,
  `deathDate` datetime,
  `stoneType` ENUM ('bench', 'bevel marker', 'cenotaph', 'columbarium niche marker', 'headstone', 'flat marker', 'footstone', 'ledger stone', 'mausoleum', 'monument', 'natural stone', 'none', 'obelisk', 'other', 'plaque', 'slant marker', 'statue', 'temporary marker', 'wooden stake'),
  `condition` ENUM ('excellent', 'good', 'fair', 'poor'),
  `epitaph` varchar(255) COMMENT 'Incscription on the grave itself',
  `gravePhoto` mediumblob COMMENT 'For images',
  `plotSection` varchar(255),
  `plotMarker` varchar(255),
  `cemeteryAddress` varChar,
  `informant` varchar(255),
  `funeralHome` int,
  `graveLatitude` FLOAT,
  `graveLongitude` FLOAT,
  `infoSource` varchar(255) COMMENT 'Website where infomation came from'
);

CREATE TABLE `DeceasedDetails` (
  `grave_id` int,
  `biography` varchar(255),
  `ethnicity` varchar(255),
  `nationality` varchar(255),
  `deathType` ENUM ('accident', 'captivity', 'drug overdose', 'disease', 'homicide', 'illness', 'maternal death', 'medical complications', 'maritime death', 'missing', 'natural causes', 'natural disaster', 'other', 'stillborn', 'suicide', 'terrorism', 'undetermined', 'war/conflict'),
  `deathCause` varchar(255),
  `portrait` mediumblob COMMENT 'For images'
);

CREATE TABLE `Place` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `longitude` float,
  `latitude` float,
  `state` varchar(255),
  `city` varchar(255),
  `county` varchar(255),
  `address` varchar(255) COMMENT 'Can be autofilled from Place_id or other location info',
  `thumbnail` BYTEA,
  `description` varchar(255),
  `type` varchar(255)
);

CREATE TABLE `Person` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255),
  `middleName` varchar(255),
  `lastName` varchar(255),
  `sex` varchar(255),
  `private` bool,
  `living` bool,
  `birthDate` datetime,
  `deathDate` datetime,
  `portrait` BYTEA
);

CREATE TABLE `PersonalDetails` (
  `person_id` int,
  `gender` varchar(255),
  `maidenName` varchar(255) COMMENT 'Surname females were born with',
  `title` varchar(255),
  `ethnicity` varchar(255),
  `nationality` varchar(255),
  `biography` varchar(500),
  `occupation` varchar(255),
  `employed` bool,
  `married` bool
);

CREATE TABLE `FuneralEvent` (
  `event_id` int,
  `deceased` int,
  `location` int
);

CREATE TABLE `Event` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `type` varchar(255),
  `startDate` datetime,
  `endDate` datetime,
  `description` varchar(255),
  `private` bool
);

CREATE TABLE `Cemetery` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Place_id` int,
  `name` varchar(255),
  `alias` varchar(255),
  `state` varchar(255),
  `city` varchar(255),
  `county` varchar(255),
  `address` varchar(255) COMMENT 'Can be autofilled from Place_id or other location info',
  `recordedGraves` num,
  `historicallyBlack` bool
);

CREATE TABLE `CemeteryInformation` (
  `cemeterty_id` int,
  `status` ENUM ('Active', 'Inactive', 'Disused', 'Closed', 'Threatened', 'Preserved', 'Lost', 'Under Development', 'Under Threat', 'Unknown'),
  `condition` ENUM ('Well-Maintained', 'Fair Condition', 'Neglected', 'Abandoned', 'Overgrown', 'Vandalized', 'Damaged', 'Restored', 'Undergoing Restoration', 'Unknown'),
  `type` ENUM ('Public', 'Private', 'Churchyard', 'Family', 'Historic', 'Military', 'Natural Burial Ground', 'Slave', 'Community Center', 'Columbarium', 'other'),
  `disused` bool,
  `closed` bool,
  `preservation` CemeteryPreservation,
  `lost` bool,
  `underDevelopment` bool,
  `underThreat` bool,
  `unknown` bool COMMENT 'If true, all other values should be null'
);

ALTER TABLE `Grave` COMMENT = 'A record of burial';

ALTER TABLE `GraveDetails` COMMENT = 'Additional details meant for Grave Page';

ALTER TABLE `DeceasedDetails` COMMENT = 'Relevant details about the person who died';

ALTER TABLE `PersonalDetails` COMMENT = 'Additional info related to Person';

ALTER TABLE `FuneralEvent` COMMENT = 'Events specifically designated as Funerals';

ALTER TABLE `Cemetery` COMMENT = 'Place related to many graves';

ALTER TABLE `CemeteryInformation` COMMENT = 'How the cemetery is operating or might continue to operate';

ALTER TABLE `Grave` ADD FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`);

ALTER TABLE `Grave` ADD FOREIGN KEY (`cemetery_id`) REFERENCES `Cemetery` (`id`);

ALTER TABLE `GraveDetails` ADD FOREIGN KEY (`id`) REFERENCES `Grave` (`id`);

ALTER TABLE `DeceasedDetails` ADD FOREIGN KEY (`grave_id`) REFERENCES `Grave` (`id`);

ALTER TABLE `PersonalDetails` ADD FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`);

ALTER TABLE `FuneralEvent` ADD FOREIGN KEY (`event_id`) REFERENCES `Event` (`id`);

ALTER TABLE `FuneralEvent` ADD FOREIGN KEY (`deceased`) REFERENCES `Grave` (`id`);

ALTER TABLE `FuneralEvent` ADD FOREIGN KEY (`location`) REFERENCES `Place` (`id`);

ALTER TABLE `Cemetery` ADD FOREIGN KEY (`Place_id`) REFERENCES `Place` (`id`);

ALTER TABLE `CemeteryInformation` ADD FOREIGN KEY (`cemeterty_id`) REFERENCES `Cemetery` (`id`);

ALTER TABLE `Place` ADD FOREIGN KEY (`id`) REFERENCES `GraveDetails` (`funeralHome`);

ALTER TABLE `Place` ADD FOREIGN KEY (`id`) REFERENCES `Grave` (`cemetery_id`);

ALTER TABLE `Place` ADD FOREIGN KEY (`address`) REFERENCES `GraveDetails` (`cemeteryAddress`);

ALTER TABLE `GraveDetails` ADD FOREIGN KEY (`graveLongitude`) REFERENCES `Place` (`longitude`);

ALTER TABLE `GraveDetails` ADD FOREIGN KEY (`graveLatitude`) REFERENCES `Place` (`latitude`);

ALTER TABLE `DeceasedDetails` ADD FOREIGN KEY (`portrait`) REFERENCES `Person` (`portrait`);

ALTER TABLE `DeceasedDetails` ADD FOREIGN KEY (`nationality`) REFERENCES `PersonalDetails` (`nationality`);

ALTER TABLE `DeceasedDetails` ADD FOREIGN KEY (`ethnicity`) REFERENCES `PersonalDetails` (`ethnicity`);

ALTER TABLE `GraveDetails` ADD FOREIGN KEY (`deathDate`) REFERENCES `Person` (`deathDate`);

ALTER TABLE `GraveDetails` ADD FOREIGN KEY (`birthDate`) REFERENCES `Person` (`birthDate`);
