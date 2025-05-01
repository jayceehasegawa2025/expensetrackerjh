// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `expensetrackerjh_${name}`);

// export const images = createTable(
//   "image",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }).notNull(),
//     url: varchar("url", {length:1024}).notNull(),
//     userId: varchar("userId", {length:256}).notNull(),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date()
//     ),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("userId", {length:256}),
    purchaseName: varchar("purchaseName", { length: 256 }),
    spendingCategory: varchar("SpendingCategory", { length: 256}),
    amount: integer("amount"),
    date: varchar("date", {length: 256}),
    notes: varchar("notes", {length: 256}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);
