import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !mainRef.current) return;

    const targets = Array.from(
      mainRef.current.querySelectorAll<HTMLElement>("section, section article, .service-card, .industry-card"),
    ).filter((element, index, elements) => !element.closest(".home-page") && elements.indexOf(element) === index);

    targets.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--scroll-reveal-delay", `${(index % 4) * 65}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );

    targets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
