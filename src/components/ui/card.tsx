import * as react from "react";
import {cn} from "@/lib/utils";

const Card = react.forwardRef<HTMLDivElement, react.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground", className)} {...props} />;
});
Card.displayName = "Card";

const CardHeader = react.forwardRef<HTMLDivElement, react.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
});
CardHeader.displayName = "CardHeader";

const CardTitle = react.forwardRef<HTMLParagraphElement, react.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
});
CardTitle.displayName = "CardTitle";

const CardDescription = react.forwardRef<HTMLParagraphElement, react.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />;
});
CardDescription.displayName = "CardDescription";

const CardContent = react.forwardRef<HTMLDivElement, react.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});
CardContent.displayName = "CardContent";

const CardFooter = react.forwardRef<HTMLDivElement, react.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
});
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
