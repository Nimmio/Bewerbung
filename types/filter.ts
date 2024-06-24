import { $Enums } from "@prisma/client";

export type Filter = [string, string, string | Date | $Enums.State];
