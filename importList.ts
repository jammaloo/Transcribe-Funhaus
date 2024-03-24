import { Database } from "bun:sqlite";
const db = new Database("funhaus.db");

const file = Bun.file(import.meta.dir + '/listing.csv');

const listing = await file.text();


const insert = db.prepare("INSERT OR REPLACE INTO videos (id, title, view_count, updated_at) VALUES ($id, $title, $view_count, $updated_at)");

const insertVideos = db.transaction(cats => {
    const videos = listing.split("\n");
    for (const video of videos) {
        if(!video) continue;
        const [$id, $title, $view_count] = video.split(";");
        insert.run({
            $id,
            $title,
            $view_count,
            $updated_at: Date.now(),
        });
    }

    return videos.length;
});

const count = insertVideos(listing);

console.log(`Inserted ${count} videos`);
