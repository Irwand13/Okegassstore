import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import TopUp from "./pages/TopUp";
import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";
import SellAccount from "./pages/SellAccount";
import Profile from "./pages/Profile";
import Bantuan from "./pages/Bantuan";
import LayananDigital from "./pages/pulsa";   // rename import biar lebih jelas
import Wallet from "./pages/Wallet";
import ChatRoom from "./pages/ChatRoom";
import inbox from "./pages/inbox";  // inbox page

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,                  Component: Home },
      { path: "topup",                Component: TopUp },           // khusus top up game (ML, FF, dll)
      { path: "layanandigital",       Component: LayananDigital },  // pulsa, PLN, ewallet — pakai ?tab=
      { path: "marketplace",          Component: Marketplace },
      { path: "marketplace/sell",     Component: SellAccount },
      { path: "marketplace/:id",      Component: ListingDetail },
      { path: "profile",              Component: Profile },
      { path: "bantuan",              Component: Bantuan },
      { path: "wallet",               Component: Wallet },
      { path: "chat",                 Component: ChatRoom },
      { path: "chat/:chatId",         Component: ChatRoom },
      { path: "inbox",                Component: inbox },  // inbox page
    ],
  },
]);