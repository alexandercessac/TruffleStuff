import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

import Web3 from "web3";


// get w3 instance
const w3 = new Web3(window.ethereum);
// prompt user for wallet
await window.ethereum.enable();

console.log('getting accounts')
const accounts = await w3.eth.getAccounts();
console.log('accounts' + accounts)

export async function action() {
    const goal = await createContact();
    return redirect(`/contacts/${goal?.address}/edit`);
  }

export async function loader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const goals = await getContacts(q);
    console.log(goals);
    return { goals, q };
  }

export default function Root() {
    const { goals, q } = useLoaderData();

    const navigation = useNavigation();
    const submit = useSubmit();
    const searching = navigation.location
        && new URLSearchParams(navigation.location.search).has("q");
    useEffect(() => 
        { document.getElementById("q").value = q; }
        ,[q]);

    return (
      <>
        <div id="sidebar">
          <h1>Account: {accounts[0]}</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                    const isFirstSearch = q == null;
                    submit(event.currentTarget.form, {replace: !isFirstSearch});
                  }}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
              <div className="sr-only" aria-live="polite" ></div>
            </Form>
            <Form method="post">
                <button type="submit">New</button>
            </Form>
          </div>
          <nav>
          {goals.length ? (
            <ul>
              {goals.map((goal) => (
                <li key={goal.id}>
                    <NavLink to={`contacts/${goal.address}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    {goal.name ? (
                      <>
                        {goal.name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {goal.favorite && <span>★</span>}
                    </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No goals</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
            <Outlet/>
        </div>
      </>
    );
  }