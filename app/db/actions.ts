"use server";

import { type CurrentlyPlaying, getCurrentlyPlaying as getSpotifyCurrentlyPlaying } from "./spotify";

type ReactionType = "like" | "heart" | "celebrate" | "insightful";
const VALID_REACTIONS: ReactionType[] = [
  "like",
  "heart",
  "celebrate",
  "insightful",
];

type CreateContactResponse = {
  success: boolean;
  error?: string;
};

export async function incrementViewCount(_slug: string) { return 0; }

// Get all reaction counts for an article
export async function getArticleReactions(_slug: string) { return {}; }

// Get user's reactions for an article from cookie
export async function getUserReactions(_slug: string) { return []; }

// Toggle reaction (add or remove)
export async function toggleReaction(_slug: string, _reactionType: ReactionType) {
  return { success: false } as const;
}

export async function createContact(_email: string): Promise<CreateContactResponse> {
  return { success: true };
}

export async function getCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  try {
    const result = await getSpotifyCurrentlyPlaying();
    return result || null;
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return null;
  }
} 