import { getData } from "src/server/queries"

export default async function Page (){
    const spendingData = await getData();

    return (        
        <h1>Expense summary</h1>
    );
}