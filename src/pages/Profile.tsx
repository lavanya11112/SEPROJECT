import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Percent, 
  Receipt, 
  Users, 
  Star, 
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RatingDialog } from "@/components/dialogs/RatingDialog";
import { EditProfileDialog } from "@/components/dialogs/EditProfileDialog";
import { EditAddressDialog } from "@/components/dialogs/EditAddressDialog";

const menuOptions = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Order History', icon: ShoppingBag },
  { id: 'promo', label: 'Promo Codes', icon: Percent },
  { id: 'transactions', label: 'My Transactions', icon: Receipt },
  { id: 'refer', label: 'Refer & Earn', icon: Users },
  { id: 'rate', label: 'Rate Us', icon: Star },
  { id: 'logout', label: 'Log-out', icon: LogOut },
];

export default function Profile() {
  const { user, profile, signOut } = useAuth();
  const [activeOption, setActiveOption] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCodes, setPromoCodes] = useState([
    { code: 'WELCOME10', discount: '10%', expiryDate: '2023-12-31' },
    { code: 'SPICY25', discount: '25%', expiryDate: '2023-09-30' },
    { code: 'FREESHIP', discount: 'Free Delivery', expiryDate: '2023-10-15' },
  ]);
  const navigate = useNavigate();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [showEditAddressDialog, setShowEditAddressDialog] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Could not load your orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);
  
  const handleMenuClick = async (optionId) => {
    if (optionId === 'logout') {
      await signOut();
      navigate('/');
    } else {
      setActiveOption(optionId);
      if (optionId === 'refer') {
        toast.info('Share this code with your friends: FRIEND25');
      } else if (optionId === 'rate') {
        setShowRatingDialog(true);
      }
    }
  };

  const handleEditProfile = () => {
    setShowEditProfileDialog(true);
  };

  const handleEditAddress = () => {
    setShowEditAddressDialog(true);
  };

  const handleProfileUpdate = async () => {
    await supabase.auth.refreshSession();
  };

  const handleViewAllOrders = () => {
    setActiveOption('orders');
  };
  
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
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'On the Way':
      case 'on_the_way':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">On the Way</Badge>;
      case 'Completed':
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const renderContent = () => {
    switch(activeOption) {
      case 'dashboard':
        return renderDashboard();
      case 'orders':
        return renderOrders();
      case 'promo':
        return renderPromoCodes();
      case 'transactions':
        return renderTransactions();
      case 'refer':
        return renderReferral();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleEditProfile}>
              <UserPen className="mr-1.5 h-3.5 w-3.5" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
        
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
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleEditAddress}>
              <Edit className="mr-1.5 h-3.5 w-3.5" />
              Edit Address
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Orders</CardTitle>
            <CardDescription>
              View your recent order history
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-sm" onClick={handleViewAllOrders}>
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-6">Loading your recent orders...</div>
          ) : orders.length > 0 ? (
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
                {orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0, 8).toUpperCase()}</TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>₹{order.total_amount?.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8" onClick={() => toast.info(`Order details for ${order.id.substring(0, 8).toUpperCase()} coming soon!`)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">You haven't placed any orders yet.</div>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderOrders = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>All your past orders</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6">Loading your orders...</div>
        ) : orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.substring(0, 8).toUpperCase()}</TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{order.order_items?.length || 0} items</TableCell>
                  <TableCell>₹{order.total_amount?.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => toast.info(`Order details for ${order.id.substring(0, 8).toUpperCase()} coming soon!`)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6">You haven't placed any orders yet.</div>
        )}
      </CardContent>
    </Card>
  );

  const renderPromoCodes = () => (
    <Card>
      <CardHeader>
        <CardTitle>Available Promo Codes</CardTitle>
        <CardDescription>Use these codes for special discounts</CardDescription>
      </CardHeader>
      <CardContent>
        {promoCodes.length > 0 ? (
          <div className="space-y-4">
            {promoCodes.map((promo, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">{promo.code}</p>
                  <p className="text-sm text-muted-foreground">Get {promo.discount} off</p>
                  <p className="text-xs text-muted-foreground">Valid until {promo.expiryDate}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(promo.code);
                  toast.success(`Code ${promo.code} copied to clipboard!`);
                }}>
                  Copy Code
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">No promo codes available at the moment.</div>
        )}
      </CardContent>
    </Card>
  );

  const renderTransactions = () => (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>All your financial transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-6">
          Your transaction history will appear here.
        </div>
      </CardContent>
    </Card>
  );

  const renderReferral = () => (
    <Card>
      <CardHeader>
        <CardTitle>Refer & Earn</CardTitle>
        <CardDescription>Share with friends and earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Referral Code</h3>
            <div className="border border-dashed border-primary rounded-md p-3 bg-primary/5 mb-4">
              <p className="text-xl font-mono font-semibold text-primary">FRIEND25</p>
            </div>
            <Button onClick={() => {
              navigator.clipboard.writeText("FRIEND25");
              toast.success("Referral code copied to clipboard!");
            }} className="w-full">
              Copy Code
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">How it works</h3>
            <ol className="space-y-2 text-left">
              <li className="flex items-start gap-2">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</div>
                <p>Share your code with friends who haven't tried our restaurant yet</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</div>
                <p>Your friend gets 25% off their first order</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</div>
                <p>You get ₹100 credit when they place their first order</p>
              </li>
            </ol>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={() => {
              const shareText = "Use my referral code FRIEND25 for 25% off your first order at Flavours of India!";
              if (navigator.share) {
                navigator.share({
                  title: 'Referral Code',
                  text: shareText,
                }).catch(() => {
                  navigator.clipboard.writeText(shareText);
                  toast.success("Share text copied to clipboard!");
                });
              } else {
                navigator.clipboard.writeText(shareText);
                toast.success("Share text copied to clipboard!");
              }
            }} className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Container>
          <div className="py-8 md:py-12">
            <h1 className="text-3xl font-medium mb-8">My Account</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                {renderContent()}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <EditProfileDialog
        open={showEditProfileDialog}
        onOpenChange={setShowEditProfileDialog}
        currentProfile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
      <EditAddressDialog
        open={showEditAddressDialog}
        onOpenChange={setShowEditAddressDialog}
        currentAddress={profile?.address}
        onProfileUpdate={handleProfileUpdate}
      />
      <RatingDialog 
        open={showRatingDialog} 
        onOpenChange={setShowRatingDialog} 
      />
      <Footer />
    </>
  );
}
