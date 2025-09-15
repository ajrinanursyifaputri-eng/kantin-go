import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight,
  Edit
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      icon: User,
      label: 'Akun Saya',
      description: 'Kelola informasi akun Anda',
      onClick: () => navigate('/profile/account'),
    },
    {
      icon: Settings,
      label: 'Pengaturan',
      description: 'Tampilan dan preferensi',
      onClick: () => navigate('/profile/settings'),
    },
    {
      icon: Bell,
      label: 'Notifikasi',
      description: 'Atur notifikasi aplikasi',
      onClick: () => navigate('/profile/notifications'),
    },
    {
      icon: HelpCircle,
      label: 'Bantuan & FAQ',
      description: 'Pusat bantuan dan pertanyaan',
      onClick: () => navigate('/help'),
    },
    {
      icon: Info,
      label: 'Tentang Aplikasi',
      description: 'Informasi versi dan developer',
      onClick: () => navigate('/profile/about'),
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {user.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <Badge variant="secondary" className="mt-1">
                  {user.role === 'student' ? 'Pembeli' : 'Penjual'}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/profile/account')}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profil
            </Button>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent 
                className="p-4 flex items-center space-x-3"
                onClick={item.onClick}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}

          {/* Logout Button */}
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent 
              className="p-4 flex items-center space-x-3"
              onClick={handleLogout}
            >
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <LogOut className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-destructive">Keluar</h3>
                <p className="text-sm text-muted-foreground">Keluar dari akun Anda</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;