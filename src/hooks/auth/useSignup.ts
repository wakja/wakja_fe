'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signup } from '@/features/auth';
import type { SignupRequest } from '@/features/auth/types';

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: () => {
      router.push('/login');
    },
  });
}
