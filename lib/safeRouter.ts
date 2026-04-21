// Small helpers that defer router actions to the next tick so the
// Next App Router has time to initialize. This prevents
// "Router action dispatched before initialization" errors in dev.

export function safePush(router: any, href: string) {
  try {
    setTimeout(() => {
      try {
        router.push(href);
      } catch (e) {
        // swallow — best-effort navigation
      }
    }, 0);
  } catch (e) {
    // fallback no-op
  }
}

export function safeReplace(router: any, href: string) {
  try {
    setTimeout(() => {
      try {
        router.replace(href);
      } catch (e) {
        // swallow
      }
    }, 0);
  } catch (e) {}
}

export function safeBack(router: any) {
  try {
    setTimeout(() => {
      try {
        router.back();
      } catch (e) {
        // swallow
      }
    }, 0);
  } catch (e) {}
}

export default {
  safePush,
  safeReplace,
  safeBack,
};
