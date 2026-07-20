'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, auth } from '@/components/firebase'
import { useSearchParams } from "next/navigation";

export function RegisterComp() {
  const t = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    otp: '',
    refcode: '',
    transactionId: '',
    agreeTrial: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [otpVerifyLoader, setOtpVerifyLoader] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const searchParams = useSearchParams();

  const isTrial = searchParams.get("tial") === "true"; // or "trial"


  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = e.target;
    if (name === 'agreeTrial') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    const transactionId = formData.transactionId.trim();
    if (!formData.agreeTrial) {
      if (!transactionId) {
        newErrors.transactionId = "Transaction ID is required";
      } else if (!/^[A-Za-z0-9_-]{8,50}$/.test(transactionId)) {
        newErrors.transactionId = "Enter a valid PhonePe Transaction ID";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!otpVerified) {
      newErrors.otp = 'Please verify OTP';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    try {
      if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        setErrors((prev) => ({
          ...prev,
          mobile: 'Enter a valid mobile number',
        }));
        return;
      }
      setOtpLoader(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${formData.mobile}`,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      alert('OTP sent successfully');
    } catch (err: any) {
      alert('Error ' + err.message);

    }
    setOtpLoader(false);

  };

  const handleVerifyOtp = async () => {
    try {
      if (formData.otp.length !== 6) {
        setErrors((prev) => ({
          ...prev,
          otp: 'Enter a valid 6-digit OTP',
        }));
        return;
      }
      setOtpVerifyLoader(true);
      const result = await window.confirmationResult.confirm(formData.otp);
      const verified = result?.user; // Replace with API response
      if (verified) {
        setOtpVerified(true);
        setErrors((prev) => ({
          ...prev,
          otp: '',
        }));
        alert('OTP verified successfully');
      }
    } catch (err) {
      setOtpVerified(false);
      setErrors((prev) => ({
        ...prev,
        otp: 'Invalid OTP',
      }));
    }
    setOtpVerifyLoader(false);

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Submitted:', formData);
    setOpen(true);
  };

  const handleSubmitForm = async () => {
    if (!validatePayment()) return;
    try {
      setLoading(true);
      setErr(null)
      const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_GATWAY}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res?.ok) {
        const result = await res.json();
        throw new Error(`API ERROR ${res.statusText} ${res.status} ${result?.error || ''}`);
      }
      submitRegister()

    } catch (err: any) {
      setErr(err.message)
    } finally {
      setLoading(false);
    }
  };

  function submitRegister() {
    if (isTrial) {
      alert(t('contact.trail_form_success'));
    } else {
      alert(t('contact.form_success'));
    }
    setFormData({
      name: '',
      email: '',
      mobile: '',
      address: '',
      otp: '',
      refcode: '',
      transactionId: '',
      agreeTrial: false
    });
    setOtpSent(false);
    setOtpVerified(false);
    setErrors({});
    setOpen(false);

  }

  if (loading) return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/100">
    <div className="w-[360px] rounded-xl bg-blue-500 p-6 shadow-xl ">Loading...</div></div>

  if (err) return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/100">
    <div className="w-[360px] rounded-xl p-6 shadow-xl bg-red-500">{err}</div></div>


  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/50"
    >
      <div id="recaptcha-container"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-2xl font-bold mb-6">Registration Form</div>

        <div className="border rounded-2xl p-8 hover:shadow-lg transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium">
                  {t('contact.form_name')}*
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">
                  {t('contact.form_email')}*
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full mt-2 px-4 py-3 rounded-lg border"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Referral Code</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    name="refcode"
                    value={formData.refcode}
                    onChange={handleChange}
                    maxLength={6}
                    placeholder="Enter Referral Code"
                    className="flex-1 px-4 py-3 rounded-lg border"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="text-sm font-medium">
                  {t('Mobile Number')}*
                </label>

                <div className="flex gap-2 mt-2">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="9876543210"
                    className="flex-1 px-4 py-3 rounded-lg border"
                  />

                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpVerified}
                    className={"mt-[10px]"}
                  >
                    {otpSent ? ('Resend OTP') : (!otpLoader ? 'Send OTP' : 'Loading...')}
                  </Button>
                </div>

                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* OTP */}
              {otpSent && (
                <div>
                  <label className="text-sm font-medium">OTP*</label>

                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={6}
                      placeholder="Enter OTP"
                      className="flex-1 px-4 py-3 rounded-lg border"
                    />

                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otpVerified}
                      className={"mt-[10px]"}
                    >
                      {otpVerified ? 'Verified ✓' : (!otpVerifyLoader ? 'Verify' : 'Loading...')}
                    </Button>
                  </div>

                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium">
                {t('Address')}*
              </label>

              <textarea
                name="address"
                rows={5}
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full mt-2 px-4 py-3 rounded-lg border resize-none"
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!otpVerified}
              className="bg-primary hover:bg-primary/90"
            >
              {t('Register')}
            </Button>
          </form>
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/100">
              <div className="w-[360px] rounded-xl bg-muted/50 p-6 shadow-xl ">
                {!formData?.agreeTrial &&
                  <>
                    <h2 className="mb-4 text-xl font-semibold text-center">
                      Pay Here, Rs 1200
                    </h2>

                    {/* QR Code */}
                    <div className="flex justify-center mb-5">
                      <img
                        src="/img/QR-Code.png"
                        alt="Payment QR"
                        className="h-56 w-56"
                      />
                    </div>

                    <input
                      name='transactionId'
                      type="text"
                      placeholder="Enter Transaction ID"
                      value={formData.transactionId}
                      onChange={handleChange}
                      className="w-full flex-1 px-4 py-3 rounded-lg border"
                    />
                    {errors.transactionId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.transactionId}
                      </p>
                    )}
                  </>
                }

                {isTrial &&
                  <>
                    {!formData?.agreeTrial &&
                      <div className="mt-4 flex gap-2 justify-center">
                        {t('OR')}
                      </div>
                    }

                    < div className="mt-4 flex items-start gap-2">
                      <input
                        id="freeTrial"
                        type="checkbox"
                        name='agreeTrial'
                        checked={formData.agreeTrial}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4"
                      />
                      <label htmlFor="freeTrial" className="text-sm">
                        {t('contact.trail_form_Condition')}
                      </label>
                    </div>
                  </>
                }
                <div className="flex justify-end gap-2 m-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded border px-4 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmitForm}
                    className="rounded bg-primary hover:bg-primary/90 px-4 py-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section >
  );
}