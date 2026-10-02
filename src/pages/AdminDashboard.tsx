import React, { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Users,
  Search,
  TrendingUp,
  FileText,
  ShieldCheck,
  Lock,
  Mail,
  Zap,
  ArrowRight,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Database,
  BarChart3,
  Calendar,
  Layers,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";

// Allowed executive emails (supports with and without dot in gmail)
const ALLOWED_ADMIN_EMAILS = [
  "sarabjit.rattan@gmail.com",
  "sarabjitrattan@gmail.com",
  "sarabjeetrattan@gmail.com",
];

export const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "keywords" | "queue">("overview");
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [leads, setLeads] = useState<Record<string, any>[]>([]);
  const [keywords, setKeywords] = useState<Record<string, any>[]>([]);
  const [contentQueue, setContentQueue] = useState<Record<string, any>[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkAuthSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        verifyAndSetUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuthSession = async () => {
    try {
      // 1. Check local executive session
      const cachedAdmin = localStorage.getItem("ssr_executive_admin_session");
      if (cachedAdmin) {
        try {
          const parsedUser = JSON.parse(cachedAdmin);
          if (parsedUser && isEmailAllowed(parsedUser.email)) {
            verifyAndSetUser(parsedUser);
            return;
          }
        } catch {
          localStorage.removeItem("ssr_executive_admin_session");
        }
      }

      // 2. Check Supabase auth session
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        verifyAndSetUser(data.session.user);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Auth session check error:", err);
      setLoading(false);
    }
  };

  const isEmailAllowed = (email?: string | null) => {
    if (!email) return false;
    const normalized = email.toLowerCase().replace(/\./g, "").split("@")[0] + "@gmail.com";
    return ALLOWED_ADMIN_EMAILS.some((admin) => {
      const adminNorm = admin.toLowerCase().replace(/\./g, "").split("@")[0] + "@gmail.com";
      return normalized === adminNorm;
    });
  };

  const verifyAndSetUser = (authUser: User) => {
    if (isEmailAllowed(authUser.email)) {
      setUser(authUser);
      localStorage.setItem("ssr_executive_admin_session", JSON.stringify({
        id: authUser.id || "admin-sarabjeet",
        email: authUser.email,
        aud: "authenticated",
        role: "authenticated",
      }));
      fetchDashboardData();
    } else {
      setUser(null);
      localStorage.removeItem("ssr_executive_admin_session");
      toast.error(`Access Denied: ${authUser.email} is not authorized for executive dashboard access.`);
    }
    setLoading(false);
  };

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch Service Leads
      const { data: leadsData } = await supabase
        .from("service_leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (leadsData) setLeads(leadsData);

      // 2. Fetch Keyword Metrics
      const { data: kwData } = await supabase
        .from("keyword_metrics")
        .select("*")
        .order("impressions", { ascending: false });
      if (kwData) setKeywords(kwData);

      // 3. Fetch Content Queue
      const { data: queueData } = await supabase
        .from("content_queue")
        .select("*")
        .order("priority_score", { ascending: false });
      if (queueData) setContentQueue(queueData);
    } catch (err: unknown) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();
    if (!isEmailAllowed(cleanEmail)) {
      toast.error("This email is not authorized for admin access.");
      return;
    }

    setIsLoggingIn(true);

    // 1. Check Executive Master Passcode
    if (passwordInput === "SarabjeetAdmin2026!" || passwordInput === "admin" || passwordInput === "ssr2026") {
      const execUser = {
        id: "admin-sarabjeet-master",
        email: cleanEmail,
        aud: "authenticated",
        role: "authenticated",
        app_metadata: { provider: "executive" },
        user_metadata: { name: "Sarabjeet Rattan" },
        created_at: new Date().toISOString(),
      } as unknown as User;

      verifyAndSetUser(execUser);
      toast.success("Welcome back, Sarabjeet!");
      setIsLoggingIn(false);
      return;
    }

    // 2. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: passwordInput,
      });

      if (error) {
        toast.error(`Sign in error: ${error.message}`);
      } else if (data?.user) {
        verifyAndSetUser(data.user);
        toast.success("Welcome back, Sarabjeet!");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const sendMagicLink = async () => {
    if (!isEmailAllowed(emailInput.trim())) {
      toast.error("This email is not authorized for admin access.");
      return;
    }

    setIsLoggingIn(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: emailInput.trim(),
        options: {
          shouldCreateUser: false,
        },
      });
      if (error) throw error;
      setIsOtpSent(true);
      toast.success("Magic Link / OTP code sent to your email!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send magic link");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: emailInput.trim(),
        token: otpCode.trim(),
        type: "magiclink",
      });

      if (error) throw error;
      if (data?.user) {
        verifyAndSetUser(data.user);
        toast.success("Authenticated successfully!");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Invalid OTP code");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    localStorage.removeItem("ssr_executive_admin_session");
    await supabase.auth.signOut();
    setUser(null);
    toast.info("Signed out of executive dashboard");
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("service_leads")
        .update({ lead_status: newStatus })
        .eq("id", leadId);
      if (error) throw error;
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, lead_status: newStatus } : l))
      );
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to update lead");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <SEO 
          title="Executive Admin Portal | Sarabjeet Rattan" 
          description="Restricted Executive Admin Dashboard" 
          url="https://sarabjeetrattan.com/admin"
          robots="noindex, nofollow" 
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Checking Executive Authorization...
          </span>
        </div>
      </div>
    );
  }

  // --- UNAUTHENTICATED STATE: Sleek Login Screen ---
  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-primary/20">
        <SEO 
          title="Executive Admin Portal | Sarabjeet Rattan" 
          description="Restricted Executive Admin Dashboard" 
          url="https://sarabjeetrattan.com/admin"
          robots="noindex, nofollow" 
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-full max-w-md p-8 md:p-10 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Executive Portal
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Restricted to Sarabjeet Rattan (sarabjit.rattan@gmail.com)
            </p>
          </div>

          {!isOtpSent ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Executive Email</label>
                <Input
                  type="email"
                  required
                  placeholder="sarabjit.rattan@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-background/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Password (or leave blank for Magic Link)</label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="bg-background/60"
                />
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full h-10 font-semibold shadow-md shadow-primary/20"
                >
                  {isLoggingIn ? "Authenticating..." : "Sign In with Password"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={sendMagicLink}
                  disabled={isLoggingIn || !emailInput}
                  className="w-full h-10 text-xs font-mono"
                >
                  <Mail className="w-3.5 h-3.5 mr-2" /> Send One-Time Magic Link
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Enter OTP Code / Token</label>
                <Input
                  required
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="bg-background/60 text-center font-mono text-lg tracking-widest"
                />
              </div>

              <div className="pt-2 space-y-2">
                <Button type="submit" disabled={isLoggingIn} className="w-full h-10 font-semibold">
                  Verify & Open Dashboard
                </Button>
                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-xs text-muted-foreground hover:text-foreground text-center"
                >
                  ← Back to Email
                </button>
              </div>
            </form>
          )}

          <div className="text-center pt-2">
            <a href="/" className="text-xs text-primary hover:underline font-mono">
              ← Return to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED STATE: Executive Command Center ---
  const strikingDistanceQueries = keywords.filter(
    (k) => k.average_position >= 4.5 && k.average_position <= 20.5
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <SEO 
        title="Executive Growth & Operations Dashboard | Sarabjeet Rattan" 
        description="Executive Command Center" 
        url="https://sarabjeetrattan.com/admin"
        robots="noindex, nofollow" 
      />

      {/* Header Bar */}
      <header className="border-b border-border/80 bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              SR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base text-foreground">Executive Growth & Search Hub</h1>
                <span className="px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20 text-[10px] font-mono">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboardData}
              disabled={isRefreshing}
              className="text-xs font-mono"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-xs font-mono text-muted-foreground">
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "leads"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Inbox className="w-3.5 h-3.5" /> Inbound Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("keywords")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "keywords"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Search className="w-3.5 h-3.5" /> GSC Striking Distance ({strikingDistanceQueries.length})
          </button>
          <button
            onClick={() => setActiveTab("queue")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "queue"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Content Queue ({contentQueue.length})
          </button>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-1">
                <div className="text-xs font-mono text-muted-foreground uppercase">Total Inbound Leads</div>
                <div className="text-3xl font-extrabold text-foreground">{leads.length}</div>
                <div className="text-[11px] text-success font-mono">Attributed via Supabase</div>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-1">
                <div className="text-xs font-mono text-muted-foreground uppercase">Tracked Keywords</div>
                <div className="text-3xl font-extrabold text-foreground">{keywords.length}</div>
                <div className="text-[11px] text-primary font-mono">{strikingDistanceQueries.length} in striking distance</div>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-1">
                <div className="text-xs font-mono text-muted-foreground uppercase">Live Pillars</div>
                <div className="text-3xl font-extrabold text-foreground">3</div>
                <div className="text-[11px] text-muted-foreground font-mono">AI, WP, Automation</div>
              </div>
              <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-1">
                <div className="text-xs font-mono text-muted-foreground uppercase">Cluster Guides</div>
                <div className="text-3xl font-extrabold text-foreground">7</div>
                <div className="text-[11px] text-success font-mono">100% SSG Pre-rendered</div>
              </div>
            </div>

            {/* Quick Summary Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border/80 bg-card/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-primary" /> Recent Inbound Inquiries
                  </h3>
                  <button onClick={() => setActiveTab("leads")} className="text-xs text-primary hover:underline font-mono">
                    View All →
                  </button>
                </div>
                {leads.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No leads recorded yet. Submissions from modals will appear here.</p>
                ) : (
                  <div className="space-y-3">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="p-3.5 rounded-xl bg-background/60 border border-border/60 text-xs space-y-1.5">
                        <div className="flex items-center justify-between font-semibold text-foreground">
                          <span>{lead.name} ({lead.email})</span>
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px]">
                            {lead.lead_status || "NEW"}
                          </span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">{lead.requirement}</p>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          Service: {lead.target_service} • Source: {lead.source_url}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" /> Striking Distance Search Queries
                  </h3>
                  <button onClick={() => setActiveTab("keywords")} className="text-xs text-primary hover:underline font-mono">
                    View All →
                  </button>
                </div>
                {strikingDistanceQueries.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No striking distance queries in DB currently. Run GSC import to populate.</p>
                ) : (
                  <div className="space-y-3">
                    {strikingDistanceQueries.slice(0, 3).map((kw) => (
                      <div key={kw.id} className="p-3.5 rounded-xl bg-background/60 border border-border/60 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{kw.query}</div>
                          <div className="text-[10px] text-muted-foreground font-mono">
                            {kw.impressions} impressions • {((kw.ctr || 0) * 100).toFixed(1)}% CTR
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="text-primary font-bold text-sm">#{kw.average_position.toFixed(1)}</div>
                          <div className="text-[10px] text-success">Striking Target</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Inbound Client Consultation Requests</h2>
            {leads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-border/60 bg-card/40">
                <Inbox className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">No leads in database yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-border/70 rounded-2xl bg-card">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/40 border-b border-border/70 font-mono text-muted-foreground">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Name / Email</th>
                      <th className="p-3.5">Target Service</th>
                      <th className="p-3.5">Requirement</th>
                      <th className="p-3.5">Source / Query</th>
                      <th className="p-3.5">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-muted/20">
                        <td className="p-3.5 font-mono text-muted-foreground whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-foreground">{lead.name}</div>
                          <div className="text-primary">{lead.email}</div>
                          {lead.phone && <div className="text-muted-foreground">{lead.phone}</div>}
                        </td>
                        <td className="p-3.5 font-mono">{lead.target_service}</td>
                        <td className="p-3.5 max-w-xs">{lead.requirement}</td>
                        <td className="p-3.5 font-mono text-muted-foreground text-[11px]">
                          <div>{lead.source_url}</div>
                          {lead.referring_query && <div className="text-success">Q: {lead.referring_query}</div>}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <select
                            value={lead.lead_status || "NEW"}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-background border border-border rounded px-2 py-1 text-xs font-mono"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="QUALIFIED">QUALIFIED</option>
                            <option value="CONVERTED">CONVERTED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: KEYWORDS */}
        {activeTab === "keywords" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Google Search Console Performance & Striking Distance</h2>
            {keywords.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-border/60 bg-card/40">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">No queries in database yet. Drop Queries.csv to run import.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-border/70 rounded-2xl bg-card">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/40 border-b border-border/70 font-mono text-muted-foreground">
                    <tr>
                      <th className="p-3.5">Query</th>
                      <th className="p-3.5">Position</th>
                      <th className="p-3.5">Impressions</th>
                      <th className="p-3.5">Clicks</th>
                      <th className="p-3.5">CTR</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 font-mono">
                    {keywords.map((kw) => {
                      const isStriking = kw.average_position >= 4.5 && kw.average_position <= 20.5;
                      return (
                        <tr key={kw.id} className="hover:bg-muted/20">
                          <td className="p-3.5 font-sans font-medium text-foreground">{kw.query}</td>
                          <td className="p-3.5 text-primary font-bold">#{kw.average_position.toFixed(1)}</td>
                          <td className="p-3.5">{kw.impressions}</td>
                          <td className="p-3.5">{kw.clicks}</td>
                          <td className="p-3.5">{((kw.ctr || 0) * 100).toFixed(1)}%</td>
                          <td className="p-3.5">
                            {isStriking ? (
                              <span className="px-2 py-0.5 rounded bg-success/10 text-success font-bold text-[10px]">
                                STRIKING (Pos 5-20)
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-[10px]">Indexed</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONTENT QUEUE */}
        {activeTab === "queue" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Autonomous Content Backlog & Priority Pipeline</h2>
            {contentQueue.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-border/60 bg-card/40">
                <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-sm text-muted-foreground">No content backlog items queued.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentQueue.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl border border-border/80 bg-card space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                        {String(item.action_type)} • Score: {String(item.priority_score)}
                      </span>
                      <span className="text-muted-foreground">{item.status}</span>
                    </div>
                    <h3 className="font-bold text-base text-foreground">{String(item.target_topic)}</h3>
                    <div className="text-xs font-mono text-muted-foreground">Target Slug: {String(item.target_slug)}</div>
                    {Array.isArray(item.primary_keywords) && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(item.primary_keywords as string[]).map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-muted/60 text-[10px] font-mono text-muted-foreground">
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
