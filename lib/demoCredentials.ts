export interface DemoCredentialRecord {
  password: string;
  updatedAt: string;
}

type DemoCredentialMap = Record<string, DemoCredentialRecord>;

const DEMO_CREDENTIALS_STORAGE_KEY = "kopo-demo-credentials-v1";
const DEFAULT_DEMO_PASSWORD =
  process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "password123";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const readCredentialMap = (): DemoCredentialMap => {
  if (!canUseStorage()) {
    return {};
  }

  const raw = window.localStorage.getItem(DEMO_CREDENTIALS_STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as DemoCredentialMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const writeCredentialMap = (map: DemoCredentialMap) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(DEMO_CREDENTIALS_STORAGE_KEY, JSON.stringify(map));
};

export const getDefaultDemoPassword = () => DEFAULT_DEMO_PASSWORD;

export const getStoredDemoCredential = (email: string): DemoCredentialRecord => {
  const key = normalizeEmail(email);
  const credentialMap = readCredentialMap();

  return (
    credentialMap[key] ?? {
      password: DEFAULT_DEMO_PASSWORD,
      updatedAt: "Never",
    }
  );
};

export const getStoredDemoPassword = (email: string) =>
  getStoredDemoCredential(email).password;

export const setStoredDemoPassword = (email: string, password: string) => {
  if (!canUseStorage()) {
    return {
      password,
      updatedAt: new Date().toISOString(),
    };
  }

  const key = normalizeEmail(email);
  const credentialMap = readCredentialMap();
  const nextRecord: DemoCredentialRecord = {
    password,
    updatedAt: new Date().toISOString(),
  };

  credentialMap[key] = nextRecord;
  writeCredentialMap(credentialMap);

  return nextRecord;
};
