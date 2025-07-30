import { type JSX } from "react";

const Landing = (): JSX.Element => {
  return (
    <main>
      <h1>Make the most of your food!</h1>

      <section>
        A brief, one-or-two-sentence description of the problem your app solves
        or the value it provides.
        <br></br>A primary call-to-action (CTA) button (e.g., “Get Started” or
        “Sign Up Now”).<br></br>
        <a href="/signup">
          <button>Join now</button>
        </a>
      </section>
      <section>
        3. Features Section A section that highlights the key features and
        benefits of your application. Use a combination of icons, images, and
        short descriptions to make this section visually appealing and easy to
        understand.
      </section>
    </main>
  );
};

export default Landing;
