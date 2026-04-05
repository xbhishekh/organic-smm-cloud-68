import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Loader2, IndianRupee, ExternalLink, ArrowLeft,
  CheckCircle2, ShieldCheck, Send,
  ArrowRight, ImagePlus, Copy, Upload
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useCurrency } from '@/hooks/useCurrency';

const RAZORPAY_PAGE_URL = "https://razorpay.me/@organicsmm";
const TELEGRAM_SUPPORT = "https://t.me/whopcampaign";

export default function RazorpayDepositCard() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const { rates } = useCurrency();
  const [inrAmount, setInrAmount] = useState('');
  const [usdCredit, setUsdCredit] = useState<number>(0);
  const [paymentId, setPaymentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [step, setStep] = useState<'amount' | 'pay_and_submit' | 'done'>('amount');

  useEffect(() => {
    const val = parseFloat(inrAmount);
    if (!isNaN(val) && val > 0) {
      const inrRate = rates['INR'] || 83.5;
      setUsdCredit(parseFloat((val / inrRate).toFixed(2)));
    } else {
      setUsdCredit(0);
    }
  }, [inrAmount, rates]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      const reader = new FileReader();
      reader.onload = (ev) => setScreenshotPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: `${label} Copied`, description: `Copied to clipboard` });
  };

  const handleSubmitProof = async () => {
    if (!inrAmount || Number(inrAmount) < 30) {
      toast({ title: 'Invalid amount', description: 'Minimum deposit is ₹30', variant: 'destructive' });
      return;
    }
    if (!paymentId.trim() || paymentId.length < 8) {
      toast({ title: 'Invalid UTR', description: 'Please enter a valid Transaction ID/UTR', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      let screenshotUrl: string | null = null;
      if (screenshot) {
        const ext = screenshot.name.split('.').pop() || 'jpg';
        const path = `${user?.id}/${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('payment-proofs')
          .upload(path, screenshot, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from('payment-proofs').getPublicUrl(path);
        screenshotUrl = urlData.publicUrl;
      }

      const userId = user?.id || profile?.user_id;
      if (!userId) throw new Error('Session expired. Please refresh.');

      const { error: dbErr } = await supabase.from('transactions').insert({
        user_id: userId,
        type: 'deposit',
        amount: usdCredit,
        balance_after: 0,
        status: 'pending',
        payment_method: 'razorpay_manual',
        payment_reference: paymentId,
        description: JSON.stringify({ inr_amount: inrAmount, screenshot_url: screenshotUrl, type: 'razorpay_manual' }),
      });
      if (dbErr) throw dbErr;

      supabase.functions.invoke('send-telegram-notification', {
        body: {
          title: "🔥 NEW DEPOSIT REQUEST",
          message: `User: ${profile?.full_name || user?.email}\nAmount: ₹${inrAmount} (~$${usdCredit})\nUTR: ${paymentId}`,
          photo_url: screenshotUrl,
        },
      }).catch(console.error);

      setStep('done');
      toast({ title: 'Submitted!', description: 'Our team will verify shortly.' });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (err: any) {
      toast({ title: 'Failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', boxShadow: '0 2px 16px rgba(0,0,0,.04)' }}>

        {/* Progress bar */}
        <div className="flex gap-1 px-4 pt-3">
          <div className="h-1 flex-1 rounded-full" style={{ background: '#ec4899' }} />
          <div className="h-1 flex-1 rounded-full" style={{ background: ['pay_and_submit', 'done'].includes(step) ? '#ec4899' : 'rgba(0,0,0,.06)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ background: step === 'done' ? '#ec4899' : 'rgba(0,0,0,.06)' }} />
        </div>

        {/* Header */}
        <div className="p-5 pb-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(0,0,0,.04)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(236,72,153,.1)' }}>
            <IndianRupee className="h-5 w-5" style={{ color: '#ec4899' }} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold" style={{ color: '#1a1a2e' }}>UPI / Card Deposit</h2>
            <p className="text-[10px] font-medium" style={{ color: '#ec4899' }}>Manual Verification • 5-10 min</p>
          </div>
        </div>

        {/* STEP 1: Amount */}
        {step === 'amount' && (
          <div className="p-5 space-y-5">
            <div>
              <p className="text-[11px] font-semibold mb-3" style={{ color: '#888' }}>Quick Amount</p>
              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 2500].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setInrAmount(String(amt))}
                    className="py-3 rounded-xl text-[14px] font-bold transition-all"
                    style={{
                      background: inrAmount === String(amt) ? '#ec4899' : 'rgba(0,0,0,.02)',
                      color: inrAmount === String(amt) ? 'white' : '#555',
                      border: `1px solid ${inrAmount === String(amt) ? '#ec4899' : 'rgba(0,0,0,.06)'}`,
                    }}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold mb-2" style={{ color: '#888' }}>Manual Amount (INR)</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-bold" style={{ color: '#ec4899' }}>₹</span>
                <Input
                  type="number"
                  value={inrAmount}
                  onChange={(e) => setInrAmount(e.target.value)}
                  placeholder="0.00"
                  className="h-14 pl-10 rounded-xl text-xl font-bold"
                  style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.08)', color: '#1a1a2e' }}
                />
                {usdCredit > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold" style={{ color: '#10b981' }}>
                    ≈ ${usdCredit}
                  </span>
                )}
              </div>
              <p className="text-[10px] mt-2 text-center" style={{ color: '#bbb' }}>
                Min: ₹30 • 1 USD ≈ ₹{rates['INR'] || 83.5}
              </p>
            </div>

            <Button
              onClick={() => setStep('pay_and_submit')}
              disabled={!inrAmount || Number(inrAmount) < 30}
              className="w-full h-13 rounded-xl text-[14px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)', boxShadow: '0 4px 16px rgba(236,72,153,.3)' }}
            >
              Pay ₹{inrAmount || '0'} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* STEP 2: Payment & Submit */}
        {step === 'pay_and_submit' && (
          <div className="p-5 space-y-5">
            {/* Pay instruction */}
            <div className="rounded-xl p-4" style={{ background: 'rgba(236,72,153,.04)', border: '1px solid rgba(236,72,153,.1)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-[11px] font-bold text-white flex items-center justify-center" style={{ background: '#ec4899' }}>1</span>
                  <span className="text-[13px] font-bold" style={{ color: '#1a1a2e' }}>Pay Online</span>
                </div>
                <span className="text-[16px] font-bold" style={{ color: '#ec4899' }}>₹{inrAmount}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => window.open(RAZORPAY_PAGE_URL, '_blank')}
                  className="h-11 rounded-xl text-[12px] font-semibold text-white"
                  style={{ background: '#ec4899' }}
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Open Payment
                </Button>
                <Button
                  onClick={() => copyToClipboard(RAZORPAY_PAGE_URL, 'URL')}
                  variant="outline"
                  className="h-11 rounded-xl text-[12px] font-semibold"
                  style={{ border: '1px solid rgba(0,0,0,.1)', color: '#555' }}
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy Link
                </Button>
              </div>
              <p className="text-[10px] mt-3 p-2 rounded-lg" style={{ background: 'rgba(245,158,11,.06)', color: '#d97706', border: '1px solid rgba(245,158,11,.12)' }}>
                ⚠️ After payment, copy the <strong>12-Digit UTR ID</strong> to verify below.
              </p>
            </div>

            {/* Submit proof */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-[11px] font-bold text-white flex items-center justify-center" style={{ background: '#10b981' }}>2</span>
                <span className="text-[13px] font-bold" style={{ color: '#1a1a2e' }}>Submit Proof</span>
              </div>

              <div>
                <p className="text-[11px] font-medium mb-1.5" style={{ color: '#888' }}>Transaction ID / UTR *</p>
                <Input
                  placeholder="Enter 12-digit UTR"
                  value={paymentId}
                  onChange={(e) => setPaymentId(e.target.value)}
                  className="h-12 rounded-xl text-[14px] font-medium"
                  style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.08)', color: '#1a1a2e' }}
                />
              </div>

              <div>
                <p className="text-[11px] font-medium mb-1.5" style={{ color: '#888' }}>Screenshot (Optional)</p>
                <div className="relative h-24 rounded-xl flex items-center justify-center overflow-hidden" style={{ border: '2px dashed rgba(0,0,0,.08)', background: 'rgba(0,0,0,.01)' }}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                  />
                  {screenshotPreview ? (
                    <div className="flex items-center gap-3 px-4">
                      <img src={screenshotPreview} alt="Proof" className="w-14 h-14 rounded-lg object-cover" style={{ border: '2px solid #10b981' }} />
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold truncate" style={{ color: '#10b981' }}>{screenshot?.name}</p>
                        <p className="text-[10px]" style={{ color: '#bbb' }}>Ready to upload</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <ImagePlus className="h-5 w-5" style={{ color: '#ccc' }} />
                      <span className="text-[10px] font-medium" style={{ color: '#bbb' }}>Upload Screenshot</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSubmitProof}
                disabled={loading || !paymentId.trim()}
                className="w-full h-12 rounded-xl text-[13px] font-bold text-white"
                style={{ background: '#10b981' }}
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...</>
                ) : (
                  <><ShieldCheck className="h-4 w-4 mr-2" /> Verify Deposit</>
                )}
              </Button>
            </div>

            <button onClick={() => setStep('amount')} className="text-[11px] font-medium flex items-center gap-1 mx-auto" style={{ color: '#bbb' }}>
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
          </div>
        )}

        {/* STEP 3: Done */}
        {step === 'done' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(16,185,129,.1)' }}>
              <CheckCircle2 className="h-8 w-8" style={{ color: '#10b981' }} />
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>Submitted!</h3>
              <p className="text-[12px] mt-1" style={{ color: '#10b981' }}>Pending Admin Approval</p>
            </div>
            <p className="text-[13px] p-3 rounded-xl" style={{ background: 'rgba(0,0,0,.02)', color: '#666', border: '1px solid rgba(0,0,0,.04)' }}>
              Your deposit will be credited within <strong>5-10 minutes</strong>.
            </p>
            <Button onClick={() => setStep('amount')} className="w-full h-11 rounded-xl font-semibold" style={{ background: '#ec4899', color: 'white' }}>
              Done
            </Button>
          </div>
        )}

        {/* Support */}
        <div className="px-5 pb-5">
          <a href={TELEGRAM_SUPPORT} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl transition-colors"
            style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.04)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
              <span className="text-[11px] font-medium" style={{ color: '#999' }}>Need help?</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: '#0ea5e9' }}>
              <Send className="h-3 w-3" /> Telegram Support
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
