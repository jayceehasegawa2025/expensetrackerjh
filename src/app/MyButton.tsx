import Link from "next/link";

export const HomeButton: React.FC = () => {
    return (
        <Link href = "/">
            <button>Home</button>
        </Link>
    )
}

export const AboutButton: React.FC = () => {
    return (
        <Link href = "/about">
            <button>About Us</button>
        </Link>
    );
};

export const ExpenseButton: React.FC = () => {
    return (
        <Link href = "/add_expenses">
            <button>Add Expenses</button>
        </Link>
    );
};

export const SpendingButton: React.FC = () => {
    return (
        <Link href = "/spending_log">
            <button>Spending Log</button>
        </Link>
    )
}