PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE videos(id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, view_count INT NOT NULL, updated_at INTEGER, upload_date TEXT NOT NULL);
CREATE TABLE transcriptions(id TEXT PRIMARY KEY NOT NULL, transcription TEXT NOT NULL, updated_at INTEGER NOT NULL);
CREATE INDEX view_count on videos(view_count);
CREATE VIEW unprocessed_videos AS SELECT * FROM videos WHERE id NOT IN(SELECT id FROM transcriptions);
CREATE INDEX upload_date on videos(upload_date);
COMMIT;
