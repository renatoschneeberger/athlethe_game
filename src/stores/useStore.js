import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // User state
  user: {
    nickname: null,
    email: null,
    sessionCode: null,
  },

  // Session state
  session: null,
  currentQuestionIndex: 0,
  answers: [],

  // Portfolio state
  portfolio: null,
  assets: null,

  // Challenge state
  challenge: null,
  challengeSubmitted: false,

  // Leaderboard state
  leaderboardEmailSubmitted: false,

  // UI state
  loading: false,
  error: null,
  toast: null,

  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  addAnswer: (answer) => set((state) => ({ 
    answers: [...state.answers, answer] 
  })),
  resetAnswers: () => set({ answers: [], currentQuestionIndex: 0 }),
  
  setPortfolio: (portfolio) => set({ portfolio }),
  setAssets: (assets) => set({ assets }),
  setChallenge: (challenge) => set({ challenge }),
  setChallengeSubmitted: (submitted) => set({ challengeSubmitted: submitted }),
  
  setLeaderboardEmailSubmitted: (submitted) => set({ leaderboardEmailSubmitted: submitted }),
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setToast: (toast) => set({ toast }),
  
  // Update portfolio after trade
  updatePortfolioAfterTrade: (symbol, qty, price, type) => {
    const portfolio = get().portfolio;
    if (!portfolio) return;
    
    const holdings = [...portfolio.holdings];
    const existing = holdings.find(h => h.symbol === symbol);
    
    if (type === 'BUY') {
      if (existing) {
        const totalValue = existing.qty * existing.avgPrice + qty * price;
        const totalQty = existing.qty + qty;
        existing.qty = totalQty;
        existing.avgPrice = totalValue / totalQty;
      } else {
        holdings.push({ symbol, qty, avgPrice: price, marketPrice: price });
      }
      portfolio.cash -= qty * price;
    } else {
      if (existing && existing.qty >= qty) {
        existing.qty -= qty;
        if (existing.qty === 0) {
          const index = holdings.indexOf(existing);
          holdings.splice(index, 1);
        }
        portfolio.cash += qty * price;
      }
    }
    
    set({ portfolio: { ...portfolio, holdings } });
  },
}));

