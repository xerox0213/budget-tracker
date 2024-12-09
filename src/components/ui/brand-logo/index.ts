import { cva, VariantProps } from "class-variance-authority";

export const logo = cva("font-bold text-yellow-500", {
  defaultVariants: {
    size: "small",
  },
  variants: {
    size: {
      large: "text-xl md:text-2xl",
      medium: "text-lg md:text-xl",
      small: "text-sm md:text-lg",
    },
  },
});

export type LogoVariants = VariantProps<typeof logo>;
