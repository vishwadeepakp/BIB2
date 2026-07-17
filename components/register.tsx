'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from '@/lib/use-translation';
import { useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, auth } from '@/components/firebase'

export function RegisterComp() {
  const t = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    otp: '',
    refcode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);


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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

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
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setErrors((prev) => ({
        ...prev,
        mobile: 'Enter a valid mobile number',
      }));
      return;
    }

    const appVerifier = window.recaptchaVerifier;

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      `+91${formData.mobile}`,
      appVerifier
    );

    window.confirmationResult = confirmationResult;


    // TODO: Call your Send OTP API here
    // await sendOtp(formData.mobile);

    setOtpSent(true);
    alert('OTP sent successfully');
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

      // TODO: Call your Verify OTP API here
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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    console.log('Submitted:', formData);

    alert(t('contact.form_success'));

    setFormData({
      name: '',
      email: '',
      mobile: '',
      address: '',
      otp: '',
      refcode: "",
    });

    setOtpSent(false);
    setOtpVerified(false);
    setErrors({});
  };

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
                    {otpSent ? 'Resend OTP' : 'Send OTP'}
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
                      {otpVerified ? 'Verified ✓' : 'Verify'}
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
        </div>
      </div>
    </section>
  );
}