"use server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { integer } from "drizzle-orm/pg-core";

function getSpendingCategory(spendingCategory0: boolean, spendingCategory1: boolean, spendingCategory2: boolean){
  console.log("get spending category runs")
  if(spendingCategory0){
    console.log("spending category 0")
    return "fixed expenses"
  }
  else if (spendingCategory1){
    console.log("spending category 1")
    return "home and personal"
  }
  else if(spendingCategory2){
    console.log("spending category 2")
    return "entertainment fun"
  }
}

export default async function uploadData(purchaseName: string, spendingCategory0: boolean, spendingCategory1: boolean, spendingCategory2: boolean, amount: number, date: string, notes:string): Promise<{message: string} | { error: string }> {
  try {
    const spendingCategory = getSpendingCategory(spendingCategory0, spendingCategory1, spendingCategory2)
    // Insert the data into the database
    await db.insert(posts).values({ purchaseName, spendingCategory, amount, date, notes });

    // Return a success message or the inserted data
    return { message: "Data uploaded successfully!"};
  } catch (error) {
    console.error("Error uploading data:", error);
    return { error: "Failed to upload data." };
  }
}