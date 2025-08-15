import Navbar from '@/components/navbar';
import { Separator } from "@/components/ui/separator"
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Separator color='white'/>
      {children}
    </div>
  );
}