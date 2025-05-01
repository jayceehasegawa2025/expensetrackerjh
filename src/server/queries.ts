import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { posts } from "./db/schema";

type spendingInfo = {
    id: number;
    userId: string | null;
    purchaseName: string | null;
    spendingCategory: string | null;
    amount: number | null;
    date: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export async function getData(): Promise<spendingInfo[] | null> {
    const user = (await auth());
    
    if(!user.userId){
        throw new Error("Unauthorized");
    }
    
    const userData = await db.query.posts.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });
    return userData
}