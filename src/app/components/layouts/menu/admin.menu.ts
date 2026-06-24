import { Anchor, Barcode, Clapperboard, Dna } from "lucide-react";

export const adminMenu = [
    { to: "/admin", icon: Anchor, label: "Dashboard" },
    { to: "/admin/product", icon: Dna, label: "product" },
    { to: "/admin/transaction", icon: Clapperboard, label: "Transaction" },
    { to: "/admin/payment", icon: Barcode, label: "Payment" },
];

export type IMenu = typeof adminMenu[0]