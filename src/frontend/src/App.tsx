import { useState } from "react";
import { createActor, canisterId } from "../../declarations/backend";

function App() {
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGreeting("");
    setError("");
    setLoading(true);

    const name = (
      event.currentTarget.elements.namedItem("name") as HTMLInputElement
    )?.value.trim();
    if (!name) {
      setError("Please enter a valid name.");
      setLoading(false);
      return;
    }

    try {
      const backend = createActor(canisterId);
      const response = await backend.greet(name);
      setGreeting(response);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <img src="/logo2.svg" alt="DFINITY logo" className="logo" />
      <h1>ICP Bootcamp</h1>
      <p>Enter your name and receive a greeting from the Internet Computer.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name:</label>
        <input id="name" type="text" placeholder="John Doe" />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Click Me!"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {greeting && <section id="greeting">{greeting}</section>}
    </main>
  );
}

export default App;
