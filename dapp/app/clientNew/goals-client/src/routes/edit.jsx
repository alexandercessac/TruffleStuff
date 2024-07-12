import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }

export default function EditContact() {
  const { goal } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
        <input
          placeholder="0x"
          aria-label="Creator"
          type="text"
          name="creator"
          defaultValue={goal?.creator.id}
        />
        <span>Name</span>
        <input
          placeholder="Goal Name"
          aria-label="Goal name"
          type="text"
          name="name"
          defaultValue={goal?.name}
        />
      <label>
        <span>Description</span>
        <textarea
          name="Description"
          defaultValue={goal?.description}
          rows={6}
        />
      </label>
        <span>Reward</span>
        <input
          placeholder="0"
          aria-label="Reward"
          type="text"
          name="reward"
          defaultValue={goal?.reward}
        />
      
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => { navigate(-1); }}>Cancel</button>
      </p>
    </Form>
  );
}