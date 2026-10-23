"use client";
import { useEffect } from "react";

/* The learning app itself is plain DOM code in ./raajje/app.js. It renders into #app, the
   header slots and the bottom bar below, so React draws this shell once and never re-renders it. */
export default function SocialApp() {
  useEffect(() => {
    import("./raajje/app.js");
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return (
    <>
      <header className="bar"><div className="wrap">
        <button className="brand" id="brand" type="button" aria-label="Raajje Explorers home"><b>🌊 Atollingo</b><small>Raajje Explorers</small></button>
        <span className="spacer"></span>
        <span id="barKid" className="row"></span>
        <details className="a11y"><summary aria-label="Reading and display">Aa</summary>
          <div className="a11y-panel" role="group" aria-label="Reading and display"><span className="note">Text size</span>
            <div className="row">
              <button className="btn alt small" type="button" data-size="16" aria-label="Normal text">A</button>
              <button className="btn alt small" type="button" data-size="18" aria-label="Larger text">A+</button>
              <button className="btn alt small" type="button" data-size="20" aria-label="Largest text">A++</button>
            </div>
            <button className="btn alt small" type="button" id="hc" aria-pressed="false">High contrast</button>
          </div>
        </details>
        <button className="chip grown" id="grownBtn" type="button">👪 <span>Grown-ups</span></button>
      </div></header>
      <main className="wrap" id="app" aria-live="polite"><p role="status" className="note" style={{ padding: "40px 0" }}>Sailing to Raajje Explorers…</p></main>
      <nav className="bottomnav" id="bottomnav" aria-label="App navigation"></nav>
      <footer className="foot">Made for curious island minds. Part of <a href="https://atollingo.com/">Atollingo</a> · Social Studies for Grades 1–6</footer>
    </>
  );
}
