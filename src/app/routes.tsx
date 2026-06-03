import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import TopUp from "./pages/TopUp";
import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";  // ← nama file kamu
import SellAccount from "./pages/SellAccount";
import Profile from "./pages/Profile";
import Bantuan from "./pages/Bantuan";
import pulsa from "./pages/pulsa";
import Wallet from "./pages/Wallet";
import ChatRoom from "./pages/ChatRoom";  // ← halaman chat room baru

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,                  Component: Home },
      { path: "topup",                Component: TopUp },
      { path: "marketplace",          Component: Marketplace },
      { path: "marketplace/sell",     Component: SellAccount },   // ← sell HARUS sebelum :id
      { path: "marketplace/:id",      Component: ListingDetail },  // ← pakai ListingDetail
      { path: "profile",              Component: Profile },
      { path: "bantuan",              Component: Bantuan },
      { path: "layanandigital",       Component: pulsa },
      { path: "wallet",               Component: Wallet },
      { path: "chat",                 Component: ChatRoom },
      { path: "chat/:chatId",         Component: ChatRoom }, // ← route untuk chat room dengan id

    ],
  },
]);