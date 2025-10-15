#!/usr/bin/env python3
"""
Backend API Testing Script for NUGL Media Endpoints
Tests the /api/media endpoint with various category filters
"""

import requests
import json
import sys
from typing import Dict, List, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend .env
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://greentech-hub-3.preview.emergentagent.com')
BASE_API_URL = f"{BACKEND_URL}/api"

class MediaEndpointTester:
    def __init__(self):
        self.base_url = BASE_API_URL
        self.test_results = []
        
    def log_result(self, test_name: str, success: bool, message: str, details: Dict = None):
        """Log test result"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details:
            print(f"   Details: {json.dumps(details, indent=2)}")
        print()

    def test_media_endpoint_all(self):
        """Test GET /api/media - should return all 26 articles"""
        try:
            response = requests.get(f"{self.base_url}/media", timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    "GET /api/media (all articles)",
                    False,
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                return
            
            articles = response.json()
            article_count = len(articles)
            
            # Verify structure of first article if any exist
            structure_valid = True
            structure_errors = []
            
            if articles:
                first_article = articles[0]
                required_fields = ['id', 'title', 'url', 'category', 'excerpt', 'image', 'date', 'source']
                
                for field in required_fields:
                    if field not in first_article:
                        structure_valid = False
                        structure_errors.append(f"Missing field: {field}")
                
                # Check field types
                if 'id' in first_article and not isinstance(first_article['id'], str):
                    structure_valid = False
                    structure_errors.append("'id' should be string")
                
                if 'subcategory' in first_article and first_article['subcategory'] is not None and not isinstance(first_article['subcategory'], str):
                    structure_valid = False
                    structure_errors.append("'subcategory' should be string or null")
            
            success = response.status_code == 200 and structure_valid
            expected_count = 26
            count_match = article_count == expected_count
            
            message = f"Retrieved {article_count} articles (expected {expected_count})"
            if not count_match:
                message += f" - COUNT MISMATCH"
            if not structure_valid:
                message += f" - STRUCTURE ISSUES: {', '.join(structure_errors)}"
            
            self.log_result(
                "GET /api/media (all articles)",
                success and count_match,
                message,
                {
                    "article_count": article_count,
                    "expected_count": expected_count,
                    "structure_valid": structure_valid,
                    "structure_errors": structure_errors,
                    "sample_article": articles[0] if articles else None
                }
            )
            
        except requests.exceptions.RequestException as e:
            self.log_result(
                "GET /api/media (all articles)",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )
        except Exception as e:
            self.log_result(
                "GET /api/media (all articles)",
                False,
                f"Unexpected error: {str(e)}",
                {"error": str(e)}
            )

    def test_media_endpoint_by_category(self, category: str, expected_count: int):
        """Test GET /api/media?category={category}"""
        try:
            response = requests.get(f"{self.base_url}/media", params={'category': category}, timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    f"GET /api/media?category={category}",
                    False,
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                return
            
            articles = response.json()
            article_count = len(articles)
            
            # Verify all articles have the correct category
            category_match = True
            wrong_categories = []
            
            for article in articles:
                if article.get('category') != category:
                    category_match = False
                    wrong_categories.append(article.get('category', 'None'))
            
            count_match = article_count == expected_count
            success = response.status_code == 200 and category_match and count_match
            
            message = f"Retrieved {article_count} articles for category '{category}' (expected {expected_count})"
            if not count_match:
                message += f" - COUNT MISMATCH"
            if not category_match:
                message += f" - CATEGORY MISMATCH: found {set(wrong_categories)}"
            
            self.log_result(
                f"GET /api/media?category={category}",
                success,
                message,
                {
                    "category": category,
                    "article_count": article_count,
                    "expected_count": expected_count,
                    "category_match": category_match,
                    "wrong_categories": list(set(wrong_categories)) if wrong_categories else [],
                    "sample_articles": articles[:2] if articles else []
                }
            )
            
        except requests.exceptions.RequestException as e:
            self.log_result(
                f"GET /api/media?category={category}",
                False,
                f"Request failed: {str(e)}",
                {"error": str(e)}
            )
        except Exception as e:
            self.log_result(
                f"GET /api/media?category={category}",
                False,
                f"Unexpected error: {str(e)}",
                {"error": str(e)}
            )

    def test_media_endpoint_response_structure(self):
        """Test that media endpoint returns proper MediaArticle structure"""
        try:
            response = requests.get(f"{self.base_url}/media", timeout=10)
            
            if response.status_code != 200:
                self.log_result(
                    "Media Response Structure",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return
            
            articles = response.json()
            
            if not articles:
                self.log_result(
                    "Media Response Structure",
                    False,
                    "No articles returned to test structure"
                )
                return
            
            # Test structure of multiple articles
            structure_issues = []
            valid_articles = 0
            
            for i, article in enumerate(articles[:5]):  # Test first 5 articles
                required_fields = ['id', 'title', 'url', 'category', 'excerpt', 'image', 'date', 'source']
                optional_fields = ['subcategory']
                
                for field in required_fields:
                    if field not in article:
                        structure_issues.append(f"Article {i}: Missing required field '{field}'")
                    elif article[field] is None:
                        structure_issues.append(f"Article {i}: Required field '{field}' is null")
                    elif not isinstance(article[field], str):
                        structure_issues.append(f"Article {i}: Field '{field}' should be string, got {type(article[field])}")
                
                # Check URL validity
                if 'url' in article and article['url']:
                    if not (article['url'].startswith('http://') or article['url'].startswith('https://')):
                        structure_issues.append(f"Article {i}: Invalid URL format: {article['url']}")
                
                # Check image URL validity
                if 'image' in article and article['image']:
                    if not (article['image'].startswith('http://') or article['image'].startswith('https://')):
                        structure_issues.append(f"Article {i}: Invalid image URL format: {article['image']}")
                
                if len(structure_issues) == 0:
                    valid_articles += 1
            
            success = len(structure_issues) == 0
            message = f"Validated structure of {min(5, len(articles))} articles"
            if structure_issues:
                message += f" - Found {len(structure_issues)} issues"
            
            self.log_result(
                "Media Response Structure",
                success,
                message,
                {
                    "total_articles_tested": min(5, len(articles)),
                    "valid_articles": valid_articles,
                    "structure_issues": structure_issues[:10],  # Limit to first 10 issues
                    "sample_valid_article": articles[0] if success and articles else None
                }
            )
            
        except Exception as e:
            self.log_result(
                "Media Response Structure",
                False,
                f"Error testing structure: {str(e)}",
                {"error": str(e)}
            )

    def run_all_tests(self):
        """Run all media endpoint tests"""
        print(f"🚀 Starting Media Endpoint Tests")
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test all articles
        self.test_media_endpoint_all()
        
        # Test response structure
        self.test_media_endpoint_response_structure()
        
        # Test category filters with expected counts
        categories_to_test = [
            ("Business", 5),
            ("Culture", 6),
            ("NUGL TV", 2),
            ("Wellness", 5),
            ("Grow Products", 6),
            ("Events", 2)
        ]
        
        for category, expected_count in categories_to_test:
            self.test_media_endpoint_by_category(category, expected_count)
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return passed_tests == total_tests

def main():
    """Main test execution"""
    tester = MediaEndpointTester()
    success = tester.run_all_tests()
    
    # Return appropriate exit code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()