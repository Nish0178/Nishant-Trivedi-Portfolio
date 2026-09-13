package com.nishant.portfolio.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

/**
 * Service to manage and enforce server-side login attempt rate-limiting.
 * Limits consecutive failed attempts to a maximum of 3 before triggering a temporary lockout.
 */
@Service
public class LoginAttemptService {

    public static final int MAX_ATTEMPTS = 3;
    public static final long LOCKOUT_DURATION_MS = 15 * 60 * 1000L; // 15 minutes

    private static class AttemptRecord {
        private int attempts;
        private long lockoutExpiration;

        public AttemptRecord() {
            this.attempts = 0;
            this.lockoutExpiration = 0L;
        }

        public synchronized boolean isLocked() {
            if (lockoutExpiration > 0L) {
                if (System.currentTimeMillis() < lockoutExpiration) {
                    return true;
                }
                // Lockout period has elapsed, reset
                attempts = 0;
                lockoutExpiration = 0L;
            }
            return false;
        }

        public synchronized int recordFailure() {
            // If previous lockout expired, reset
            if (lockoutExpiration > 0L && System.currentTimeMillis() >= lockoutExpiration) {
                attempts = 0;
                lockoutExpiration = 0L;
            }
            attempts++;
            if (attempts >= MAX_ATTEMPTS) {
                lockoutExpiration = System.currentTimeMillis() + LOCKOUT_DURATION_MS;
            }
            return Math.max(0, MAX_ATTEMPTS - attempts);
        }

        public synchronized int getRemainingAttempts() {
            if (isLocked()) {
                return 0;
            }
            return Math.max(0, MAX_ATTEMPTS - attempts);
        }
    }

    private final ConcurrentHashMap<String, AttemptRecord> attemptsMap = new ConcurrentHashMap<>();

    /**
     * Checks if the given key (e.g. client IP) is currently locked out.
     */
    public boolean isBlocked(String key) {
        if (key == null || key.isBlank()) {
            return false;
        }
        AttemptRecord record = attemptsMap.get(key);
        return record != null && record.isLocked();
    }

    /**
     * Records a failed login attempt for the key and returns remaining attempts.
     */
    public int recordFailure(String key) {
        if (key == null || key.isBlank()) {
            return 0;
        }
        AttemptRecord record = attemptsMap.computeIfAbsent(key, k -> new AttemptRecord());
        return record.recordFailure();
    }

    /**
     * Gets the remaining attempts for the key.
     */
    public int getRemainingAttempts(String key) {
        if (key == null || key.isBlank()) {
            return MAX_ATTEMPTS;
        }
        AttemptRecord record = attemptsMap.get(key);
        if (record == null) {
            return MAX_ATTEMPTS;
        }
        return record.getRemainingAttempts();
    }

    /**
     * Records a successful authentication, resetting failed attempts.
     */
    public void recordSuccess(String key) {
        if (key != null) {
            attemptsMap.remove(key);
        }
    }

    /**
     * Explicitly resets/clears records (useful in tests).
     */
    public void reset(String key) {
        if (key != null) {
            attemptsMap.remove(key);
        }
    }

    /**
     * Clears all attempt tracking records.
     */
    public void clearAll() {
        attemptsMap.clear();
    }
}
