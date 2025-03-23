import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Jméno a příjmení musí mít alespoň 3 znaky")
      .max(16, "Jméno a příjmení může mít maximálně 16 znaků"),
    username: z
      .string()
      .min(3, "Uživatelské jméno musí mít alespoň 3 znaky")
      .max(16, "Uživatelské jméno může mít maximálně 16 znaků"),
    email: z.string().email("Neplatný email"),
    password: z.string().min(6, "Heslo musí mít alespoň 6 znaků"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hesla se neshodují",
    path: ["confirmPassword"],
  });

export const changeUserDataSchema = z.object({
  fullName: z
    .string()
    .min(3, "Jméno a příjmení musí mít alespoň 3 znaky")
    .max(16, "Jméno a příjmení může mít maximálně 16 znaků"),
  tel: z.string().nullable(),
  email: z.string().email("Neplatný email"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string({
      message: "Pro změnu hesla je potřeba zadat staré heslo",
    }),
    newPassword: z
      .string({
        message: "Pro změnu hesla je potřeba zadat nové heslo",
      })
      .min(6, "Nové heslo musí mít alespoň 6 znaků"),
    confirmPassword: z.string({
      message: "Pro změnu hesla je potřeba zadat potvrzení nového hesla",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Hesla se neshodují",
    path: ["confirmPassword"],
  });
