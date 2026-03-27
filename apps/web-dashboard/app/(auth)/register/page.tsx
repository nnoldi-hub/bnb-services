'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth';

const registerSchema = z.object({
  email: z.string().email('Email invalid'),
  password: z.string()
    .min(8, 'Parola trebuie să aibă minim 8 caractere')
    .regex(/[A-Z]/, 'Parola trebuie să conțină o literă mare')
    .regex(/[a-z]/, 'Parola trebuie să conțină o literă mică')
    .regex(/[0-9]/, 'Parola trebuie să conțină o cifră')
    .regex(/[@$!%*?&]/, 'Parola trebuie să conțină un caracter special'),
  firstName: z.string().min(2, 'Prenumele este obligatoriu'),
  lastName: z.string().min(2, 'Numele este obligatoriu'),
  phoneNumber: z.string().min(10, 'Număr de telefon invalid'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await apiClient.register(data);
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Înregistrare eșuată');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Creare Cont
          </CardTitle>
          <CardDescription className="text-center">
            Înregistrează-te pentru a gestiona proprietățile tale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prenume</Label>
                <Input
                  id="firstName"
                  placeholder="Ion"
                  {...register('firstName')}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nume</Label>
                <Input
                  id="lastName"
                  placeholder="Popescu"
                  {...register('lastName')}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplu@email.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Telefon</Label>
              <Input
                id="phoneNumber"
                placeholder="0712345678"
                {...register('phoneNumber')}
                disabled={isLoading}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Min. 8 caractere: literă mare, mică, cifră, caracter special
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Se încarcă...' : 'Înregistrare'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Ai deja cont? </span>
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Autentifică-te
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
