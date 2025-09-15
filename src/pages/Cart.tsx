import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Minus, Plus, Trash2, Clock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const discount = appliedPromo === 'SIANG20' ? total * 0.2 : 0;
  const finalTotal = total - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
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
              <h1 className="text-xl font-bold">Keranjang</h1>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Keranjang Kosong</h2>
            <p className="text-muted-foreground mb-6">Belum ada makanan yang ditambahkan ke keranjang</p>
            <Button variant="action" onClick={() => navigate('/food-catalog')}>
              Mulai Belanja
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold">Keranjang ({items.length} item)</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Hapus Semua
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.merchantName}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.estimatedTime} menit</span>
                    </div>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground mt-1">Catatan: {item.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-accent">Rp {item.price.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="mx-3 font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive mt-2"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Promo Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Promo & Voucher</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                <div>
                  <p className="font-medium text-accent">Diskon 20% Makan Siang</p>
                  <p className="text-sm text-muted-foreground">Min. pembelian Rp 15.000</p>
                </div>
                <Button
                  variant={appliedPromo === 'SIANG20' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAppliedPromo(appliedPromo === 'SIANG20' ? null : 'SIANG20')}
                  disabled={total < 15000}
                >
                  {appliedPromo === 'SIANG20' ? 'Digunakan' : 'Gunakan'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon (SIANG20)</span>
                  <span>-Rp {discount.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-accent">Rp {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/50 p-4 md:relative md:border-t-0 md:bg-transparent">
        <div className="container mx-auto">
          <Button
            variant="action"
            className="w-full h-12"
            onClick={() => navigate('/checkout')}
          >
            Lanjut ke Pembayaran • Rp {finalTotal.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;