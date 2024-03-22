import React from "react"
import Parse from "parse";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();

    const [balance, setBalance] = React.useState(0);

    const user = Parse.User.current();

    const fetchBalance = async () => {
        const Wallet = await Parse.Object.extend("Wallet");
        const query = new Parse.Query(Wallet);
        query.equalTo("owner", user);
        const wallet = await query.first();
        setBalance(wallet.get("balance"));
    }

    fetchBalance();

    const logOutUser = async () => {
        try {
          const user = await Parse.User.logOut();
          console.log('User logged out successfully:', user);
          navigate("/");
        } catch (error) {
            console.error("Error logging out user:", error);
        }
    };

    const topUp = async () => {
        const Wallet = await Parse.Object.extend("Wallet");
        const query = new Parse.Query(Wallet);
        query.equalTo("owner", user);
        const wallet = await query.first();
        wallet.increment("balance", 10);
        const newBalance = await wallet.save()
        setBalance( newBalance.get("balance") );
    };

  return (
    <>
        <nav>
            <h1 className="title">Banka</h1>
            <button onClick={logOutUser}>Log out</button>
        </nav>
        <div className="home">
            <p className="top">Welcome {user.get('username')}</p>
            
            <div className="balance-card">
                <p>Total Wallet Balance</p>
                <h1>${balance}</h1>
                <button onClick={topUp}>Top Up</button>
            </div>

            <div className="features">
                <div className="card">
                    <p>Pay Bills</p>
                </div>
                <div className="card">
                    <p>Airtime/Data</p>
                </div>
                <div className="card">
                    <p>Transfers</p>
                </div>
                <div className="card">
                    <p>Withdraw</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home;