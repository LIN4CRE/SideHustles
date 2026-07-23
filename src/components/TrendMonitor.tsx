import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Search, 
  RefreshCw, 
  Sparkles, 
  Plus, 
  Check, 
  Tag, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Zap,
  Star,
  GitFork,
  ArrowRight
} from 'lucide-react';
import { SideHustle } from '../types';
import { 
  TrendingRepo, 
  getStoredTrendingRepos, 
  scrapeLatestTrendingRepos, 
  saveTrendingRepos 
} from '../services/trendMonitor';

interface TrendMonitorProps {
  onImportHustle?: (hustle: SideHustle) => void;
  savedHustleIds?: string[];
}

export const TrendMonitor: React.FC<TrendMonitorProps> = ({
  onImportHustle,
  savedHustleIds = []
}) => {
  const [repos, setRepos] = useState<TrendingRepo[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [importedRepoId, setImportedRepoId] = useState<string | null>(null);
  const [lastScrapedTime, setLastScrapedTime] = useState<string>('Just now');

  useEffect(() => {
    setRepos(getStoredTrendingRepos());
  }, []);

  const handleRefreshScraper = async () => {
    setIsRefreshing(true);
    try {
      const updated = await scrapeLatestTrendingRepos();
      setRepos(updated);
      setLastScrapedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const tagsList = ['all', 'automation', 'LLM', 'side-hustle', 'MCP', 'Obsidian', 'Android', 'Windows'];

  const filteredRepos = repos.filter((repo) => {
    const matchesTag = selectedTag === 'all' || repo.tags.includes(selectedTag as any);
    const matchesQuery = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.monetizationIdea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTag && matchesQuery;
  });

  const handleImport = (repo: TrendingRepo) => {
    setImportedRepoId(repo.id);
    if (onImportHustle) {
      onImportHustle(repo.convertedHustle);
    }
    setTimeout(() => {
      setImportedRepoId(null);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Control Bar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                TrendMonitor™ GitHub Scraper
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                  Live Feed Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Monitors GitHub repos tagged with <code className="text-indigo-300">automation</code>, <code className="text-indigo-300">LLM</code>, & <code className="text-indigo-300">side-hustle</code>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
              Updated: {lastScrapedTime}
            </span>
            <button
              onClick={handleRefreshScraper}
              disabled={isRefreshing}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800 font-bold text-xs flex items-center gap-1.5 font-mono shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Scraping GitHub...' : 'Scrape GitHub Now'}</span>
            </button>
          </div>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trending AI tools, tags, or monetization ideas..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono scrollbar-none">
            {tagsList.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] capitalize whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Repos Grid */}
      <div className="space-y-3">
        {filteredRepos.length === 0 ? (
          <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-xl space-y-2 font-mono">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No trending AI tools match your tag filter or search query.</p>
          </div>
        ) : (
          filteredRepos.map((repo) => {
            const isImported = importedRepoId === repo.id;
            const isSavedInApp = savedHustleIds.includes(repo.convertedHustle.id);

            return (
              <div 
                key={repo.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 transition-all"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-indigo-300 font-mono flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        {repo.name}
                      </h4>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-300" />
                          {repo.stars}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-0.5">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                          {repo.language}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      {repo.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.2 rounded bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleImport(repo)}
                    className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 font-mono shadow-md transition-all shrink-0 ${
                      isSavedInApp || isImported
                        ? 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-200'
                        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white'
                    }`}
                  >
                    {isImported ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Added to Dashboard!</span>
                      </>
                    ) : isSavedInApp ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Active in Dashboard</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Convert to Side Hustle</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {repo.description}
                </p>

                {/* Monetization Blueprint */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block mb-0.5">
                      Monetization Blueprint:
                    </span>
                    <p className="text-slate-200 font-medium">{repo.monetizationIdea}</p>
                  </div>
                  <div className="shrink-0 font-mono text-right">
                    <span className="text-[10px] text-slate-400 block">Est. Monthly Potential</span>
                    <span className="text-sm font-bold text-emerald-400">${repo.monthlyRevenueEstimate}/mo</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
