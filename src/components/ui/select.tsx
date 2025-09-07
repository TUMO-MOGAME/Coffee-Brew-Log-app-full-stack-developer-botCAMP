import * as React from 'react';
import * as Select_Primitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

const Select = Select_Primitive.Root;
const SelectGroup = Select_Primitive.Group;
const SelectValue = Select_Primitive.Value;
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <Select_Primitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <Select_Primitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Select_Primitive.Icon>
  </Select_Primitive.Trigger>
));
SelectTrigger.displayName = Select_Primitive.Trigger.displayName;

const SelectSrollupAndDownButton = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <Select_Primitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </Select_Primitive.ScrollUpButton>
));
SelectSrollupAndDownButton.displayName =
  Select_Primitive.ScrollUpButton.displayName;

const SelectSrollDownButton = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <Select_Primitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </Select_Primitive.ScrollDownButton>
));
SelectSrollDownButton.displayName =
  Select_Primitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <Select_Primitive.Portal>
    <Select_Primitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
        position === 'popper' &&
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      position={position}
      {...props}
    >
      <SelectSrollupAndDownButton />
      <Select_Primitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-content-available-height)] w-[var(--radix-select-content-available-width)] max-h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </Select_Primitive.Viewport>
      <SelectSrollDownButton />
    </Select_Primitive.Content>
  </Select_Primitive.Portal>
));
SelectContent.displayName = Select_Primitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.Label>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.Label>
>(({ className, ...props }, ref) => (
  <Select_Primitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = Select_Primitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.Item>
>(({ className, children, ...props }, ref) => (
  <Select_Primitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <Select_Primitive.ItemText>{children}</Select_Primitive.ItemText>
    <Select_Primitive.ItemIndicator>
      <Check className="h-4 w-4" />
    </Select_Primitive.ItemIndicator>
  </Select_Primitive.Item>
  ));
SelectItem.displayName = Select_Primitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof Select_Primitive.Separator>,
  React.ComponentPropsWithoutRef<typeof Select_Primitive.Separator>
>(({ className, ...props }, ref) => (
  <Select_Primitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = Select_Primitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectSrollupAndDownButton,
  SelectSrollDownButton,
};
