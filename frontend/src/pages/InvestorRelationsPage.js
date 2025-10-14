import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import Navigation from '../components/Navigation';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TrendingUp, TrendingDown, FileText, ExternalLink, Download, Building2, BarChart3, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function InvestorRelationsPage() {
  const { API } = useContext(AuthContext);
  const [annualData, setAnnualData] = useState(null);
  const [quarterlyData, setQuarterlyData] = useState(null);
  const [semiAnnualData, setSemiAnnualData] = useState(null);
  const [filings, setFilings] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [liveQuote, setLiveQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFinancialTab, setActiveFinancialTab] = useState('annual');

  useEffect(() => {
    fetchAllData();
    fetchLiveQuote();
    
    // Refresh quote every 30 seconds
    const quoteInterval = setInterval(fetchLiveQuote, 30000);
    return () => clearInterval(quoteInterval);
  }, []);

  const fetchAllData = async () => {
    try {
      const [annualRes, quarterlyRes, semiRes, filingsRes, companyRes] = await Promise.all([
        axios.get(`${API}/investor/annual-data`),
        axios.get(`${API}/investor/quarterly-data`),
        axios.get(`${API}/investor/semi-annual-data`),
        axios.get(`${API}/investor/filings`),
        axios.get(`${API}/investor/company-info`)
      ]);

      setAnnualData(annualRes.data);
      setQuarterlyData(quarterlyRes.data);
      setSemiAnnualData(semiRes.data);
      setFilings(filingsRes.data.filings);
      setCompanyInfo(companyRes.data);
    } catch (error) {
      console.error('Failed to fetch investor data', error);
      toast.error('Failed to load investor data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value && value !== 0) return 'N/A';
    return `$${Math.abs(value).toLocaleString()}K`;
  };

  const formatPercentage = (value) => {
    if (!value && value !== 0) return 'N/A';
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading investor data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-teal-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Investor Relations
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-2">{companyInfo?.name || 'NUGL Inc.'}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Ticker: <span className="text-teal-400 font-semibold">{companyInfo?.ticker}</span></span>
            <span>•</span>
            <span>{companyInfo?.exchange}</span>
            <span>•</span>
            <span>FY Ends: {companyInfo?.fiscal_year_end}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-teal-500/20 p-6">
            <div className="text-sm text-gray-400 mb-1">Latest Annual Revenue</div>
            <div className="text-2xl font-bold text-white">
              {annualData?.years?.[0] ? formatCurrency(annualData.years[0].income_statement.total_revenue) : 'N/A'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {annualData?.years?.[0]?.year}
            </div>
          </Card>
          <Card className="bg-slate-800/50 border-purple-500/20 p-6">
            <div className="text-sm text-gray-400 mb-1">Gross Margin</div>
            <div className="text-2xl font-bold text-white">
              {annualData?.years?.[0] ? formatPercentage(annualData.years[0].key_ratios.gross_margin) : 'N/A'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {annualData?.years?.[0]?.year}
            </div>
          </Card>
          <Card className="bg-slate-800/50 border-emerald-500/20 p-6">
            <div className="text-sm text-gray-400 mb-1">Latest Quarter Revenue</div>
            <div className="text-2xl font-bold text-white">
              {quarterlyData?.quarters?.[0] ? formatCurrency(quarterlyData.quarters[0].revenue) : 'N/A'}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {quarterlyData?.quarters?.[0]?.quarter}
            </div>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/20 p-6">
            <div className="text-sm text-gray-400 mb-1">Available Filings</div>
            <div className="text-2xl font-bold text-white">{filings?.length || 0}</div>
            <div className="text-xs text-gray-500 mt-1">OTC Markets</div>
          </Card>
        </div>

        {/* OTC Markets Links */}
        <div className="mb-8 flex gap-3 flex-wrap justify-center">
          <Button
            onClick={() => window.open(companyInfo?.otc_profile, '_blank')}
            variant="outline"
            className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
            data-testid="otc-profile-link"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            OTC Profile
          </Button>
          <Button
            onClick={() => window.open(companyInfo?.otc_financials, '_blank')}
            variant="outline"
            className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
            data-testid="otc-financials-link"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            OTC Financials
          </Button>
          <Button
            onClick={() => window.open(companyInfo?.otc_disclosure, '_blank')}
            variant="outline"
            className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
            data-testid="otc-disclosure-link"
          >
            <FileText className="w-4 h-4 mr-2" />
            OTC Disclosure
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="financials" className="w-full">
          <TabsList className="bg-slate-800 mb-6 grid w-full grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="financials" data-testid="financials-tab">Financials</TabsTrigger>
            <TabsTrigger value="filings" data-testid="filings-tab">Filings</TabsTrigger>
            <TabsTrigger value="company" data-testid="company-tab">Company</TabsTrigger>
          </TabsList>

          {/* Financials Tab */}
          <TabsContent value="financials" className="space-y-6">
            {/* Financial Period Tabs */}
            <div className="bg-slate-800/30 rounded-xl p-2 flex gap-2 mb-6">
              <button
                onClick={() => setActiveFinancialTab('annual')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  activeFinancialTab === 'annual'
                    ? 'bg-teal-500 text-white font-semibold'
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
                data-testid="annual-tab"
              >
                Annual
              </button>
              <button
                onClick={() => setActiveFinancialTab('semi-annual')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  activeFinancialTab === 'semi-annual'
                    ? 'bg-teal-500 text-white font-semibold'
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
                data-testid="semi-annual-tab"
              >
                Semi-Annual
              </button>
              <button
                onClick={() => setActiveFinancialTab('quarterly')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  activeFinancialTab === 'quarterly'
                    ? 'bg-teal-500 text-white font-semibold'
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
                data-testid="quarterly-tab"
              >
                Quarterly
              </button>
            </div>

            {/* Annual Data */}
            {activeFinancialTab === 'annual' && annualData && (
              <div className="space-y-6">
                <div className="text-sm text-gray-400 mb-4">
                  Values in {annualData.values_in} {annualData.currency} • Fiscal Year Ends {annualData.fiscal_year_end}
                </div>
                {annualData.years.map((yearData) => (
                  <Card key={yearData.year} className="bg-slate-800/50 border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{yearData.year}</h3>
                        <p className="text-sm text-gray-400">Year Ended {formatDate(yearData.period_end)}</p>
                      </div>
                      {yearData.filing_link && (
                        <Button
                          onClick={() => window.open(yearData.filing_link, '_blank')}
                          variant="outline"
                          size="sm"
                          className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View Filing
                        </Button>
                      )}
                    </div>

                    {/* Income Statement */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
                        Income Statement
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-400">Total Revenue</div>
                          <div className="text-lg font-semibold text-white">
                            {formatCurrency(yearData.income_statement.total_revenue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Cost of Revenue</div>
                          <div className="text-lg font-semibold text-white">
                            {formatCurrency(yearData.income_statement.cost_of_revenue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Gross Profit</div>
                          <div className="text-lg font-semibold text-emerald-400">
                            {formatCurrency(yearData.income_statement.gross_profit)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Operating Expenses</div>
                          <div className="text-lg font-semibold text-white">
                            {formatCurrency(yearData.income_statement.total_expenses)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Operating Income</div>
                          <div className={`text-lg font-semibold ${yearData.income_statement.operating_income >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {yearData.income_statement.operating_income >= 0 ? '+' : ''}{formatCurrency(yearData.income_statement.operating_income)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Net Income</div>
                          <div className={`text-lg font-semibold ${yearData.income_statement.net_income >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {yearData.income_statement.net_income >= 0 ? '+' : ''}{formatCurrency(yearData.income_statement.net_income)}
                          </div>
                        </div>
                      </div>

                      {/* Key Ratios */}
                      <div className="mt-6 pt-4 border-t border-slate-700">
                        <h4 className="text-sm font-semibold text-white mb-3">Key Financial Ratios</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-gray-400">EPS</div>
                            <div className="text-base font-semibold text-white">
                              ${yearData.key_ratios.eps.toFixed(3)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Gross Margin</div>
                            <div className="text-base font-semibold text-white">
                              {formatPercentage(yearData.key_ratios.gross_margin)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Operating Margin</div>
                            <div className="text-base font-semibold text-white">
                              {formatPercentage(yearData.key_ratios.operating_margin)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">P/E Ratio</div>
                            <div className="text-base font-semibold text-white">
                              {yearData.key_ratios.price_earnings || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Balance Sheet */}
                      {yearData.balance_sheet && (
                        <div className="mt-6 pt-4 border-t border-slate-700">
                          <h4 className="text-lg font-semibold text-white mb-3">Balance Sheet</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Assets */}
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <h5 className="text-sm font-semibold text-emerald-400 mb-3">Assets</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Cash & Equivalents</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.current_assets.cash_and_equivalents)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Accounts Receivable</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.current_assets.accounts_receivable)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Inventory</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.current_assets.inventory)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2">
                                  <span className="text-gray-300 font-semibold">Current Assets</span>
                                  <span className="text-white font-semibold">{formatCurrency(yearData.balance_sheet.current_assets.total_current_assets)}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-3">
                                  <span className="text-gray-400">PP&E</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.non_current_assets.property_plant_equipment)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Intangibles</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.non_current_assets.intangible_assets)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Goodwill</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.non_current_assets.goodwill)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
                                  <span className="text-emerald-400 font-bold">Total Assets</span>
                                  <span className="text-emerald-400 font-bold">{formatCurrency(yearData.balance_sheet.total_assets)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Liabilities */}
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <h5 className="text-sm font-semibold text-red-400 mb-3">Liabilities</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Accounts Payable</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.current_liabilities.accounts_payable)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Accrued Expenses</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.current_liabilities.accrued_expenses)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Short-term Debt</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.current_liabilities.short_term_debt)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2">
                                  <span className="text-gray-300 font-semibold">Current Liabilities</span>
                                  <span className="text-white font-semibold">{formatCurrency(yearData.balance_sheet.current_liabilities.total_current_liabilities)}</span>
                                </div>
                                <div className="flex justify-between text-sm mt-3">
                                  <span className="text-gray-400">Long-term Debt</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.non_current_liabilities.long_term_debt)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Other Liabilities</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.non_current_liabilities.other_liabilities)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
                                  <span className="text-red-400 font-bold">Total Liabilities</span>
                                  <span className="text-red-400 font-bold">{formatCurrency(yearData.balance_sheet.total_liabilities)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Equity */}
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <h5 className="text-sm font-semibold text-blue-400 mb-3">Stockholders' Equity</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Common Stock</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.stockholders_equity.common_stock)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Paid-in Capital</span>
                                  <span className="text-white">{formatCurrency(yearData.balance_sheet.stockholders_equity.additional_paid_in_capital)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Retained Earnings</span>
                                  <span className={yearData.balance_sheet.stockholders_equity.retained_earnings >= 0 ? 'text-white' : 'text-red-400'}>
                                    {formatCurrency(yearData.balance_sheet.stockholders_equity.retained_earnings)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-4">
                                  <span className="text-blue-400 font-bold">Total Equity</span>
                                  <span className="text-blue-400 font-bold">{formatCurrency(yearData.balance_sheet.stockholders_equity.total_equity)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Cash Flow Statement */}
                      {yearData.cash_flow && (
                        <div className="mt-6 pt-4 border-t border-slate-700">
                          <h4 className="text-lg font-semibold text-white mb-3">Cash Flow Statement</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Operating Activities */}
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <h5 className="text-sm font-semibold text-teal-400 mb-3">Operating Activities</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Net Income</span>
                                  <span className={yearData.cash_flow.operating_activities.net_income >= 0 ? 'text-white' : 'text-red-400'}>
                                    {formatCurrency(yearData.cash_flow.operating_activities.net_income)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Depreciation & Amortization</span>
                                  <span className="text-white">{formatCurrency(yearData.cash_flow.operating_activities.depreciation_amortization)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Working Capital Changes</span>
                                  <span className={yearData.cash_flow.operating_activities.changes_working_capital >= 0 ? 'text-white' : 'text-red-400'}>
                                    {formatCurrency(yearData.cash_flow.operating_activities.changes_working_capital)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
                                  <span className="text-teal-400 font-bold">Net Cash from Operations</span>
                                  <span className={`font-bold ${yearData.cash_flow.operating_activities.net_cash_operating >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                                    {formatCurrency(yearData.cash_flow.operating_activities.net_cash_operating)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Investing Activities */}
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <h5 className="text-sm font-semibold text-purple-400 mb-3">Investing Activities</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Capital Expenditures</span>
                                  <span className="text-red-400">{formatCurrency(yearData.cash_flow.investing_activities.capital_expenditures)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Acquisitions</span>
                                  <span className="text-white">{formatCurrency(yearData.cash_flow.investing_activities.acquisitions)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Other Investing</span>
                                  <span className="text-white">{formatCurrency(yearData.cash_flow.investing_activities.other_investing)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
                                  <span className="text-purple-400 font-bold">Net Cash from Investing</span>
                                  <span className={`font-bold ${yearData.cash_flow.investing_activities.net_cash_investing >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
                                    {formatCurrency(yearData.cash_flow.investing_activities.net_cash_investing)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Financing Activities */}
                            <div className="bg-slate-900/50 rounded-lg p-4">
                              <h5 className="text-sm font-semibold text-blue-400 mb-3">Financing Activities</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Debt Proceeds</span>
                                  <span className="text-emerald-400">{formatCurrency(yearData.cash_flow.financing_activities.debt_proceeds)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Debt Repayment</span>
                                  <span className="text-red-400">{formatCurrency(yearData.cash_flow.financing_activities.debt_repayment)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Equity Issuance</span>
                                  <span className="text-emerald-400">{formatCurrency(yearData.cash_flow.financing_activities.equity_issuance)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
                                  <span className="text-blue-400 font-bold">Net Cash from Financing</span>
                                  <span className={`font-bold ${yearData.cash_flow.financing_activities.net_cash_financing >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                                    {formatCurrency(yearData.cash_flow.financing_activities.net_cash_financing)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Cash Summary */}
                          <div className="mt-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-lg p-4 border border-teal-500/30">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Net Change in Cash</span>
                                <span className={`font-bold ${yearData.cash_flow.net_change_cash >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                  {yearData.cash_flow.net_change_cash >= 0 ? '+' : ''}{formatCurrency(yearData.cash_flow.net_change_cash)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Beginning Cash</span>
                                <span className="text-white font-semibold">{formatCurrency(yearData.cash_flow.beginning_cash)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Ending Cash</span>
                                <span className="text-teal-400 font-bold">{formatCurrency(yearData.cash_flow.ending_cash)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Semi-Annual Data */}
            {activeFinancialTab === 'semi-annual' && semiAnnualData && (
              <div className="space-y-6">
                <div className="text-sm text-gray-400 mb-4">
                  Values in {semiAnnualData.values_in} {semiAnnualData.currency}
                </div>
                {semiAnnualData.periods.map((period, idx) => (
                  <Card key={idx} className="bg-slate-800/50 border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{period.period}</h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(period.period_start)} - {formatDate(period.period_end)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-400">Revenue</div>
                        <div className="text-lg font-semibold text-white">
                          {formatCurrency(period.revenue)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Gross Profit</div>
                        <div className="text-lg font-semibold text-emerald-400">
                          {formatCurrency(period.gross_profit)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Operating Income</div>
                        <div className={`text-lg font-semibold ${period.operating_income >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {period.operating_income >= 0 ? '+' : ''}{formatCurrency(period.operating_income)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Net Income</div>
                        <div className={`text-lg font-semibold ${period.net_income >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {period.net_income >= 0 ? '+' : ''}{formatCurrency(period.net_income)}
                        </div>
                      </div>
                    </div>

                    {period.filing_links && period.filing_links.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="text-xs text-gray-400 mb-2">Related Filings:</div>
                        <div className="flex gap-2 flex-wrap">
                          {period.filing_links.map((link, linkIdx) => (
                            <Button
                              key={linkIdx}
                              onClick={() => window.open(link, '_blank')}
                              variant="outline"
                              size="sm"
                              className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10 text-xs"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Filing {linkIdx + 1}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* Quarterly Data */}
            {activeFinancialTab === 'quarterly' && quarterlyData && (
              <div className="space-y-6">
                <div className="text-sm text-gray-400 mb-4">
                  Values in {quarterlyData.values_in} {quarterlyData.currency}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quarterlyData.quarters.map((quarter) => (
                    <Card key={quarter.quarter} className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{quarter.quarter}</h3>
                          <p className="text-sm text-gray-400">Ended {formatDate(quarter.period_end)}</p>
                        </div>
                        {quarter.filing_link && (
                          <Button
                            onClick={() => window.open(quarter.filing_link, '_blank')}
                            variant="outline"
                            size="sm"
                            className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Revenue</span>
                          <span className="text-lg font-semibold text-white">
                            {formatCurrency(quarter.revenue)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Gross Profit</span>
                          <span className="text-lg font-semibold text-emerald-400">
                            {formatCurrency(quarter.gross_profit)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Operating Income</span>
                          <span className={`text-lg font-semibold ${quarter.operating_income >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {quarter.operating_income >= 0 ? '+' : ''}{formatCurrency(quarter.operating_income)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t border-slate-700 pt-3">
                          <span className="text-sm text-gray-400 font-semibold">Net Income</span>
                          <span className={`text-lg font-bold ${quarter.net_income >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {quarter.net_income >= 0 ? '+' : ''}{formatCurrency(quarter.net_income)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Filings Tab */}
          <TabsContent value="filings" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">OTC Markets Disclosure & Filings</h3>
              <p className="text-sm text-gray-400">
                Access all quarterly reports, annual reports, and supplemental information
              </p>
            </div>
            {filings.map((filing, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 p-6 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        filing.type === 'Annual' ? 'bg-teal-500/20 text-teal-400' :
                        filing.type === 'Quarterly' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {filing.type}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        Published: {formatDate(filing.publish_date)}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{filing.title}</h4>
                    <p className="text-sm text-gray-400">Period Ended: {formatDate(filing.period_end)}</p>
                  </div>
                  <Button
                    onClick={() => window.open(filing.link, '_blank')}
                    variant="outline"
                    size="sm"
                    className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10 flex-shrink-0"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="bg-slate-800/50 border-teal-500/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Company Name</p>
                  <p className="text-white font-semibold">{companyInfo?.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ticker Symbol</p>
                  <p className="text-white font-semibold">{companyInfo?.ticker}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Exchange</p>
                  <p className="text-white font-semibold">{companyInfo?.exchange}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Sector</p>
                  <p className="text-white font-semibold">{companyInfo?.sector}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Fiscal Year End</p>
                  <p className="text-white font-semibold">{companyInfo?.fiscal_year_end}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Headquarters</p>
                  <p className="text-white font-semibold">{companyInfo?.headquarters}</p>
                </div>
              </div>

              {/* Verification Badges */}
              {companyInfo?.verified_profile && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-sm font-semibold text-white mb-3">Verification Status</h3>
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-sm text-emerald-400">Company Verified Profile</span>
                    </div>
                    {companyInfo?.transfer_agent_verified && (
                      <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <span className="text-sm text-blue-400">Transfer Agent Verified</span>
                      </div>
                    )}
                  </div>
                  {companyInfo?.profile_verified_date && (
                    <p className="text-xs text-gray-500 mt-2">
                      Profile verified: {companyInfo.profile_verified_date}
                    </p>
                  )}
                </div>
              )}
            </Card>

            {/* Contact & Links */}
            <Card className="bg-slate-800/50 border-teal-500/20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Investor Resources</h2>
              <div className="space-y-3">
                <Button
                  onClick={() => window.open(companyInfo?.website, '_blank')}
                  variant="outline"
                  className="w-full justify-start border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Company Website
                </Button>
                <Button
                  onClick={() => window.open(companyInfo?.otc_profile, '_blank')}
                  variant="outline"
                  className="w-full justify-start border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  OTC Markets Profile
                </Button>
                <Button
                  onClick={() => window.open(companyInfo?.otc_financials, '_blank')}
                  variant="outline"
                  className="w-full justify-start border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Financials on OTC Markets
                </Button>
                <Button
                  onClick={() => window.open(companyInfo?.otc_disclosure, '_blank')}
                  variant="outline"
                  className="w-full justify-start border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Disclosure Documents
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
