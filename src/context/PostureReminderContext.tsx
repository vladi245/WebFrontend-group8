import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useToast } from './ToastContext';

type Posture = 'sitting' | 'standing';

type ReminderKey = 'sitting40' | 'sitting90' | 'sitting120' | 'standingTargetMet' | 'standingExtended';

interface PostureReminderContextValue {
  currentPosture: Posture;
  standingTargetMinutes: number | null;
  setPosture: (posture: Posture) => void;
}

interface QueuedReminder {
  key: ReminderKey;
  posture: Posture;
  minMinutes: number;
  message: string;
  title?: string;
  tone?: 'info' | 'warning' | 'success';
}

const COOL_DOWN_MS = 1 * 60 * 1000; // one reminder maximum every 45–60 minutes

const PostureReminderContext = createContext<PostureReminderContextValue | null>(null);

function deriveStandingTargetMinutes(sittingMinutes: number) {
  if (sittingMinutes >= 3) return 45;
  if (sittingMinutes >= 2) return 30;
  if (sittingMinutes >= 1) return 20;
  return 1; // default gentle target for shorter sessions
}

export function PostureReminderProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();
  const [currentPosture, setCurrentPosture] = useState<Posture>('sitting');
  const [postureStartedAt, setPostureStartedAt] = useState<number>(Date.now());
  const [standingTargetMinutes, setStandingTargetMinutes] = useState<number | null>(null);
  const [triggeredKeys, setTriggeredKeys] = useState<Set<ReminderKey>>(new Set());
  const [lastReminderAt, setLastReminderAt] = useState<number | null>(null);
  const [queuedReminder, setQueuedReminder] = useState<QueuedReminder | null>(null);

  const resetSession = useCallback(
    (nextPosture: Posture) => {
      setCurrentPosture(nextPosture);
      setPostureStartedAt(Date.now());
      setTriggeredKeys(new Set());
      setQueuedReminder(null);
    },
    [],
  );

  const setPosture = useCallback(
    (posture: Posture) => {
      if (posture === currentPosture) return;

      const now = Date.now();
      const elapsedMinutes = (now - postureStartedAt) / 60000;

      if (currentPosture === 'sitting' && posture === 'standing') {
        const target = deriveStandingTargetMinutes(elapsedMinutes);
        setStandingTargetMinutes(target);
      } else if (currentPosture === 'standing' && posture === 'sitting') {
        setStandingTargetMinutes(null);
      }

      resetSession(posture);
    },
    [currentPosture, postureStartedAt, resetSession],
  );

  const isReminderAllowed = useCallback(
    (now: number) => {
      if (!lastReminderAt) return true;
      return now - lastReminderAt >= COOL_DOWN_MS;
    },
    [lastReminderAt],
  );

  const sendReminder = useCallback(
    (key: ReminderKey, message: string, options?: { title?: string; tone?: 'info' | 'warning' | 'success' }) => {
      const now = Date.now();
      addToast({
        title: options?.title,
        message,
        tone: options?.tone,
        durationMs: 10000,
      });
      setLastReminderAt(now);
      setTriggeredKeys((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      setQueuedReminder((prev) => (prev && prev.key === key ? null : prev));
    },
    [addToast],
  );

  const attemptReminder = useCallback(
    (payload: QueuedReminder) => {
      if (triggeredKeys.has(payload.key)) {
        return;
      }

      const now = Date.now();
      if (!isReminderAllowed(now)) {
        setQueuedReminder(payload);
        setTriggeredKeys((prev) => {
          const next = new Set(prev);
          next.add(payload.key);
          return next;
        });
        return;
      }

      sendReminder(payload.key, payload.message, { title: payload.title, tone: payload.tone });
    },
    [isReminderAllowed, sendReminder, triggeredKeys],
  );

  const evaluateReminders = useCallback(() => {
    const now = Date.now();
    const elapsedMinutes = (now - postureStartedAt) / 60000;

    // process queued reminder first if it's now allowed and still relevant
    if (queuedReminder) {
      const validPosture = queuedReminder.posture === currentPosture;
      const enoughTime = elapsedMinutes >= queuedReminder.minMinutes;
      const canSend = isReminderAllowed(now);

      if (!validPosture) {
        setQueuedReminder(null);
      } else if (enoughTime && canSend) {
        sendReminder(queuedReminder.key, queuedReminder.message, {
          title: queuedReminder.title,
          tone: queuedReminder.tone,
        });
        return; // avoid double sending in same tick
      }
    }

    if (currentPosture === 'sitting') {
      const sittingRules: Array<{ min: number; key: ReminderKey; message: string; title: string; tone: 'info' | 'warning' }> =
        [
          {
            min: 1,
            key: 'sitting40',
            title: 'Time to change posture',
            tone: 'info',
            message: 'You’ve been sitting for 40 minutes. When convenient, consider standing for about 20 minutes.',
          },
          {
            min: 2,
            key: 'sitting90',
            title: 'Long sitting session',
            tone: 'warning',
            message: 'You’ve been sitting for a long period. For better balance, standing for around 30 minutes is recommended.',
          },
          {
            min: 3,
            key: 'sitting120',
            title: 'Health reminder',
            tone: 'warning',
            message:
              'Prolonged sitting is not considered healthy. A posture change is recommended — standing for about 45 minutes may help.',
          },
        ];

      sittingRules.forEach((rule) => {
        if (elapsedMinutes >= rule.min && !triggeredKeys.has(rule.key)) {
          attemptReminder({
            key: rule.key,
            posture: 'sitting',
            minMinutes: rule.min,
            message: rule.message,
            title: rule.title,
            tone: rule.tone,
          });
        }
      });
    } else if (currentPosture === 'standing') {
      if (standingTargetMinutes) {
        if (elapsedMinutes >= standingTargetMinutes && !triggeredKeys.has('standingTargetMet')) {
          attemptReminder({
            key: 'standingTargetMet',
            posture: 'standing',
            minMinutes: standingTargetMinutes,
            message: 'You’ve completed your planned standing time. You may switch back to sitting if you prefer.',
            title: 'Standing target reached',
            tone: 'success',
          });
        }

        if (elapsedMinutes >= standingTargetMinutes + 30 && !triggeredKeys.has('standingExtended')) {
          attemptReminder({
            key: 'standingExtended',
            posture: 'standing',
            minMinutes: standingTargetMinutes + 30,
            message: 'You’ve been standing for a while. Alternating posture by sitting may help maintain comfort.',
            title: 'Balance reminder',
            tone: 'info',
          });
        }
      }
    }
  }, [attemptReminder, currentPosture, isReminderAllowed, postureStartedAt, queuedReminder, standingTargetMinutes, triggeredKeys]);

  useEffect(() => {
    const interval = window.setInterval(evaluateReminders, 30000);
    evaluateReminders(); // run once on mount
    return () => window.clearInterval(interval);
  }, [evaluateReminders]);

  const value = useMemo<PostureReminderContextValue>(
    () => ({
      currentPosture,
      standingTargetMinutes,
      setPosture,
    }),
    [currentPosture, setPosture, standingTargetMinutes],
  );

  return <PostureReminderContext.Provider value={value}>{children}</PostureReminderContext.Provider>;
}

export function usePostureReminders() {
  const ctx = useContext(PostureReminderContext);
  if (!ctx) {
    throw new Error('usePostureReminders must be used within a PostureReminderProvider');
  }
  return ctx;
}

