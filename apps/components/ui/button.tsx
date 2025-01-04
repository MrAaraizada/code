
// Joy UI Button variant
export const JoyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', ...props }, ref) => {
    return <JoyUIButton ref={ref} variant={variant} {...props} />;
  }
);
