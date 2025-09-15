import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Moon, Sun, Globe } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

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
          <h1 className="text-xl font-bold text-foreground">Pengaturan</h1>
        </div>

        <div className="space-y-4">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                {isDark ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
                Tampilan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Mode Gelap</h3>
                  <p className="text-sm text-muted-foreground">
                    Gunakan tema gelap untuk kenyamanan mata
                  </p>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Bahasa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Pilih Bahasa
                </label>
                <Select defaultValue="id">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Perubahan bahasa akan diterapkan setelah restart aplikasi
                </p>
              </div>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <h3 className="font-medium text-foreground">GoTripGoEat</h3>
                <p className="text-sm text-muted-foreground">Versi 1.0.0</p>
                <p className="text-xs text-muted-foreground">
                  Aplikasi Kantin Digital untuk Sekolah
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;