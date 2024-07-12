import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
  const goal = await getContact(params.address);
  if (!goal) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { goal };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { goal } = useLoaderData();
  return (
    <div id="contact">
      <div>
        <img
          key={goal.address}
          src={
            `https://robohash.org/${goal.address}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {goal.name ? (
            <>
              {goal.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite goal={goal} />
        </h1>

        {goal.description && (
          <p>
              {goal.description}
          </p>
        )}

        {goal.creator && <p>Created by: {goal.creator}</p>}
        {goal.reward ? <p>Reward: {goal.reward}</p> : <p>Reward Claimed</p>}
        {goal.complete ? <p>Status: Completed</p> : <p>Status: Incomplete</p>}
        {goal.assignedTo ? <p>Assigned to: {goal.assignedTo}</p>:
          <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
        }

        
      </div>
    </div>
  );
}

//todo: use this for assined?
function Favorite({ goal }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : goal.favorite;
  
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}