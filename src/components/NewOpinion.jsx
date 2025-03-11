import { useActionState } from "react";

export function NewOpinion() {
  function shareOpinionAction(prevFormState, formData) {
    const username = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];
    if (!username.trim()) {
      errors.push("Invalid username");
    }
    if (title.trim().length < 5) {
      errors.push("Invalid title");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Invalid body");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          username,
          title,
          body,
        },
      };
    }

    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.username}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>

      {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
      )}
    </div>
  );
}
