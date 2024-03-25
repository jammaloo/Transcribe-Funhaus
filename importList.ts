import { Database } from "bun:sqlite";
const db = new Database("funhaus.db");

db.exec("PRAGMA journal_mode = WAL;");

const file = Bun.file(import.meta.dir + '/listing.csv');

const listing = await file.text();


const insert = db.prepare("INSERT OR REPLACE INTO videos (id, title, view_count, updated_at, upload_date) VALUES ($id, $title, $view_count, $updated_at, $upload_date)");

const insertVideos = db.transaction(cats => {
    const videos = listing.split("\n");
    for (const video of videos) {
        if(!video) continue;
        const [$id, $title, $view_count, $upload_date] = video.split(";");
        insert.run({
            $id,
            $title,
            $view_count,
            $updated_at: Date.now(),
            $upload_date,
        });
    }

    return videos.length;
});

const count = insertVideos(listing);

console.log(`Inserted ${count} videos`);
