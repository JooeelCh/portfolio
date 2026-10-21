"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, useForm, type Control, type FieldError as RHFError } from "react-hook-form";
import { toast } from "sonner";
import { sendContactMessage, type ContactResult } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_REASONS, contactSchema, type ContactInput, } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

type ErrorCode = Exclude<ContactResult, { ok: true }>["code"] | "network";

const controlClass = cn(
  "h-11 rounded-md border border-foreground/35 bg-transparent px-3 font-sans text-base shadow-none md:text-sm",
  "dark:bg-transparent",
  "transition-colors hover:border-foreground/60",
  "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-accent/40",
  "aria-invalid:border-destructive aria-invalid:hover:border-destructive aria-invalid:focus-visible:border-destructive",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

const labelClass = "font-mono text-sm uppercase tracking-wider";

type TextFieldProps = {
  control: Control<ContactInput>;
  name: "name" | "email" | "subject";
  label: string;
  type?: string;
  autoComplete?: string;
};

function TextField({ control, name, label, type = "text", autoComplete }: TextFieldProps) {
  const t = useTranslations("Contact");
  const id = `contact-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} className={labelClass}>
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={id}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            className={controlClass}
          />
          <FieldError
            errors={
              fieldState.error?.message
                ? [{ message: t(`errors.${fieldState.error.message}` as never) }]
                : undefined
            }
          />
        </Field>
      )}
    />
  );
}

export function ContactForm() {
  const t = useTranslations("Contact");

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      reason: undefined,
      subject: "",
      message: "",
      website: "",
    },
  });

  const { isSubmitting } = form.formState;

  const errorsFor = (error?: RHFError) =>
    error?.message
      ? [{ message: t(`errors.${error.message}` as never) }]
      : undefined;

  async function onSubmit(values: ContactInput) {
    let result: ContactResult;

    try {
      result = await sendContactMessage(values);
    } catch {
      toastError("network");
      return;
    }

    if (result.ok) {
      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });
      form.reset();
      return;
    }

    toastError(result.code);
  }

  function toastError(code: ErrorCode) {
    toast.error(t(`toast.error.${code}.title`), {
      description: t(`toast.error.${code}.description`),
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <fieldset
        disabled={isSubmitting}
        className="relative grid min-w-0 gap-6 sm:grid-cols-2"
      >
        <TextField
          control={form.control}
          name="name"
          label={t("form.name")}
          autoComplete="name"
        />
        <TextField
          control={form.control}
          name="email"
          label={t("form.email")}
          type="email"
          autoComplete="email"
        />

        <Controller
          name="reason"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-reason" className={labelClass}>
                {t("form.reason")}
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="contact-reason"
                  ref={field.ref}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    controlClass,
                    "w-full data-[size=default]:h-11",
                  )}
                >
                  <SelectValue placeholder={t("form.reasonPlaceholder")}>
                    {field.value ? t(`reasons.${field.value}`) : t("form.reasonPlaceholder")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_REASONS.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {t(`reasons.${reason}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={errorsFor(fieldState.error)} />
            </Field>
          )}
        />
        <TextField
          control={form.control}
          name="subject"
          label={t("form.subject")}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
              <FieldLabel htmlFor="contact-message" className={labelClass}>
                {t("form.message")}
              </FieldLabel>
              <Textarea
                {...field}
                id="contact-message"
                aria-invalid={fieldState.invalid}
                className={cn(controlClass, "h-auto min-h-50 py-3")}
              />
              <FieldError errors={errorsFor(fieldState.error)} />
            </Field>
          )}
        />

        {/* Honeypot */}
        <div
          aria-hidden
          inert
          className="absolute left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        <div className="flex justify-end sm:col-span-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="h-10 rounded-full bg-secondary px-6 font-heading text-xs uppercase tracking-wider text-foreground hover:bg-secondary/80 disabled:opacity-70"
          >
            {isSubmitting ? t("form.submitting") : t("form.submit")}
            {isSubmitting ? <Spinner /> : <Send aria-hidden />}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
