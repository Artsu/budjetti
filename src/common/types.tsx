export type Account = "op" | "nordea";

export interface Entry {
  id?: string;
  amount: number;
  date: Date;
  category: string;
  transceiver: string;
  account: Account;
}
