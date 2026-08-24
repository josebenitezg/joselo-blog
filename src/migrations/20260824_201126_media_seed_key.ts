import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN "seed_key" varchar;
    UPDATE "media"
    SET "seed_key" = 'hello-world-cover'
    WHERE "id" = (
      SELECT "id"
      FROM "media"
      WHERE "filename" LIKE 'hello-world%'
      ORDER BY "created_at" ASC, "id" ASC
      LIMIT 1
    );
    CREATE UNIQUE INDEX "media_seed_key_idx" ON "media" USING btree ("seed_key");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "media_seed_key_idx";
    ALTER TABLE "media" DROP COLUMN "seed_key";
  `);
}
