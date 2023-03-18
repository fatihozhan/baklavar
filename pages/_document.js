import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{fontFamily : "Space Grotesk"}}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/favicon.png" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
