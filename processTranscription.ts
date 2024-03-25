import { Database } from "bun:sqlite";
const db = new Database("funhaus.db");

db.exec("PRAGMA journal_mode = WAL;");

const videoId = process.argv[2].replace(/[^a-z0-9\-_]/gi, '');


const file = Bun.file(import.meta.dir + `/transcriptions/${videoId}.tsv`);

const listing = await file.text();


db.prepare("DELETE FROM transcriptions WHERE video_id = $video_id").run({ $video_id: videoId });
const insert = db.prepare("INSERT INTO transcriptions (video_id, start, end, text, updated_at) VALUES ($video_id, $start, $end, $text, $updated_at)");

const insertTranscriptions = db.transaction(cats => {
    const lines = listing.split("\n");
    for (const line of lines) {
        if (!line.trim()) continue;
        const [$start, $end, $text] = line.split("\t");
        insert.run({
            $video_id: videoId,
            $start,
            $end,
            $text,
            $updated_at: Date.now(),
        });
    }

    return lines.length;
});

const count = insertTranscriptions(listing);

console.log(`Inserted ${count} transcribed lines`);
