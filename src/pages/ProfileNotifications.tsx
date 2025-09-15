import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Bell, ShoppingBag, Wallet, MessageCircle, Megaphone } from 'lucide-react';

const ProfileNotifications = () => {
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    orders: true,
    payments: true,
    promos: false,
    chat: true,
    system: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationSettings = [
    {
      key: 'orders' as const,
      icon: ShoppingBag,
      title: 'Pesanan',
      description: 'Notifikasi status pesanan dan pickup',
      enabled: notifications.orders,
    },
    {
      key: 'payments' as const,
      icon: Wallet,
      title: 'Pembayaran',
      description: 'Transaksi, top up, dan saldo',
      enabled: notifications.payments,
    },
    {
      key: 'promos' as const,
      icon: Megaphone,
      title: 'Promo & Penawaran',
      description: 'Diskon dan penawaran khusus',
      enabled: notifications.promos,
    },
    {
      key: 'chat' as const,
      icon: MessageCircle,
      title: 'Pesan',
      description: 'Chat dengan penjual dan support',
      enabled: notifications.chat,
    },
    {
      key: 'system' as const,
      icon: Bell,
      title: 'Sistem',
      description: 'Update aplikasi dan maintenance',
      enabled: notifications.system,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Notifikasi</h1>
        </div>

        <div className="space-y-4">
          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Pengaturan Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                      <setting.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{setting.title}</h3>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggle(setting.key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sound & Vibration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suara & Getaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Suara Notifikasi</h3>
                  <p className="text-sm text-muted-foreground">Bunyi ketika ada notifikasi baru</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Getaran</h3>
                  <p className="text-sm text-muted-foreground">Getar ketika ada notifikasi baru</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Do Not Disturb */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Jangan Ganggu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Mode Senyap</h3>
                  <p className="text-sm text-muted-foreground">Matikan semua notifikasi sementara</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileNotifications;