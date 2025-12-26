"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowRight, Check, Lock, MailIcon, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");

  return (
    <Card className="glass-card border-primary/10 bg-secondary/30 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Sign up to manage your subscriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-1 grid grid-cols-3 gap-1 text-xs">
              <PasswordHint label="8+ characters" valid={password.length >= 8} />
              <PasswordHint label="Uppercase" valid={/[A-Z]/.test(password)} />
              <PasswordHint label="Number" valid={/\d/.test(password)} />
            </div>
          </div>
          <div className="space-y-3">
            <Label>Your Role</Label>
            <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-3 gap-2">
              {["freelancer", "startup", "business"].map((value) => (
                <RoleCard key={value} value={value} selected={role === value} />
              ))}
            </RadioGroup>
          </div>
        </div>

        <Button className="w-full blue-gradient" size="lg">
          Create Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

const PasswordHint = ({ label, valid }: { label: string; valid: boolean }) => (
  <div className={cn("flex items-center gap-1", valid ? "text-green-500" : "text-muted-foreground")}>
    {valid ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
    {label}
  </div>
);

const RoleCard = ({ value, selected }: { value: string; selected: boolean }) => (
  <Label
    htmlFor={value}
    className={cn(
      "flex cursor-pointer flex-col items-center justify-between rounded-md border border-border p-4 hover:bg-accent",
      selected && "border-primary bg-primary/5"
    )}
  >
    <RadioGroupItem value={value} id={value} className="sr-only" />
    <span className="mb-2 text-sm font-medium capitalize">{value}</span>
  </Label>
);
