import React from "react";
import SubSecOne from "./LandingShowcaseSection/SubSecOne";
import SubSecTwo from "./LandingShowcaseSection/SubSecTwo";
import SubSecThird from "./LandingShowcaseSection/SubSecThird";

const LandingShowcaseSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-primary-button py-20 px-4 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(42,206,209,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_28%)] opacity-70" />
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-10">
        <SubSecOne />
        <SubSecTwo />
        <SubSecThird />
      </div>
    </section>
  );
};

export default LandingShowcaseSection;
