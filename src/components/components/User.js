import React, { useState } from "react";
import axios from "axios";

export default function User() {
    const [userDetails, setUserDetails] = useState(null);

    function fun1() {
        const email = document.getElementsByName("t1")[0].value;
        console.log(email);

        axios.get("http://localhost:8080/user", { params: { email } })
            .then((res) => {
                console.log(res.data);
                setUserDetails(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data", err);
            });
        }

    return (
        <div className="user-container">
            <h2>User Details Fetcher</h2>
            <div className="input-container">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="t1"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                />
            </div>
            <button className="btn-fetch" onClick={fun1}>Get Details</button>

            {userDetails && (
                <div className="user-info">
                    <h3>Details for {userDetails.name}</h3>
                    <pre>{JSON.stringify(userDetails, null, 2)}</pre>
                </div>
            )}

            
            {/* Internal CSS */}
            <style jsx>{`
                .user-container {
                    font-family: 'Roboto', sans-serif;
                    width: 100%;
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 30px;
                    background: linear-gradient(135deg, #4e73df, #1cc88a);
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    color: #fff;
                }

                h2 {
                    text-align: center;
                    font-size: 2rem;
                    margin-bottom: 20px;
                }

                .input-container {
                    margin-bottom: 20px;
                }

                label {
                    font-size: 1.1rem;
                    margin-bottom: 8px;
                    display: block;
                    color: #fff;
                }

                input[type="email"] {
                    width: 100%;
                    padding: 12px;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    font-size: 1rem;
                    margin-top: 5px;
                    background: #fff;
                    color: #333;
                    transition: border 0.3s ease-in-out;
                }

                input[type="email"]:focus {
                    outline: none;
                    border-color: #1cc88a;
                }

                .btn-fetch {
                    width: 100%;
                    padding: 14px;
                    background-color: #1cc88a;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease-in-out;
                    margin-bottom: 15px;
                }

                .btn-fetch:hover {
                    background-color: #17a679;
                }

                .btn-back {
                    width: 100%;
                    padding: 14px;
                    background-color: #4e73df;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-top: 15px;
                    transition: background-color 0.3s ease-in-out;
                }

                .btn-back:hover {
                    background-color: #2e59d9;
                }

                .user-info {
                    background-color: #fff;
                    padding: 20px;
                    margin-top: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    color: #333;
                }

                h3 {
                    margin-bottom: 10px;
                    font-size: 1.5rem;
                    color: #333;
                }

                pre {
                    font-family: 'Courier New', monospace;
                    background-color: #f7f7f7;
                    padding: 15px;
                    border-radius: 8px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-size: 1rem;
                    color: #444;
                }
            `}</style>
        </div>
    );
}
