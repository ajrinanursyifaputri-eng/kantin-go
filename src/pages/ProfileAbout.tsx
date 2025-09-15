import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, Coffee, Users, Mail } from 'lucide-react';

const ProfileAbout = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold text-foreground">Tentang Aplikasi</h1>
        </div>

        <div className="space-y-6">
          {/* App Info */}
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-2xl">GT</span>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground">GoTripGoEat</h2>
                <p className="text-muted-foreground">Versi 1.0.0</p>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aplikasi kantin digital yang memudahkan siswa dan penjual dalam bertransaksi makanan di lingkungan sekolah.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Fitur Utama</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Coffee className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Pesan makanan dari kantin sekolah</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Sistem pembeli dan penjual</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Interface yang mudah digunakan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Info */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Informasi Developer</h3>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Dikembangkan untuk memudahkan ekosistem kantin digital di lingkungan sekolah.</p>
                
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@gotripgoeat.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <span className="text-sm text-muted-foreground">Syarat & Ketentuan</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <span className="text-sm text-muted-foreground">Kebijakan Privasi</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <span className="text-sm text-muted-foreground">Lisensi Open Source</span>
              </Button>
            </CardContent>
          </Card>

          {/* Copyright */}
          <div className="text-center py-4">
            <p className="text-xs text-muted-foreground">
              © 2024 GoTripGoEat. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;