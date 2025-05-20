import { getData } from "src/server/queries"
import { auth } from "@clerk/nextjs/server";


export default async function Page (){
    const spendingData = await getData();

    return (
        spendingData?.map((data) => (
            <div key={data.id}>
                <h1>{data.purchaseName}</h1>
            </div>
        ))
    );
}