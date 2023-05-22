import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setResult(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept-Charset': 'UTF-8',
        },
        body: JSON.stringify({ prompt: promptInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      // setPromptInput("Js code to convert Cel degree to Fah degree");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <textarea name='prompt' rows={4} value={promptInput} placeholder="Input prompt" onChange={(e) => setPromptInput(e.target.value)}></textarea>
          <input type="submit" value="Generate output" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
