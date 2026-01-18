
// Joy UI Button variant
export const JoyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', ...props }, ref) => {
    return <JoyUIButton ref={ref} variant={variant} {...props} />;
  }
);
/* Updated: 2026-01-19 03:16:58 */
