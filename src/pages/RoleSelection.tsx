import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Store } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const RoleSelection = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const selectRole = (role: 'student' | 'merchant') => {
    updateUser({ role });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Pilih Peran Anda</h1>
          <p className="text-white/80">Pilih bagaimana Anda akan menggunakan GoTripGoEat</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="bg-white/95 backdrop-blur-sm border-0 shadow-elegant hover:shadow-glow cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            onClick={() => selectRole('student')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Pembeli (Siswa)</CardTitle>
              <CardDescription>
                Pesan makanan dari kantin sekolah dengan mudah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Pesan makanan dari berbagai kantin</li>
                <li>• Kelola saldo digital</li>
                <li>• Lacak pesanan real-time</li>
                <li>• Gunakan promo & voucher</li>
              </ul>
              <Button variant="action" className="w-full">
                Lanjut sebagai Siswa
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-white/95 backdrop-blur-sm border-0 shadow-elegant hover:shadow-glow cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            onClick={() => selectRole('merchant')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Store className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Penjual (Kantin)</CardTitle>
              <CardDescription>
                Kelola kantin dan terima pesanan digital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Kelola menu & stok</li>
                <li>• Terima & proses pesanan</li>
                <li>• Lacak penjualan harian</li>
                <li>• Chat dengan pembeli</li>
              </ul>
              <Button variant="accent" className="w-full">
                Lanjut sebagai Penjual
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;