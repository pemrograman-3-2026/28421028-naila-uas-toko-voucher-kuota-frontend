import { Anchor, BadgeDollarSign, Barcode, Clapperboard, CreditCard, Dna, ShoppingCart } from "lucide-react";

export const adminMenu = [
    { to: "/admin", icon: Anchor, label: "Dashboard" },
    { to: "/admin/product", icon: ShoppingCart, label: "Product" },
    { to: "/admin/transaction", icon: BadgeDollarSign, label: "Transaction" },
    { to: "/admin/payment", icon: CreditCard, label: "Payment" },
];

export type IMenu = typeof adminMenu[0]