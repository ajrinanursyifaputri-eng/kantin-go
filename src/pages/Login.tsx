import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, Mail, Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handlePhoneLogin = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setShowOtpModal(true);
    }, 1000);
  };

  const handleOtpVerification = () => {
    if (otp.length !== 6) return;
    
    // Create mock user
    const user: User = {
      id: '1',
      name: 'Siswa Demo',
      phone,
      role: 'student', // Will be selected next
      balance: 50000,
    };
    
    login(user);
    navigate('/role-selection');
  };

  const handleEmailLogin = () => {
    if (!email || !password) return;
    
    const user: User = {
      id: '1',
      name: 'Siswa Demo',
      email,
      phone: '081234567890',
      role: 'student',
      balance: 50000,
    };
    
    login(user);
    navigate('/role-selection');
  };

  const handleGoogleLogin = () => {
    const user: User = {
      id: '1',
      name: 'Siswa Demo',
      email: 'siswa@gmail.com',
      phone: '081234567890',
      role: 'student',
      balance: 50000,
    };
    
    login(user);
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">GoTripGoEat</h1>
          <p className="text-white/80">Kantin Digital Sekolah</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle>Masuk ke GoTripGoEat</CardTitle>
            <CardDescription>Pilih metode login untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">Nomor Telepon</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handlePhoneLogin} 
                  className="w-full" 
                  variant="action"
                  disabled={phone.length < 10 || loading}
                >
                  {loading ? 'Mengirim OTP...' : 'Kirim OTP'}
                </Button>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@sekolah.ac.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleEmailLogin} 
                  className="w-full" 
                  variant="action"
                  disabled={!email || !password}
                >
                  Masuk
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">atau</span>
                </div>
              </div>
              
              <Button 
                onClick={handleGoogleLogin}
                variant="outline" 
                className="w-full mt-4"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Masuk dengan Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OTP Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifikasi OTP</DialogTitle>
            <DialogDescription>
              Masukkan kode 6 digit yang dikirim ke {phone}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
            <Button 
              onClick={handleOtpVerification}
              className="w-full"
              variant="action"
              disabled={otp.length !== 6}
            >
              Verifikasi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;