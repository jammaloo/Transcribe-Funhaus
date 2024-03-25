import { Database } from "bun:sqlite";
const db = new Database("funhaus.db");

// toin coss between processing a newer video, or a popular video
const newVideo = Math.random() > 0.5;

const selectStatement = newVideo ? "SELECT id FROM unprocessed_videos ORDER BY upload_date DESC LIMIT 1" : "SELECT id FROM unprocessed_videos ORDER BY view_count DESC LIMIT 1";
const query = db.query(selectStatement);
const result = query.get();
if (result) {
    console.log(result.id);
} else {
    console.log("No videos to process");
}
