import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="">
      <div className = "grid grid-cols-1 h-screen place-items-center text-center">
        <div>
        <h1 className="text-4xl text-lime-600">
          Welcome to your expense tracker!
        </h1>
        <br>
        </br>
        <p>
          - Keep track of fixed and variable expenses easily
          <br>
          </br>
          - View spending reports and purchase trends
        </p>
        <br>
        </br>
        <h1 className="text-xl text-lime-600">
          Create an account or login to get started
          <br>
          </br>
        </h1>
        </div>
      </div>
    </main>
  );
}
