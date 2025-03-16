
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Wallet, 
  Percent, 
  Receipt, 
  Share, 
  Users, 
  Star, 
  Settings, 
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  UserPen,
  Edit
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define the menu options for the sidebar
const menuOptions = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Order History', icon: ShoppingBag },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'promo', label: 'Promo Codes', icon: Percent },
  { id: 'transactions', label: 'My Transactions', icon: Receipt },
  { id: 'share', label: 'Share', icon: Share },
  { id: 'refer', label: 'Refer & Earn', icon: Users },
  { id: 'rate', label: 'Rate Us', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logout', label: 'Log-out', icon: LogOut },
];

// Sample orders data for demonstration
const sampleOrders = [
  { id: 'ORD-7829', date: '15 Jun 2023', total: 128.00, status: 'Completed' },
  { id: 'ORD-7830', date: '12 Jun 2023', total: 85.50, status: 'On the Way' },
  { id: 'ORD-7831', date: '10 Jun 2023', total: 42.25, status: 'Processing' },
  { id: 'ORD-7832', date: '05 Jun 2023', total: 76.80, status: 'Completed' },
];

export default function Profile() {
  const { user, profile, signOut } = useAuth();
  const [activeOption, setActiveOption] = useState('dashboard');
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const handleMenuClick = (optionId: string) => {
    if (optionId === 'logout') {
      signOut();
    } else {
      setActiveOption(optionId);
    }
  };
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      const names = profile.full_name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'On the Way':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">On the Way</Badge>;
      case 'Completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <div className="py-8 md:py-12">
            <h1 className="text-3xl font-medium mb-8">My Account</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Navigation Panel (Left Side) */}
              <Card className="lg:col-span-3">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {menuOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleMenuClick(option.id)}
                        className={cn(
                          "flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors",
                          activeOption === option.id 
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <option.icon className="mr-2 h-4 w-4" />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
              
              <div className="lg:col-span-9 space-y-6">
                {/* Profile and Billing Address Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Section */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Profile</CardTitle>
                      <CardDescription>
                        Manage your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt={profile?.full_name || user.email || ""} />
                        <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium text-lg">{profile?.full_name || "User"}</h3>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                        <p className="text-muted-foreground text-sm">Customer</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <UserPen className="mr-1.5 h-3.5 w-3.5" />
                        Edit Profile
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Billing Address Section */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">Billing Address</CardTitle>
                      <CardDescription>
                        Manage your billing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{profile?.full_name || "User"}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{profile?.address || "No address saved"}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{profile?.phone_number || "No phone number saved"}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Edit className="mr-1.5 h-3.5 w-3.5" />
                        Edit Address
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Recent Order History Section */}
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Recent Orders</CardTitle>
                      <CardDescription>
                        View your recent order history
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 text-sm">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="h-8">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
