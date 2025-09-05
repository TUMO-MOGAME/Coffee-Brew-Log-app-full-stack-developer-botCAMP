import * as React from 'react';
import * as label_primitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import {cn} from "@/lib/utils";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
    React.ElementRef<typeof label_primitive.Root>,
    React.ComponentPropsWithoutRef<typeof label_primitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
    <label_primitive.Root
        ref={ref}
        className={cn(labelVariants({ className }))}
        {...props}
    />
));
Label.displayName = label_primitive.Root.displayName;

export { Label };