import * as migration_20260824_192815_initial_payload_schema from "./20260824_192815_initial_payload_schema";
import * as migration_20260824_201126_media_seed_key from "./20260824_201126_media_seed_key";

export const migrations = [
  {
    up: migration_20260824_192815_initial_payload_schema.up,
    down: migration_20260824_192815_initial_payload_schema.down,
    name: "20260824_192815_initial_payload_schema",
  },
  {
    up: migration_20260824_201126_media_seed_key.up,
    down: migration_20260824_201126_media_seed_key.down,
    name: "20260824_201126_media_seed_key",
  },
];
