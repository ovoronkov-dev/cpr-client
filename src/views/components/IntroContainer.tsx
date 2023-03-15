import { Particles } from "react-tsparticles";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const PARTICLES_URL =
  "https://firebasestorage.googleapis.com/v0/b/cpr-playground.appspot.com/o/particlesjs-config.json?alt=media&token=ef0048ec-ad2e-401e-8895-22b6a1b7df9d";

export const HomeIntroContainer = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return <Particles url={PARTICLES_URL} init={particlesInit} />;
};
