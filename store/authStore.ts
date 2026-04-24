import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  completeKycStep,
  normalizeKycProfile,
  resetKycProfile,
  submitKycProfile,
  updateKycDraft as updateKycDraftProfile,
  type KycDraft,
  type KycProfile,
  type KycStepId,
} from '@/lib/kyc';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'merchant' | 'user';
  verified: boolean;
  kyc: KycProfile;
}

type AuthUserInput = Omit<AuthUser, 'kyc'> & {
  kyc?: KycProfile;
};

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: (user: AuthUserInput) => void;
  logout: () => void;
  setVerified: (status: boolean) => void;
  updateKycDraft: <T extends KycStepId>(stepId: T, values: Partial<KycDraft[T]>) => void;
  completeKycStep: (stepId: KycStepId) => void;
  submitKyc: () => void;
  resetKyc: () => void;
  normalizePersistedUser: () => void;
  setHasHydrated: (status: boolean) => void;
}

const normalizeUser = (user: AuthUserInput | AuthUser | null): AuthUser | null => {
  if (!user) {
    return null;
  }

  return {
    ...user,
    kyc: normalizeKycProfile(user.kyc, {
      name: user.name,
      email: user.email,
    }),
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      login: (user) => set({ user: normalizeUser(user), isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setVerified: (status) => set((state) => ({ 
        user: state.user ? { ...state.user, verified: status } : null 
      })),
      updateKycDraft: (stepId, values) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                kyc: updateKycDraftProfile(state.user.kyc, stepId, values),
              }
            : null,
        })),
      completeKycStep: (stepId) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, kyc: completeKycStep(state.user.kyc, stepId) }
            : null,
        })),
      submitKyc: () =>
        set((state) => ({
          user: state.user
            ? { ...state.user, kyc: submitKycProfile(state.user.kyc) }
            : null,
        })),
      resetKyc: () =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                kyc: resetKycProfile({
                  name: state.user.name,
                  email: state.user.email,
                }),
              }
            : null,
        })),
      normalizePersistedUser: () =>
        set((state) => ({
          user: normalizeUser(state.user),
        })),
      setHasHydrated: (status) => set({ hasHydrated: status }),
    }),
    {
      name: 'kopo-auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.normalizePersistedUser();
        state?.setHasHydrated(true);
      },
    }
  )
);
