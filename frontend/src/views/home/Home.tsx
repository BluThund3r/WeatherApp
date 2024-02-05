import React from "react";

export default function Home() {
  return (
    <>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1,
      ].map((element) => (
        <div>Home</div>
      ))}
    </>
  );
}
