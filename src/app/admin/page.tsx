"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

const ahbLogo = "/assets/ahb-logo-white.png";
const heroImage = "/assets/hero-students.jpg";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.error || "Authentication failed.");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-foreground">
      {/* Left Panel - Branding & Image */}
      <div className="hidden lg:flex w-1/2 relative bg-[#151b4d] items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Students"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1233] via-[#1a2266]/80 to-[#283492]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#283492] opacity-40 mix-blend-color" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 max-w-xl w-full flex flex-col h-full justify-between">
          <div className="mb-12">
            <img src={ahbLogo} alt="AHB Study Abroad Logo" className="h-16 lg:h-20 w-auto object-contain rounded" />
          </div>

          <div className="my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-sm mb-6">
              <ShieldCheck className="w-4 h-4 text-[#FFD40E]" />
              <span className="text-white text-xs font-semibold tracking-wider uppercase">AHB Study Abroad System</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-6 tracking-tight leading-tight">
              Administrative <br />
              <span className="text-[#FFD40E]">Workspace</span>
            </h1>

            <p className="text-blue-100/80 text-lg leading-relaxed max-w-md border-l-2 border-[#FFD40E]/50 pl-4">
              Centralized control for managing student applications, university partnerships, and global pathways.
            </p>
          </div>

          <div className="text-white/40 text-xs">
            © {new Date().getFullYear()} AHB Study Abroad. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <img src={ahbLogo} alt="AHB Study Abroad" className="h-12 w-auto mx-auto object-contain mb-4 rounded" />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#283492]/5 border border-[#283492]/10 rounded-sm">
              <ShieldCheck className="w-4 h-4 text-[#283492]" />
              <span className="text-[#283492] text-xs font-semibold tracking-wider uppercase">Admin Portal</span>
            </div>
          </div>

          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-gray-900 font-heading mb-2 tracking-tight">
              {isSignup ? "Create Account" : "Sign In"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isSignup
                ? "Set up your administrative credentials."
                : "Enter your credentials to access the workspace."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold text-sm">Email Address</Label>
              <div className="relative flex items-center group">
                <div className="absolute left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#283492] text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ahbstudy.com"
                  required
                  className="pl-11 rounded-sm border-gray-300 bg-white h-12 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold text-sm">Password</Label>
              <div className="relative flex items-center group">
                <div className="absolute left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#283492] text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-11 pr-11 rounded-sm border-gray-300 bg-white h-12 text-base text-gray-900 placeholder:text-gray-400 shadow-sm transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-gray-300 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-sm shadow-sm">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-sm bg-[#283492] hover:bg-[#1a2266] text-white font-semibold text-base shadow-md transition-all group"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isSignup ? "Create & Sign In" : "Sign In to Workspace"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              className="w-full text-sm text-gray-500 hover:text-[#283492] font-medium transition-colors focus:outline-none"
              onClick={() => { setIsSignup(!isSignup); setError(""); }}
            >
              {isSignup ? "Return to sign in" : "Create administrative account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
