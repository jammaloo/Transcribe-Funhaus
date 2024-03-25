PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE videos(id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, view_count INT NOT NULL, updated_at INTEGER, upload_date TEXT NOT NULL);
CREATE INDEX view_count on videos(view_count);
CREATE INDEX upload_date on videos(upload_date);
CREATE TABLE transcriptions(id NUMBER PRIMARY KEY, updated_at INTEGER NOT NULL, video_id TEXT NOT NULL, start INTEGER NOT NULL, end INTEGER NOT NULL, text TEXT NOT NULL);
CREATE INDEX video_id on transcriptions(video_id);
CREATE VIEW unprocessed_videos AS SELECT * FROM videos WHERE id NOT IN(SELECT video_id FROM transcriptions);
COMMIT;
