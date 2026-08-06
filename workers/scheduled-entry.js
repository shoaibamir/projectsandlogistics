import openNextWorker from "../.open-next/worker.js";

export {
  DOQueueHandler,
  DOShardedTagCache,
  BucketCachePurge,
} from "../.open-next/worker.js";

const workerEntry = {
  ...openNextWorker,
  async scheduled(event, env, ctx) {
    if (!env.FEED_INGEST_SECRET) {
      console.error("scheduled: FEED_INGEST_SECRET is not set, skipping feed ingestion");
      return;
    }
    const url = env.FEED_INGEST_URL || "https://projectsandlogistics.com/api/ingest-feeds";
    ctx.waitUntil(
      fetch(url, {
        method: "POST",
        headers: { "x-ingest-secret": env.FEED_INGEST_SECRET },
      }).catch((error) => {
        console.error("scheduled: feed ingestion request failed", error);
      }),
    );
  },
};

export default workerEntry;
