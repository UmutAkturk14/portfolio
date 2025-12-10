import "quokka-toolkit";

declare module "quokka-toolkit" {
  interface Core {
    /**
     * Adds directional fade animations to matched elements.
     * Present at runtime but missing from upstream typings.
     */
    directionalFade(
      scrollUpFade: boolean,
      animationType: "fade" | "slide",
      selectors: string
    ): this;
  }
}

export {};
