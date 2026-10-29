import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App";
import NotFound from "./pages/NotFound";
import LoadingPage from "./pages/LoadingPage";
import Header from "./components/Header";
import ScrollIndicator from "./components/ScrollIndicator";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import TextType from "./textType/TextType";
import config from "./config";

function installDomMocks({ reduceMotion = false, isDesktop = true } = {}) {
  window.scrollTo = jest.fn();

  window.matchMedia = jest.fn().mockImplementation((query) => {
    let matches = false;
    if (query.includes("prefers-reduced-motion: reduce")) {
      matches = reduceMotion;
    } else if (query.includes("prefers-reduced-motion: no-preference")) {
      matches = !reduceMotion;
    } else if (query.includes("min-width")) {
      matches = isDesktop;
    } else if (query.includes("max-width")) {
      matches = !isDesktop;
    }

    return {
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  });

  global.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

afterEach(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
  jest.restoreAllMocks();
});

describe("Portfolio pages & GSAP animation lifecycle", () => {
  test("renders redesigned 404 page with background artwork, navigation, and clean unmount", () => {
    installDomMocks({ reduceMotion: false, isDesktop: true });

    const { container, unmount } = render(
      <React.StrictMode>
        <MemoryRouter initialEntries={["/missing-route"]}>
          <App />
        </MemoryRouter>
      </React.StrictMode>
    );

    expect(screen.getByText(/ERROR 404/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /PAGE NOT FOUND/i })
    ).toBeInTheDocument();

    const bgImg = container.querySelector("[data-nf-bg]");
    expect(bgImg).toBeInTheDocument();
    expect(bgImg.getAttribute("src")).toContain("not-found-bg.jpg");

    const backHomeLink = screen.getByRole("link", { name: /BACK TO HOME/i });
    expect(backHomeLink).toHaveAttribute("href", config.homePath);

    unmount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });

  test("respects prefers-reduced-motion across NotFound, Hero, Projects, ScrollIndicator, and TextType", () => {
    installDomMocks({ reduceMotion: true, isDesktop: true });

    const { unmount } = render(
      <React.StrictMode>
        <MemoryRouter>
          <Header />
          <Hero />
          <ScrollIndicator />
          <Projects />
          <NotFound />
          <TextType text={["Frontend", "Engineer"]} />
        </MemoryRouter>
      </React.StrictMode>
    );

    expect(screen.getByText(/SELECTED WORKS/i)).toBeInTheDocument();

    const infiniteTweens = gsap.globalTimeline
      .getChildren(true, true, false)
      .filter((tween) => tween.repeat && tween.repeat() === -1);
    expect(infiniteTweens).toHaveLength(0);

    unmount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });

  test("cleans up ScrollTrigger instances on Home section unmount in StrictMode", () => {
    installDomMocks({ reduceMotion: false, isDesktop: true });

    const { unmount } = render(
      <React.StrictMode>
        <MemoryRouter>
          <Header />
          <Hero />
          <ScrollIndicator />
          <Projects />
        </MemoryRouter>
      </React.StrictMode>
    );

    expect(ScrollTrigger.getAll().length).toBeGreaterThan(0);

    unmount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });

  test("LoadingPage updates progress without leaking timers on unmount", () => {
    installDomMocks({ reduceMotion: true, isDesktop: true });
    const onComplete = jest.fn();

    const { unmount } = render(<LoadingPage onComplete={onComplete} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    act(() => {
      unmount();
    });

    expect(onComplete).not.toHaveBeenCalled();
  });

  test("Header mobile drawer opens and closes cleanly via keyboard Escape", () => {
    installDomMocks({ reduceMotion: true, isDesktop: false });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const openBtn = screen.getByRole("button", { name: /Open navigation menu/i });
    fireEvent.click(openBtn);
    expect(openBtn).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(openBtn).toHaveAttribute("aria-expanded", "false");
  });
});
