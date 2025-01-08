import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import WhatsAppButton from "./(home)/_components/whatsapp-button";

export default function CustomerLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
