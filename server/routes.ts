import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getTrackInfo } from "./spotify";
import YouTube from "youtube-sr";
import ytdl from "@distube/ytdl-core";
import { insertDownloadHistorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/track/:trackId", async (req, res) => {
    try {
      const { trackId } = req.params;
      
      if (!trackId) {
        return res.status(400).json({ message: "Track ID is required" });
      }

      const trackInfo = await getTrackInfo(trackId);
      
      res.json(trackInfo);
    } catch (error: any) {
      console.error("Error fetching track info:", error);
      res.status(500).json({ 
        message: error.message || "Failed to fetch track information" 
      });
    }
  });

  app.post("/api/search-youtube", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const results = await YouTube.search(query, { limit: 1, type: "video" });
      
      if (results.length === 0) {
        return res.status(404).json({ message: "No YouTube video found" });
      }

      const video = results[0];
      
      res.json({
        id: video.id,
        title: video.title,
        url: video.url,
        duration: video.duration,
        thumbnail: video.thumbnail?.url || null,
      });
    } catch (error: any) {
      console.error("Error searching YouTube:", error);
      res.status(500).json({ 
        message: error.message || "Failed to search YouTube" 
      });
    }
  });

  app.post("/api/download", async (req, res) => {
    try {
      const { youtubeUrl, quality } = req.body;
      
      if (!youtubeUrl) {
        return res.status(400).json({ message: "YouTube URL is required" });
      }

      const validQualities = ["320", "256", "128"];
      const requestedQuality = validQualities.includes(quality) ? parseInt(quality) : 320;

      if (!ytdl.validateURL(youtubeUrl)) {
        return res.status(400).json({ message: "Invalid YouTube URL" });
      }

      const info = await ytdl.getInfo(youtubeUrl);
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      
      if (audioFormats.length === 0) {
        return res.status(404).json({ message: "No audio format found" });
      }

      const sortedFormats = audioFormats
        .filter(f => f.audioBitrate && f.audioBitrate > 0)
        .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));

      let selectedFormat;
      let actualQuality;
      
      if (sortedFormats.length === 0) {
        const downloadableFormats = audioFormats.filter(f => 
          f.hasAudio && 
          f.url && 
          f.contentLength &&
          !f.url.includes('manifest') && 
          !f.isHLS && 
          !f.isDashMPD
        );
        
        if (downloadableFormats.length === 0) {
          return res.status(404).json({ 
            message: "No downloadable audio format found for this video" 
          });
        }
        
        const sortedByQuality = downloadableFormats.sort((a, b) => {
          const qualA = a.audioQuality || a.quality || '';
          const qualB = b.audioQuality || b.quality || '';
          const qualOrder: Record<string, number> = { 
            'AUDIO_QUALITY_HIGH': 3, 
            'AUDIO_QUALITY_MEDIUM': 2, 
            'AUDIO_QUALITY_LOW': 1,
            'high': 3,
            'medium': 2,
            'low': 1
          };
          return (qualOrder[qualB] || 0) - (qualOrder[qualA] || 0);
        });
        selectedFormat = sortedByQuality[0];
        actualQuality = null;
      } else {
        const matchingFormat = sortedFormats.find(f => (f.audioBitrate || 0) <= requestedQuality);
        selectedFormat = matchingFormat || sortedFormats[0];
        actualQuality = selectedFormat.audioBitrate;
      }

      res.json({
        downloadUrl: selectedFormat.url,
        quality: actualQuality || 0,
        container: selectedFormat.container,
        title: info.videoDetails.title,
      });
    } catch (error: any) {
      console.error("Error getting download link:", error);
      res.status(500).json({ 
        message: error.message || "Failed to get download link" 
      });
    }
  });

  app.post("/api/history", async (req, res) => {
    try {
      const validatedData = insertDownloadHistorySchema.parse(req.body);
      
      const savedHistory = await storage.addToHistory(validatedData);
      
      res.json(savedHistory);
    } catch (error: any) {
      console.error("Error saving to history:", error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: error.message || "Invalid history data" 
        });
      }
      
      res.status(500).json({ 
        message: error.message || "Failed to save to history" 
      });
    }
  });

  app.get("/api/history", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      
      const history = await storage.getHistory(limit);
      
      res.json(history);
    } catch (error: any) {
      console.error("Error fetching history:", error);
      res.status(500).json({ 
        message: error.message || "Failed to fetch history" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
