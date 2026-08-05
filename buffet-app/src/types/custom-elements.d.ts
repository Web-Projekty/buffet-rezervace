import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "l-bouncy": HTMLAttributes<HTMLElement> & {
        size?: number | string;
        speed?: number | string;
        color?: string;
      };
    }
  }
}
