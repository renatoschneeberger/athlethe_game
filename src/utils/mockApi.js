// Mock API with simulated delays and error handling
import sessionData from '../data/session.json';
import leaderboardData from '../data/leaderboard.json';
import assetsData from '../data/assets.json';
import portfolioData from '../data/portfolio.json';
import challengeData from '../data/challenge.json';
import whatsappData from '../data/whatsapp.json';

const DELAY_MIN = 400;
const DELAY_MAX = 800;
const ERROR_RATE = 0.1; // 10% chance of error

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomDelay = () => delay(DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN));

const shouldError = () => Math.random() < ERROR_RATE;

export const mockApi = {
  async getSession(code) {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    
    return { ...sessionData, code };
  },

  async getLeaderboard(type = 'week') {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    
    return leaderboardData[type] || [];
  },

  async getAssets() {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    
    return assetsData;
  },

  async getPortfolio() {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    
    return portfolioData;
  },

  async getChallenge() {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    
    return challengeData;
  },

  async getWhatsAppMessages() {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    
    return whatsappData.messages || [];
  },

  async submitAnswer(sessionCode, questionId, answer) {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    return { success: true, correct: true };
  },

  async submitChallenge(action) {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    return { success: true };
  },

  async executeTrade(symbol, qty, type) {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    return { success: true, tradeId: `t${Date.now()}` };
  },

  async submitEmail(email) {
    await randomDelay();
    if (shouldError()) throw new Error('Network error – please try again');
    return { success: true };
  }
};

