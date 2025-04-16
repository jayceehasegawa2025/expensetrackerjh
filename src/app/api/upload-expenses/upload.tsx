"use server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { integer } from "drizzle-orm/pg-core";

function getSpendingCategory(fixedExpense: boolean, personalExpense: boolean, funExpense: boolean){
  if(fixedExpense){
    return "Fixed"
  }
  else if (personalExpense){
    return "Home and Personal"
  }
  else if(funExpense){
    return "Entertainment and Fun"
  }
}

export default async function uploadData(purchaseName: string, fixedExpense: boolean, personalExpense: boolean, funExpense: boolean, amount: number, date: string, notes:string): Promise<{message: string} | { error: string }> {
  try {
    const spendingCategory = getSpendingCategory(fixedExpense, personalExpense, funExpense)
    // Insert the data into the database
    await db.insert(posts).values({ purchaseName, spendingCategory, amount, date, notes });

    // Return a success message or the inserted data
    return { message: "Data uploaded successfully!"};
  } catch (error) {
    console.error("Error uploading data:", error);
    return { error: "Failed to upload data." };
  }
}