import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/style";

export const inputBaseClass =
  "font-mono flex w-full rounded-lg border border-mist px-3 py-2 text-base ring-offset-coal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-mist disabled:cursor-not-allowed disabled:bg-silver transition-all aria-invalid:ring-2 aria-invalid:ring-failure focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coal focus-visible:ring-offset-0 focus-visible:border-0 focus-visible:shadow-button";

const inputVariants = cva(inputBaseClass, {
  variants: {
    size: {
      md: "h-[44px]",
      lg: "h-[60px] rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  htmlSize?: number;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, startContent, endContent, type, size, htmlSize, hasError, ...props }, ref) => {
    if (startContent || endContent) {
      return (
        <div className="relative flex items-center">
          <input
            type={type}
            className={cn("peer order-2", inputVariants({ size, className }), {
              "pl-14": startContent,
              "pr-14": endContent,
            })}
            aria-invalid={hasError}
            ref={ref}
            size={htmlSize}
            {...props}
          />

          {startContent && (
            <div className="text-mist peer-focus-visible:text-coal peer-disabled:text-mist peer-aria-invalid:text-failure absolute left-2 order-1 inline-flex h-full items-center">
              {startContent}
            </div>
          )}

          {endContent && (
            <div className="text-mist peer-focus-visible:text-coal peer-disabled:text-mist peer-aria-invalid:text-failure absolute right-2 order-3 inline-flex h-full items-center">
              {endContent}
            </div>
          )}
        </div>
      );
    }

    return (
      <input type={type} className={cn(inputVariants({ size, className }))} ref={ref} size={htmlSize} {...props} />
    );
  }
);

Input.displayName = "Input";
