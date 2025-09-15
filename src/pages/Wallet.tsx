import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Minus, ArrowUpRight, ArrowDownRight, QrCode, CreditCard, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Wallet = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [selectedTopUpMethod, setSelectedTopUpMethod] = useState<string | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null);

  const topUpAmounts = [10000, 20000, 50000, 100000];
  const topUpMethods = [
    { id: 'transfer', name: 'Transfer Bank', icon: Building, description: 'Via Virtual Account' },
    { id: 'qr', name: 'Scan QR', icon: QrCode, description: 'QRIS Payment' },
    { id: 'counter', name: 'Kasir Sekolah', icon: CreditCard, description: 'Bayar di kasir' },
  ];

  const transactions = [
    { id: '1', type: 'in', amount: 50000, description: 'Top Up GoPay', date: '2024-01-15 10:30', status: 'completed' },
    { id: '2', type: 'out', amount: 15000, description: 'Nasi Goreng Spesial - Kantin Bu Siti', date: '2024-01-15 12:15', status: 'completed' },
    { id: '3', type: 'out', amount: 8000, description: 'Es Teh Manis + Roti Bakar', date: '2024-01-15 14:20', status: 'completed' },
    { id: '4', type: 'in', amount: 25000, description: 'Top Up via Transfer', date: '2024-01-14 09:45', status: 'completed' },
    { id: '5', type: 'out', amount: 12000, description: 'Mie Ayam Bakso', date: '2024-01-14 13:10', status: 'completed' },
  ];

  const handleTopUp = () => {
    if (topUpAmount && selectedTopUpMethod) {
      // Simulate successful top up
      updateUser({ balance: (user?.balance || 0) + topUpAmount });
      setShowTopUpModal(false);
      setSelectedTopUpMethod(null);
      setTopUpAmount(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="mr-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">GoPay Saldo</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Balance Card */}
        <Card className="bg-gradient-primary text-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm">Saldo GoPay</p>
                <p className="text-3xl font-bold">Rp {user?.balance?.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowTopUpModal(true)}
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Top Up
              </Button>
              <Button
                variant="secondary"
                disabled
                className="bg-white/10 text-white/60 border-white/20"
              >
                <Minus className="w-4 h-4 mr-2" />
                Tarik
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Scan QR</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <p className="text-sm font-medium">Transfer</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/promos')}>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🎁</span>
              </div>
              <p className="text-sm font-medium">Promo</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📊</span>
              </div>
              <p className="text-sm font-medium">Laporan</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'in' ? (
                        <ArrowDownRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'in' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'in' ? '+' : '-'}Rp {transaction.amount.toLocaleString()}
                    </p>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {transaction.status === 'completed' ? 'Berhasil' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Up Modal */}
      <Dialog open={showTopUpModal} onOpenChange={setShowTopUpModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Top Up Saldo</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="amount" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="amount">Jumlah</TabsTrigger>
              <TabsTrigger value="method">Metode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="amount" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {topUpAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={topUpAmount === amount ? 'default' : 'outline'}
                    onClick={() => setTopUpAmount(amount)}
                  >
                    Rp {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setTopUpAmount(0)}
              >
                Jumlah Lain
              </Button>
            </TabsContent>
            
            <TabsContent value="method" className="space-y-3">
              {topUpMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTopUpMethod === method.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedTopUpMethod(method.id)}
                >
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
          
          <Button
            variant="action"
            className="w-full"
            onClick={handleTopUp}
            disabled={!topUpAmount || !selectedTopUpMethod}
          >
            {topUpAmount ? `Top Up Rp ${topUpAmount.toLocaleString()}` : 'Pilih Jumlah'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;