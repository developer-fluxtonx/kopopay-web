export interface PasswordRule {
  id: string;
  label: string;
  passed: boolean;
}

export interface PasswordPolicyResult {
  rules: PasswordRule[];
  score: number;
  label: "Weak" | "Fair" | "Strong" | "Excellent";
}

const hasUppercase = (value: string) => /[A-Z]/.test(value);
const hasLowercase = (value: string) => /[a-z]/.test(value);
const hasNumber = (value: string) => /\d/.test(value);
const hasSymbol = (value: string) => /[^A-Za-z0-9]/.test(value);

const includesPersonalInfo = (
  password: string,
  email?: string,
  name?: string
) => {
  const normalizedPassword = password.toLowerCase();
  const emailLocalPart = email?.split("@")[0]?.toLowerCase().trim() ?? "";
  const nameParts = name
    ?.toLowerCase()
    .split(/\s+/)
    .filter((part) => part.length >= 3) ?? [];

  const tokens = [emailLocalPart, ...nameParts].filter((token) => token.length >= 3);

  return tokens.some((token) => normalizedPassword.includes(token));
};

export const evaluatePasswordPolicy = ({
  password,
  currentPassword,
  email,
  name,
}: {
  password: string;
  currentPassword?: string;
  email?: string;
  name?: string;
}): PasswordPolicyResult => {
  const rules: PasswordRule[] = [
    {
      id: "length",
      label: "At least 12 characters",
      passed: password.length >= 12,
    },
    {
      id: "uppercase",
      label: "Contains an uppercase letter",
      passed: hasUppercase(password),
    },
    {
      id: "lowercase",
      label: "Contains a lowercase letter",
      passed: hasLowercase(password),
    },
    {
      id: "number",
      label: "Contains a number",
      passed: hasNumber(password),
    },
    {
      id: "symbol",
      label: "Contains a symbol",
      passed: hasSymbol(password),
    },
    {
      id: "spaces",
      label: "Does not contain spaces",
      passed: password.length > 0 && !/\s/.test(password),
    },
    {
      id: "reuse",
      label: "Different from your current password",
      passed: password.length > 0 && password !== currentPassword,
    },
    {
      id: "personal-info",
      label: "Does not include your name or email",
      passed: password.length > 0 && !includesPersonalInfo(password, email, name),
    },
  ];

  const passedCount = rules.filter((rule) => rule.passed).length;
  const score = Math.round((passedCount / rules.length) * 100);
  const label =
    score >= 88 ? "Excellent" : score >= 70 ? "Strong" : score >= 45 ? "Fair" : "Weak";

  return {
    rules,
    score,
    label,
  };
};
