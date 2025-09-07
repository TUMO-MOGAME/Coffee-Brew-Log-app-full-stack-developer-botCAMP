import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {Controller,FormProvider,useFormContext,type ControllerProps,type FieldPath,
  type FieldValues,
  type FieldError,
} from "react-hook-form";
import { cn } from "../../lib/utils";
import { Label } from "./label";
export const Form = FormProvider;


type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues,TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = { name: TName;};
const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

type FormItemContextValue = { id: string };
const FormItemContext = React.createContext<FormItemContextValue | null>(null);
function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: any, key) => (acc ? acc[key] : undefined), obj as any);
}
export function useFormField<TFieldValues extends FieldValues = FieldValues>() {
  const fieldCtx = React.useContext(FormFieldContext) as FormFieldContextValue<TFieldValues> | null;
  const itemCtx = React.useContext(FormItemContext);

  if (!fieldCtx) throw new Error("useFormField must be used within <FormField>");
  if (!itemCtx) throw new Error("useFormField must be used within <FormItem>");

  const { getFieldState, formState } = useFormContext<TFieldValues>();
  const state = getFieldState(fieldCtx.name, formState);
  const error = state.error as FieldError | undefined;
  const id = itemCtx.id;
  return {
    id,
    name: fieldCtx.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
    invalid: !!error,
  };
}
export function useRHF<TFieldValues extends FieldValues = FieldValues>() {return useFormContext<TFieldValues>();
}export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { invalid, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(invalid && "text-destructive", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { invalid, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!invalid ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={invalid}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { invalid, formMessageId, name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const err = getByPath(errors, String(name)) as FieldError | undefined;
  const body = invalid ? err?.message : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {String(body)}
    </p>
  );
});
FormMessage.displayName = "FormMessage";





















































