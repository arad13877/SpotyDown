import { type User, type InsertUser, type DownloadHistory, type InsertDownloadHistory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  addToHistory(download: InsertDownloadHistory): Promise<DownloadHistory>;
  getHistory(limit?: number): Promise<DownloadHistory[]>;
  getHistoryByTrackId(trackId: string): Promise<DownloadHistory | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private history: Map<string, DownloadHistory>;

  constructor() {
    this.users = new Map();
    this.history = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async addToHistory(download: InsertDownloadHistory): Promise<DownloadHistory> {
    const id = randomUUID();
    const history: DownloadHistory = {
      ...download,
      id,
      releaseYear: download.releaseYear || null,
      youtubeUrl: download.youtubeUrl || null,
      downloadedAt: new Date(),
    };
    this.history.set(id, history);
    return history;
  }

  async getHistory(limit: number = 10): Promise<DownloadHistory[]> {
    const allHistory = Array.from(this.history.values());
    return allHistory
      .sort((a, b) => b.downloadedAt.getTime() - a.downloadedAt.getTime())
      .slice(0, limit);
  }

  async getHistoryByTrackId(trackId: string): Promise<DownloadHistory | undefined> {
    return Array.from(this.history.values()).find(
      (h) => h.spotifyTrackId === trackId,
    );
  }
}

export const storage = new MemStorage();
