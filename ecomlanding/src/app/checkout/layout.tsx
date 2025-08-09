// this is /Users/sahibabc/ecomLanding/ecomlanding/src/app/checkout/layout.tsx
import Header from "../../components/layout/Header";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Only show logo/title, hide search/categories/icons */}
      {/* <Header showSearch={false} showCategories={false} showIcons={false} /> */}
      {children}
    </>
  );
}