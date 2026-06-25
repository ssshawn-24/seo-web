import "./globals.css";

export const metadata = {
  title: "Stillroom Yoga",
  description: "A quiet boutique yoga studio for vinyasa, yin, restorative practice, and breathwork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="zxuyYTqRoul1Yfw-_2Pw2VsljkjSCIztoljuBaorDnI"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
