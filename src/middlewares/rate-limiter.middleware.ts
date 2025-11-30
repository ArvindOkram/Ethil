import { Request, Response, NextFunction } from 'express';

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 1000; // 1 minute in ms


export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || '';
    const now = Date.now();

    let entry = rateLimitMap.get(ip);

    if (!entry || now - entry.timestamp > WINDOW_MS) {
        // Reset count and timestamp
        entry = { count: 1, timestamp: now };
        rateLimitMap.set(ip, entry);
        next();
    } else {
        if (entry.count >= LIMIT) {
            res.status(429).json({ message: 'Too many requests. Please try again later.' });
        } else {
            entry.count += 1;
            rateLimitMap.set(ip, entry);
            next();
        }
    }
}