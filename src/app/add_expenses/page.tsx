/*
'use client'
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

const SpendingForm = () => {
   const [Name, setName] = useState('')
   const [Amount, setAmount] = useState('')
   const [Date, setDate] =useState('')
   
   const handleNameChange = (event) => {
    setName(event.target.value);
   };

   const handleAmountChange = (event) => {
    setAmount(event.target.value);
   }

   const handleDateChange = (event) => {
    setDate(event.target.value);
   }

   const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
   }

   return (
    <div className="">
        <h1 className="text-xl text-lime-600">
            Add Expenses Here
        </h1>
        <br>
        </br>
        <form onSubmit={handleSubmit}>
            <label>Purchase Name:</label>
            <input type="text" value={Name} onChange={handleNameChange}/>
            <br>
            </br>
            <label>Amount:</label>
            <input type="number" value={Amount} onChange={handleAmountChange}/>
            <br>
            </br>
            <label>Date:</label>
            <input type="date" value={Date} onChange={handleDateChange}/>
            <br>
            </br>
            <button type="submit">Submit</button>
        </form>
    </div>
   );
};
   
export default SpendingForm;
*/

// Example Code --> outdated 4/2 switching to more modern upload system
/*
"use client";

import { useState, ChangeEvent } from "react";

type ReturnData = {
  message: string;
  error?: string;
};

export default function HomePage() {
  const [text, setText] = useState<string>(""); // To track the input text
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To show any error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To show success message

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  
    //  
    //  
    //  
    //  
    // Fix here e.target.valueAsNumber??
    setAmount(e.target.value);
  }

  const handleButtonClick = async () => {
    if (text.trim() === "") {
      alert("Please enter some text.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/upload-expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Use JSON for request body
        },
        body: JSON.stringify({
          content: text,
          amount: amount,
        }),
      });

      const data = await response.json() as ReturnData;

      if (response.ok) {
        setSuccessMessage(data.message); // Show success message
        setText(""); // Clear input
        setAmount(0);
        setError(null); // Reset error state
      } else {
        setError(data.error || "An unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading text:", error);
      setError("An error occurred while uploading the text.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Upload Text</h1>
        
        {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

        {successMessage && <div className="alert alert-success mb-4"><span>{successMessage}</span></div>}

        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here"
          className="input input-bordered w-full mb-4"
        />

        <input
          type="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount here"
          className="input input-bordered w-full mb-4"
        />

        <button 
          onClick={handleButtonClick}
          className="btn btn-primary w-full"
          disabled={loading} // Disable button during loading
        >
          {loading ? "Uploading..." : "Upload Text"}
        </button>
      </div>
    </main>
  );
}  */

// Mr. Hanagami Modern Code 4/2 Test
"use client";
import { useState, useEffect } from "react";
import uploadData from "src/app/api/upload-expenses/upload";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [purchaseName, setName] = useState("");
  const [fixedExpense, setFixedExpense] = useState(false);
  const [personalExpense, setPersonalExpense]= useState(false);
  const [funExpense, setFunExpense] = useState(false); 
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();


  useEffect(() => {
    // This hook will run after the component is mounted on the client side
    // Any code that interacts with the browser (e.g., navigation, DOM manipulation) should go here
  }, []); // Empty dependency array ensures it runs only once, after initial render

  // Moved handleCategoryChange to upload.tsx --> function uploads spendingCategory string variable to database now
  /*  
  function handleCategoryChange() {
    console.log("category change run YAY")
    if(spendingCategory0){
      setSpendingCategory("fixed expenses");
      console.log("fixed expenses") 
    }
    else if(spendingCategory1){
      setSpendingCategory("Home and personal")
      console.log("Home and personal")
    }
    else if(spendingCategory2){
      setSpendingCategory("Entertainment/Fun")
      console.log("entertainment fun")
    }
    console.log(spendingCategory);
  };
  */

  const handleSubmit = async (e: React.FormEvent) => {
    // handleCategoryChange();
    e.preventDefault();
    const result = await uploadData(purchaseName, fixedExpense, personalExpense, funExpense, amount, date, notes);
    console.log(result); // Handle the result as needed
    router.push("/add_expenses"); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Purchase Name</h1>
      <input
        type="text"
        value={purchaseName}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name" 
        required
      />
      <br></br>
      <br></br>
      <h1>Spending Category</h1>
      <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
        <input
          type="radio"
          onChange={(e) => setFixedExpense(e.target.checked)}
          name="spendingCategory"
          id="Fixed Expenses"
        />
        <label
          className="hover:cursor-pointer"
          htmlFor="Fixed Expenses">
           Fixed
        </label>
        <br></br>
        <input
          type="radio"
          onChange={(e) => setPersonalExpense(e.target.checked)}
          name="spendingCategory"
          id="Home and Personal"
        />
        <label
          className="hover:cursor-pointer"
          htmlFor="Home and Personal">
          Home and Personal
        </label>
        <br></br>
        <input
          type="radio"
          onChange={(e) => setFunExpense(e.target.checked)}
          name="spendingCategory"
          id="Entertainment and Fun"
        />
        <label
          className="hover:cursor-pointer"
          htmlFor="Entertainment and Fun">
           Entertainment and Fun
        </label>
      </div>
      <input
        type="number"
        value={amount}
        step="10"
        min="0"
        onChange={(e) => setAmount(e.target.valueAsNumber)}
        placeholder="Amount"
        required
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        placeholder="Date"
        required
      />
      <input
        type="text"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Notes"
      />
      <button className="btn btn-outline btn-success" type="submit">Upload Spending Log</button>
    </form>
  );

}