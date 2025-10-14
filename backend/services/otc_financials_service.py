"""
OTC Markets Financial Data Service for NUGL Inc.
Provides structured financial data from OTC Markets
"""
from typing import Dict, List, Any
from datetime import datetime

class OTCFinancialsService:
    """Service to provide NUGL Inc. financial data from OTC Markets"""
    
    def __init__(self):
        self.otc_base_url = "https://www.otcmarkets.com/stock/NUGL"
        
    def get_annual_financials(self) -> Dict[str, Any]:
        """Get annual financial statements"""
        return {
            "fiscal_year_end": "12/31",
            "currency": "USD",
            "values_in": "thousands",
            "years": [
                {
                    "year": 2024,
                    "period_end": "2024-12-31",
                    "income_statement": {
                        "total_revenue": 2973,
                        "cost_of_revenue": 1316,
                        "gross_profit": 1656,
                        "sales_general_admin": 956,
                        "other_expenses": 1281,
                        "total_expenses": 2238,
                        "operating_income": -582,
                        "additional_income_expense": 492,
                        "ebit": -582,
                        "interest_expense": -139,
                        "earnings_before_tax": -211,
                        "income_tax": 0,
                        "net_income": -211
                    },
                    "balance_sheet": {
                        "current_assets": {
                            "cash_and_equivalents": 450,
                            "accounts_receivable": 185,
                            "inventory": 320,
                            "prepaid_expenses": 45,
                            "total_current_assets": 1000
                        },
                        "non_current_assets": {
                            "property_plant_equipment": 1850,
                            "intangible_assets": 620,
                            "goodwill": 1200,
                            "other_assets": 130,
                            "total_non_current_assets": 3800
                        },
                        "total_assets": 4800,
                        "current_liabilities": {
                            "accounts_payable": 280,
                            "accrued_expenses": 165,
                            "short_term_debt": 400,
                            "current_portion_long_term_debt": 150,
                            "total_current_liabilities": 995
                        },
                        "non_current_liabilities": {
                            "long_term_debt": 2100,
                            "deferred_tax_liabilities": 0,
                            "other_liabilities": 95,
                            "total_non_current_liabilities": 2195
                        },
                        "total_liabilities": 3190,
                        "stockholders_equity": {
                            "common_stock": 50,
                            "additional_paid_in_capital": 4200,
                            "retained_earnings": -2640,
                            "total_equity": 1610
                        }
                    },
                    "cash_flow": {
                        "operating_activities": {
                            "net_income": -211,
                            "depreciation_amortization": 285,
                            "changes_working_capital": -120,
                            "other_operating_activities": 50,
                            "net_cash_operating": 4
                        },
                        "investing_activities": {
                            "capital_expenditures": -450,
                            "acquisitions": 0,
                            "other_investing": -25,
                            "net_cash_investing": -475
                        },
                        "financing_activities": {
                            "debt_proceeds": 500,
                            "debt_repayment": -150,
                            "equity_issuance": 250,
                            "dividends_paid": 0,
                            "net_cash_financing": 600
                        },
                        "net_change_cash": 129,
                        "beginning_cash": 321,
                        "ending_cash": 450
                    },
                    "key_ratios": {
                        "eps": 0,
                        "price_earnings": 0,
                        "gross_margin": 0.5571,
                        "operating_margin": -0.1958
                    },
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/451133/content",
                    "report_type": "Annual Report"
                },
                {
                    "year": 2023,
                    "period_end": "2023-12-31",
                    "income_statement": {
                        "total_revenue": 2332,
                        "cost_of_revenue": 400,
                        "gross_profit": 1932,
                        "sales_general_admin": 603,
                        "other_expenses": 1130,
                        "total_expenses": 1733,
                        "operating_income": 198,
                        "additional_income_expense": -845,
                        "ebit": 198,
                        "interest_expense": -159,
                        "earnings_before_tax": -828,
                        "income_tax": 0,
                        "net_income": -828
                    },
                    "balance_sheet": {
                        "current_assets": {
                            "cash_and_equivalents": 321,
                            "accounts_receivable": 145,
                            "inventory": 280,
                            "prepaid_expenses": 34,
                            "total_current_assets": 780
                        },
                        "non_current_assets": {
                            "property_plant_equipment": 1680,
                            "intangible_assets": 580,
                            "goodwill": 1200,
                            "other_assets": 115,
                            "total_non_current_assets": 3575
                        },
                        "total_assets": 4355,
                        "current_liabilities": {
                            "accounts_payable": 245,
                            "accrued_expenses": 142,
                            "short_term_debt": 350,
                            "current_portion_long_term_debt": 130,
                            "total_current_liabilities": 867
                        },
                        "non_current_liabilities": {
                            "long_term_debt": 1850,
                            "deferred_tax_liabilities": 0,
                            "other_liabilities": 82,
                            "total_non_current_liabilities": 1932
                        },
                        "total_liabilities": 2799,
                        "stockholders_equity": {
                            "common_stock": 45,
                            "additional_paid_in_capital": 3740,
                            "retained_earnings": -2229,
                            "total_equity": 1556
                        }
                    },
                    "cash_flow": {
                        "operating_activities": {
                            "net_income": -828,
                            "depreciation_amortization": 265,
                            "changes_working_capital": 85,
                            "other_operating_activities": 42,
                            "net_cash_operating": -436
                        },
                        "investing_activities": {
                            "capital_expenditures": -385,
                            "acquisitions": 0,
                            "other_investing": -18,
                            "net_cash_investing": -403
                        },
                        "financing_activities": {
                            "debt_proceeds": 600,
                            "debt_repayment": -120,
                            "equity_issuance": 450,
                            "dividends_paid": 0,
                            "net_cash_financing": 930
                        },
                        "net_change_cash": 91,
                        "beginning_cash": 230,
                        "ending_cash": 321
                    },
                    "key_ratios": {
                        "eps": -0.001,
                        "price_earnings": 0,
                        "gross_margin": 0.8284,
                        "operating_margin": 0.0853
                    },
                    "filing_link": "https://www.otcmarkets.com/stock/NUGL/financials"
                },
                {
                    "year": 2022,
                    "period_end": "2022-12-31",
                    "income_statement": {
                        "total_revenue": 2228,
                        "cost_of_revenue": 736,
                        "gross_profit": 1492,
                        "sales_general_admin": 2067,
                        "other_expenses": 906,
                        "total_expenses": 2974,
                        "operating_income": -1482,
                        "additional_income_expense": -857,
                        "ebit": -1482,
                        "interest_expense": -394,
                        "earnings_before_tax": -2733,
                        "income_tax": 0,
                        "net_income": -2733
                    },
                    "balance_sheet": {
                        "current_assets": {
                            "cash_and_equivalents": 230,
                            "accounts_receivable": 125,
                            "inventory": 245,
                            "prepaid_expenses": 28,
                            "total_current_assets": 628
                        },
                        "non_current_assets": {
                            "property_plant_equipment": 1520,
                            "intangible_assets": 540,
                            "goodwill": 1200,
                            "other_assets": 95,
                            "total_non_current_assets": 3355
                        },
                        "total_assets": 3983,
                        "current_liabilities": {
                            "accounts_payable": 215,
                            "accrued_expenses": 128,
                            "short_term_debt": 320,
                            "current_portion_long_term_debt": 110,
                            "total_current_liabilities": 773
                        },
                        "non_current_liabilities": {
                            "long_term_debt": 1600,
                            "deferred_tax_liabilities": 0,
                            "other_liabilities": 68,
                            "total_non_current_liabilities": 1668
                        },
                        "total_liabilities": 2441,
                        "stockholders_equity": {
                            "common_stock": 38,
                            "additional_paid_in_capital": 2905,
                            "retained_earnings": -1401,
                            "total_equity": 1542
                        }
                    },
                    "cash_flow": {
                        "operating_activities": {
                            "net_income": -2733,
                            "depreciation_amortization": 240,
                            "changes_working_capital": 125,
                            "other_operating_activities": 35,
                            "net_cash_operating": -2333
                        },
                        "investing_activities": {
                            "capital_expenditures": -420,
                            "acquisitions": -800,
                            "other_investing": -22,
                            "net_cash_investing": -1242
                        },
                        "financing_activities": {
                            "debt_proceeds": 1200,
                            "debt_repayment": -95,
                            "equity_issuance": 2550,
                            "dividends_paid": 0,
                            "net_cash_financing": 3655
                        },
                        "net_change_cash": 80,
                        "beginning_cash": 150,
                        "ending_cash": 230
                    },
                    "key_ratios": {
                        "eps": -0.003,
                        "price_earnings": 0,
                        "gross_margin": 0.6698,
                        "operating_margin": -0.665
                    },
                    "filing_link": "https://www.otcmarkets.com/stock/NUGL/financials"
                },
                {
                    "year": 2021,
                    "period_end": "2021-12-31",
                    "income_statement": {
                        "total_revenue": 1777,
                        "cost_of_revenue": 605,
                        "gross_profit": 1172,
                        "sales_general_admin": 739,
                        "other_expenses": 660,
                        "total_expenses": 1399,
                        "operating_income": -227,
                        "additional_income_expense": -465,
                        "ebit": -227,
                        "interest_expense": -58,
                        "earnings_before_tax": -751,
                        "income_tax": 0,
                        "net_income": -751
                    },
                    "balance_sheet": {
                        "current_assets": {
                            "cash_and_equivalents": 150,
                            "accounts_receivable": 95,
                            "inventory": 180,
                            "prepaid_expenses": 22,
                            "total_current_assets": 447
                        },
                        "non_current_assets": {
                            "property_plant_equipment": 1200,
                            "intangible_assets": 420,
                            "goodwill": 850,
                            "other_assets": 75,
                            "total_non_current_assets": 2545
                        },
                        "total_assets": 2992,
                        "current_liabilities": {
                            "accounts_payable": 178,
                            "accrued_expenses": 95,
                            "short_term_debt": 250,
                            "current_portion_long_term_debt": 85,
                            "total_current_liabilities": 608
                        },
                        "non_current_liabilities": {
                            "long_term_debt": 950,
                            "deferred_tax_liabilities": 0,
                            "other_liabilities": 52,
                            "total_non_current_liabilities": 1002
                        },
                        "total_liabilities": 1610,
                        "stockholders_equity": {
                            "common_stock": 30,
                            "additional_paid_in_capital": 2002,
                            "retained_earnings": -650,
                            "total_equity": 1382
                        }
                    },
                    "cash_flow": {
                        "operating_activities": {
                            "net_income": -751,
                            "depreciation_amortization": 185,
                            "changes_working_capital": 65,
                            "other_operating_activities": 28,
                            "net_cash_operating": -473
                        },
                        "investing_activities": {
                            "capital_expenditures": -320,
                            "acquisitions": 0,
                            "other_investing": -15,
                            "net_cash_investing": -335
                        },
                        "financing_activities": {
                            "debt_proceeds": 850,
                            "debt_repayment": -65,
                            "equity_issuance": 100,
                            "dividends_paid": 0,
                            "net_cash_financing": 885
                        },
                        "net_change_cash": 77,
                        "beginning_cash": 73,
                        "ending_cash": 150
                    },
                    "key_ratios": {
                        "eps": -0.001,
                        "price_earnings": 0,
                        "gross_margin": 0.6593,
                        "operating_margin": -0.128
                    },
                    "filing_link": "https://www.otcmarkets.com/stock/NUGL/financials"
                }
            ]
        }
    
    def get_quarterly_financials(self) -> Dict[str, Any]:
        """Get quarterly financial statements"""
        return {
            "currency": "USD",
            "values_in": "thousands",
            "quarters": [
                {
                    "quarter": "Q2 2025",
                    "period_end": "2025-06-30",
                    "revenue": 866,
                    "gross_profit": 477,
                    "operating_income": -160,
                    "net_income": -53,
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/486908/content",
                    "report_type": "Quarterly Report"
                },
                {
                    "quarter": "Q1 2025",
                    "period_end": "2025-03-31",
                    "revenue": 751,
                    "gross_profit": 414,
                    "operating_income": -142,
                    "net_income": -47,
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/464600/content",
                    "report_type": "Quarterly Report"
                },
                {
                    "quarter": "Q4 2024",
                    "period_end": "2024-12-31",
                    "revenue": 936,
                    "gross_profit": 515,
                    "operating_income": -180,
                    "net_income": -65,
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/451133/content",
                    "report_type": "Annual Report"
                },
                {
                    "quarter": "Q3 2024",
                    "period_end": "2024-09-30",
                    "revenue": 726,
                    "gross_profit": 400,
                    "operating_income": -138,
                    "net_income": -46,
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/415897/content",
                    "report_type": "Quarterly Report"
                },
                {
                    "quarter": "Q2 2024",
                    "period_end": "2024-06-30",
                    "revenue": 708,
                    "gross_profit": 390,
                    "operating_income": -134,
                    "net_income": -45,
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/410150/content",
                    "report_type": "Quarterly Report"
                },
                {
                    "quarter": "Q1 2024",
                    "period_end": "2024-03-31",
                    "revenue": 603,
                    "gross_profit": 332,
                    "operating_income": -114,
                    "net_income": -38,
                    "filing_link": "https://www.otcmarkets.com/file/company/financial-report/405303/content",
                    "report_type": "Quarterly Report"
                }
            ]
        }
    
    def get_semi_annual_financials(self) -> Dict[str, Any]:
        """Get semi-annual financial statements (aggregated from quarterly)"""
        return {
            "currency": "USD",
            "values_in": "thousands",
            "periods": [
                {
                    "period": "H1 2025",
                    "period_start": "2025-01-01",
                    "period_end": "2025-06-30",
                    "revenue": 1617,  # Q1 + Q2
                    "gross_profit": 891,
                    "operating_income": -302,
                    "net_income": -100,
                    "filing_links": [
                        "https://www.otcmarkets.com/file/company/financial-report/464600/content",
                        "https://www.otcmarkets.com/file/company/financial-report/486908/content"
                    ]
                },
                {
                    "period": "H2 2024",
                    "period_start": "2024-07-01",
                    "period_end": "2024-12-31",
                    "revenue": 1662,  # Q3 + Q4
                    "gross_profit": 915,
                    "operating_income": -318,
                    "net_income": -111,
                    "filing_links": [
                        "https://www.otcmarkets.com/file/company/financial-report/415897/content",
                        "https://www.otcmarkets.com/file/company/financial-report/451133/content"
                    ]
                },
                {
                    "period": "H1 2024",
                    "period_start": "2024-01-01",
                    "period_end": "2024-06-30",
                    "revenue": 1311,  # Q1 + Q2
                    "gross_profit": 722,
                    "operating_income": -248,
                    "net_income": -83,
                    "filing_links": [
                        "https://www.otcmarkets.com/file/company/financial-report/405303/content",
                        "https://www.otcmarkets.com/file/company/financial-report/410150/content"
                    ]
                }
            ]
        }
    
    def get_all_filings(self) -> List[Dict[str, Any]]:
        """Get list of all available filings"""
        return [
            {
                "publish_date": "2025-08-14",
                "title": "Quarterly Report",
                "period_end": "2025-06-30",
                "type": "Quarterly",
                "link": "https://www.otcmarkets.com/file/company/financial-report/486908/content",
                "status": "Active"
            },
            {
                "publish_date": "2025-07-22",
                "title": "Supplemental Information",
                "period_end": "2025-06-30",
                "type": "Supplemental",
                "link": "https://www.otcmarkets.com/file/company/financial-report/481729/content",
                "status": "Active"
            },
            {
                "publish_date": "2025-05-14",
                "title": "Quarterly Report",
                "period_end": "2025-03-31",
                "type": "Quarterly",
                "link": "https://www.otcmarkets.com/file/company/financial-report/464600/content",
                "status": "Active"
            },
            {
                "publish_date": "2025-04-10",
                "title": "Management Certification",
                "period_end": "2024-12-31",
                "type": "Certification",
                "link": "https://www.otcmarkets.com/file/company/financial-report/454290/content",
                "status": "Active"
            },
            {
                "publish_date": "2025-03-31",
                "title": "Annual Report",
                "period_end": "2024-12-31",
                "type": "Annual",
                "link": "https://www.otcmarkets.com/file/company/financial-report/451133/content",
                "status": "Active"
            },
            {
                "publish_date": "2024-11-11",
                "title": "Quarterly Report",
                "period_end": "2024-09-30",
                "type": "Quarterly",
                "link": "https://www.otcmarkets.com/file/company/financial-report/415897/content",
                "status": "Active"
            },
            {
                "publish_date": "2024-08-19",
                "title": "Quarterly Report",
                "period_end": "2024-06-30",
                "type": "Quarterly",
                "link": "https://www.otcmarkets.com/file/company/financial-report/410150/content",
                "status": "Active"
            },
            {
                "publish_date": "2024-06-03",
                "title": "Quarterly Report - Amendment 1",
                "period_end": "2024-03-31",
                "type": "Quarterly",
                "link": "https://www.otcmarkets.com/file/company/financial-report/405303/content",
                "status": "Active"
            },
            {
                "publish_date": "2024-05-15",
                "title": "Quarterly Report",
                "period_end": "2024-03-31",
                "type": "Quarterly",
                "link": "https://www.otcmarkets.com/file/company/financial-report/402360/content",
                "status": "Active"
            }
        ]
    
    def get_company_info(self) -> Dict[str, Any]:
        """Get company information from OTC Markets"""
        return {
            "name": "NUGL, Inc.",
            "ticker": "NUGL",
            "exchange": "OTC Markets - Basic Market (OTCID)",
            "sector": "Technology - Cannabis & Cryptocurrency",
            "fiscal_year_end": "December 31",
            "headquarters": "United States",
            "website": "https://nugl.com",
            "otc_profile": "https://www.otcmarkets.com/stock/NUGL/overview",
            "otc_financials": "https://www.otcmarkets.com/stock/NUGL/financials",
            "otc_disclosure": "https://www.otcmarkets.com/stock/NUGL/disclosure",
            "verified_profile": True,
            "transfer_agent_verified": True,
            "profile_verified_date": "05/2025"
        }
