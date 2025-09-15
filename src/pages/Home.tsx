import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  MapPin, 
  Search, 
  UtensilsCrossed, 
  Clock, 
  Wallet, 
  Gift, 
  History, 
  HelpCircle,
  Calendar,
  Heart
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('SMA Negeri X - Blok A');

  const locations = [
    'SMA Negeri X - Blok A',
    'SMA Negeri X - Blok B', 
    'SMA Negeri X - Kantin Utama',
    'SMA Negeri X - Koperasi'
  ];

  const mainFeatures = [
    {
      icon: UtensilsCrossed,
      title: 'Beli Makanan',
      subtitle: 'Pesan dari kantin',
      color: 'bg-gradient-primary',
      action: () => navigate('/food-catalog')
    },
    {
      icon: Clock,
      title: 'Preorder',
      subtitle: 'Jadwalkan pesanan',
      color: 'bg-gradient-accent',
      action: () => navigate('/preorder')
    },
    {
      icon: Wallet,
      title: 'Saldo',
      subtitle: `Rp ${user?.balance?.toLocaleString() || '0'}`,
      color: 'bg-info',
      action: () => navigate('/wallet')
    },
    {
      icon: Gift,
      title: 'Promo',
      subtitle: '3 promo aktif',
      color: 'bg-warning',
      action: () => navigate('/promos')
    },
    {
      icon: History,
      title: 'Riwayat',
      subtitle: 'Pesanan sebelumnya',
      color: 'bg-success',
      action: () => navigate('/orders')
    },
    {
      icon: Heart,
      title: 'Favorit',
      subtitle: 'Menu kesukaan',
      color: 'bg-destructive',
      action: () => navigate('/favorites')
    }
  ];

  if (user?.role === 'merchant') {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard Penjual</h1>
          <p className="text-muted-foreground">Kelola kantin Anda dengan mudah</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium">Pesanan Hari Ini</h3>
              <p className="text-2xl font-bold">24</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-accent text-white">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium">Penjualan Hari Ini</h3>
              <p className="text-2xl font-bold">Rp 480K</p>
            </CardContent>
          </Card>
          <Card className="bg-warning text-white">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium">Menu Aktif</h3>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card className="bg-info text-white">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium">Rating</h3>
              <p className="text-2xl font-bold">4.8⭐</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Pesanan Masuk</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Pesanan #{order}001</p>
                      <p className="text-sm text-muted-foreground">Nasi Goreng + Es Teh</p>
                    </div>
                    <Button variant="action" size="sm">Terima</Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/merchant/orders')}>
                Lihat Semua Pesanan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Menu Populer</h3>
              <div className="space-y-3">
                {['Nasi Goreng', 'Mie Ayam', 'Bakso'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="font-medium">{item}</span>
                    <span className="text-sm text-muted-foreground">{15 - index * 3} terjual</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/merchant/menu')}>
                Kelola Menu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with Location and Search */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => setShowLocationModal(true)}
              className="flex items-center space-x-2 text-left p-0 h-auto"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Lokasi pickup</p>
                <p className="font-medium">{selectedLocation}</p>
              </div>
            </Button>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Saldo</p>
              <p className="font-bold text-primary">Rp {user?.balance?.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari makanan atau nama penjual..."
              className="pl-10"
              onClick={() => navigate('/search')}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Halo, {user?.name}! 👋</h1>
          <p className="text-muted-foreground">Mau pesan makanan apa hari ini?</p>
        </div>

        {/* Main Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {mainFeatures.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              onClick={feature.action}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Pesanan Terakhir</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div>
                  <p className="font-medium">Nasi Goreng Spesial</p>
                  <p className="text-sm text-muted-foreground">Kantin Bu Siti</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Pesan Lagi
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Promo Hari Ini</h3>
              <div className="bg-accent/10 rounded-lg p-3 mb-4">
                <p className="font-medium text-accent">Diskon 20% Makan Siang</p>
                <p className="text-sm text-muted-foreground">Min. pembelian Rp 15.000</p>
              </div>
              <Button variant="accent" size="sm" className="w-full">
                Gunakan Promo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-6 text-center">
            <HelpCircle className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Butuh Bantuan?</h3>
            <p className="text-sm text-white/80 mb-4">Chat dengan admin sekolah untuk bantuan</p>
            <Button variant="secondary" size="sm" onClick={() => navigate('/help')}>
              Hubungi Admin
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Location Selection Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pilih Lokasi Pickup</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {locations.map((location) => (
              <Button
                key={location}
                variant={location === selectedLocation ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedLocation(location);
                  setShowLocationModal(false);
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {location}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;