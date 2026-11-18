import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  searchCoins,
  fetchMarketData,
  fetchGlobalMarketPulse,
  fetchMarketHistory,
  fetchMarketsBatch,
} from './server/services/coingecko.ts';
import { fetchCryptoNews } from './server/services/news.ts';
import { fetchFundamentalsBundle } from './server/services/fundamentals.ts';
import {
  generateResearchReport,
  generateComparisonSummary,
  generateResearchDiffSummary,
} from './server/services/gemini.ts';
import type {
  CoinOption,
  ComparisonAssetResult,
  CompleteResearchBrief,
  FundamentalsBundle,
  MarketData,
  NewsResult,
  ResearchChangeSummary,
} from './src/types/research.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '2mb' }));

  // 1. Cryptocurrency search endpoint (preserved)
  app.get('/api/coins/search', async (req, res) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q : '';
      const result = await searchCoins(q);
      res.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search cryptocurrencies.';
      res.status(500).json({ error: message });
    }
  });

  // 2. Global Market Pulse endpoint (new for CRYPTIQ 3.0 Overview)
  app.get('/api/market/pulse', async (_req, res) => {
    try {
      const pulse = await fetchGlobalMarketPulse();
      res.json({ pulse });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Global market pulse currently unavailable.';
      res.status(502).json({ error: message });
    }
  });

  // 3. Historical price & BTC/ETH benchmark endpoint (new for Market & Tokenomics)
  app.get('/api/market/history', async (req, res) => {
    const id = typeof req.query.id === 'string' ? req.query.id.trim() : '';
    const days = typeof req.query.days === 'string' ? req.query.days.trim() : '30';
    const benchmarks = req.query.benchmarks === 'true';

    if (!id) {
      res.status(400).json({ error: 'Missing required query parameter: id' });
      return;
    }

    try {
      const history = await fetchMarketHistory(id, days, benchmarks);
      res.json({ history });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to retrieve historical price data.';
      const status = message.toLowerCase().includes('rate limit') ? 429 : 502;
      res.status(status).json({ error: message });
    }
  });

  // 4. CoinGecko live market data endpoint (preserved & enriched)
  app.get('/api/research/market', async (req, res) => {
    const id = typeof req.query.id === 'string' ? req.query.id.trim() : '';
    if (!id) {
      res.status(400).json({ error: 'Missing required query parameter: id' });
      return;
    }

    try {
      const market = await fetchMarketData(id);
      res.json({ market });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to retrieve market data from CoinGecko.';
      const status = message.toLowerCase().includes('rate limit')
        ? 429
        : message.toLowerCase().includes('invalid')
          ? 400
          : 502;
      res.status(status).json({ error: message });
    }
  });

  // 5. Cryptocurrency news retrieval endpoint (preserved & improved)
  app.get('/api/research/news', async (req, res) => {
    const name = typeof req.query.name === 'string' ? req.query.name.trim() : '';
    const symbol = typeof req.query.symbol === 'string' ? req.query.symbol.trim() : '';

    if (!name && !symbol) {
      res.status(400).json({ error: 'Missing required asset name or symbol.' });
      return;
    }

    try {
      const news = await fetchCryptoNews(name || symbol, symbol || name);
      res.json({ news });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to retrieve recent news articles.';
      res.status(502).json({ error: message });
    }
  });

  // 6. Parallel Fundamentals, On-Chain, GitHub & Security adapter endpoint
  app.post('/api/research/fundamentals', async (req, res) => {
    const body = req.body as {
      coin?: CoinOption;
      market?: MarketData | null;
    };

    if (!body?.coin?.id || !body?.coin?.name || !body?.coin?.symbol) {
      res.status(400).json({ error: 'Valid selected cryptocurrency metadata is required.' });
      return;
    }

    try {
      const fundamentals = await fetchFundamentalsBundle(
        body.coin.id,
        body.coin.name,
        body.coin.symbol,
        body.market ?? null
      );
      res.json({ fundamentals });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to gather fundamentals bundle.';
      res.status(500).json({ error: message });
    }
  });

  // 7. Gemini AI research synthesis endpoint (preserved & extended with evidence & 3.0 schema)
  app.post('/api/research/analyze', async (req, res) => {
    const body = req.body as {
      coin?: CoinOption;
      market?: MarketData | null;
      marketWarning?: string;
      news?: NewsResult | null;
      newsWarning?: string;
      fundamentals?: FundamentalsBundle | null;
    };

    if (!body?.coin?.id || !body?.coin?.name || !body?.coin?.symbol) {
      res.status(400).json({ error: 'Valid selected cryptocurrency metadata is required.' });
      return;
    }

    if (!body.market && (!body.news || body.news.articles.length === 0)) {
      res.status(422).json({
        error:
          'Neither market data nor recent news could be retrieved. At least one external source is required to generate an evidence-backed brief.',
      });
      return;
    }

    try {
      const { report, evidence } = await generateResearchReport({
        coin: body.coin,
        market: body.market ?? null,
        marketWarning: body.marketWarning,
        news: body.news ?? null,
        newsWarning: body.newsWarning,
        fundamentals: body.fundamentals ?? null,
      });

      res.json({
        report,
        evidence,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      const rawMessage =
        err instanceof Error ? err.message : 'Failed to generate AI research report.';

      let status = 500;
      let friendlyMessage = rawMessage;

      if (
        rawMessage.includes('GEMINI_API_KEY') ||
        rawMessage.includes('API_KEY_INVALID') ||
        rawMessage.includes('PERMISSION_DENIED')
      ) {
        status = 401;
        friendlyMessage =
          'Gemini API authentication failed. Please verify your GEMINI_API_KEY in Settings > Secrets.';
      } else if (rawMessage.includes('RESOURCE_EXHAUSTED') || rawMessage.includes('429')) {
        status = 429;
        friendlyMessage =
          'Gemini API rate or quota limit reached. Please wait a moment and retry.';
      } else if (
        rawMessage.includes('503') ||
        rawMessage.includes('UNAVAILABLE') ||
        rawMessage.includes('high demand')
      ) {
        status = 503;
        friendlyMessage =
          'Gemini AI service is experiencing temporary high demand. Please retry in a few seconds.';
      }

      res.status(status).json({ error: friendlyMessage });
    }
  });

  // 8. Asset Comparison endpoint (2-3 coins)
  app.post('/api/research/compare', async (req, res) => {
    const body = req.body as { coins?: CoinOption[] };
    const coins = Array.isArray(body?.coins) ? body.coins.slice(0, 3) : [];

    if (coins.length < 2) {
      res.status(400).json({ error: 'Select 2 or 3 cryptocurrencies to compare.' });
      return;
    }

    try {
      let marketMap = new Map<string, MarketData>();
      let batchError: string | undefined;
      try {
        marketMap = await fetchMarketsBatch(coins.map((c) => c.id));
      } catch (err) {
        batchError = err instanceof Error ? err.message : 'Market data unavailable';
      }

      const assetResults = await Promise.all(
        coins.map(async (coin): Promise<ComparisonAssetResult> => {
          const market = marketMap.get(coin.id.toLowerCase()) ?? null;
          const [histRes, fundRes] = await Promise.allSettled([
            fetchMarketHistory(coin.id, '30', false),
            market
              ? fetchFundamentalsBundle(coin.id, coin.name, coin.symbol, market)
              : Promise.resolve(null),
          ]);

          const fundamentals = fundRes.status === 'fulfilled' ? fundRes.value : null;

          let history30d: Array<{ timestamp: number; pctReturn: number }> = [];
          if (histRes.status === 'fulfilled' && histRes.value.points.length > 0) {
            const pts = histRes.value.points;
            const base = pts[0].priceUsd;
            if (base > 0) {
              history30d = pts.map((p) => ({
                timestamp: p.timestamp,
                pctReturn: Number((((p.priceUsd - base) / base) * 100).toFixed(2)),
              }));
            }
          }

          return {
            coin,
            market,
            history30d,
            onChainStatus: fundamentals?.onChain.status ?? 'UNAVAILABLE',
            tvlUsd: fundamentals?.onChain.tvlUsd ?? null,
            githubStars: fundamentals?.github.stars ?? null,
            securityStatus: fundamentals?.security.status ?? 'NOT ASSESSED',
            error: !market ? batchError || 'Market data unavailable' : undefined,
          };
        })
      );

      let aiSummary = null;
      try {
        aiSummary = await generateComparisonSummary(assetResults);
      } catch {
        aiSummary = null;
      }

      res.json({
        assets: assetResults,
        aiSummary,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Asset comparison failed.';
      res.status(500).json({ error: message });
    }
  });

  // 9. Research History Change Detection ("WHAT CHANGED SINCE YOUR LAST RESEARCH?")
  app.post('/api/research/diff', async (req, res) => {
    const body = req.body as {
      previousBrief?: CompleteResearchBrief;
      currentBrief?: CompleteResearchBrief;
    };

    if (!body?.previousBrief || !body?.currentBrief) {
      res.status(400).json({ error: 'Both previous and current research briefs are required.' });
      return;
    }

    try {
      const prev = body.previousBrief;
      const curr = body.currentBrief;

      const marketChanges: ResearchChangeSummary['marketChanges'] = [];
      const addMetric = (
        label: string,
        pVal: number | null | undefined,
        cVal: number | null | undefined,
        formatter: (v: number) => string
      ) => {
        if (typeof pVal === 'number' && typeof cVal === 'number') {
          const pctDelta = pVal !== 0 ? ((cVal - pVal) / Math.abs(pVal)) * 100 : 0;
          const sign = pctDelta > 0 ? '+' : '';
          marketChanges.push({
            metric: label,
            previousValue: formatter(pVal),
            currentValue: formatter(cVal),
            deltaLabel: `${sign}${pctDelta.toFixed(2)}%`,
          });
        }
      };

      const usdFmt = (v: number) =>
        v >= 1000
          ? `$${v.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
          : `$${v.toFixed(4)}`;
      const capFmt = (v: number) =>
        v >= 1e9 ? `$${(v / 1e9).toFixed(2)}B` : `$${(v / 1e6).toFixed(2)}M`;

      addMetric('Price (USD)', prev.market?.currentPriceUsd, curr.market?.currentPriceUsd, usdFmt);
      addMetric('Market Cap', prev.market?.marketCapUsd, curr.market?.marketCapUsd, capFmt);
      addMetric('24h Volume', prev.market?.volume24hUsd, curr.market?.volume24hUsd, capFmt);

      const aiSummary = await generateResearchDiffSummary({
        previousBrief: prev,
        currentBrief: curr,
      });

      const summary: ResearchChangeSummary = {
        previousGeneratedAt: prev.generatedAt,
        currentGeneratedAt: curr.generatedAt,
        marketChanges,
        aiSummary,
      };

      res.json({ summary });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to compute research diff summary.';
      res.status(500).json({ error: message });
    }
  });

  // Mount Vite middleware in development, or serve dist in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`CRYPTIQ 3.0 server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start CRYPTIQ server:', err);
  process.exit(1);
});
