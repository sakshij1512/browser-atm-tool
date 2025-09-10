import React, { useState } from "react";
import axios from "axios";
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Image, 
  Globe, 
  ShoppingCart,
  Tag,
  FileText,
  Eye,
  ExternalLink,
  Activity
} from "lucide-react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request to:", "http://localhost:4000/api/run-test");
      console.log("Request payload:", { url, platform: "shopify" });
      
      const res = await axios.post("http://localhost:4000/api/run-test", {
        url,
        platform: "shopify",
      });
      
      console.log("Response received:", res.data);
      setResult(res.data);
    } catch (err) {
      console.error("Error running test:", err);
      console.error("Error details:", err.response?.data || err.message);
      alert(`Failed to run test: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    return status ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusColor = (status) => {
    return status ? "text-green-600" : "text-red-600";
  };

  const formatCheckName = (key) => {
    const names = {
      titleFound: "Product Title",
      priceFound: "Price Information",
      addToCartFound: "Add to Cart Button",
      descriptionFound: "Product Description",
      variantsFound: "Product Variants",
      availabilityFound: "Stock Availability",
      metaTitleFound: "Meta Title",
      metaDescriptionFound: "Meta Description"
    };
    return names[key] || key;
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <h1 className="title">
            <ShoppingCart className="w-8 h-8" />
            Ecommerce Test Dashboard
          </h1>
          <p className="subtitle">Analyze product pages for completeness and performance</p>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="input-wrapper">
            <Globe className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter product URL (e.g., https://example.com/product)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && runTest()}
              disabled={loading}
            />
          </div>
          <button 
            onClick={runTest} 
            disabled={loading}
            className="run-button"
          >
            {loading ? (
              <Activity className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            {loading ? "Testing..." : "Run Test"}
          </button>
        </div>
      </div>

      {result && (
        <>
          {/* Debug Information - Remove this in production */}
          <div style={{ 
            background: '#f0f0f0', 
            padding: '1rem', 
            margin: '1rem 0', 
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontFamily: 'monospace'
          }}>
            <strong>Debug Info:</strong>
            <br />
            Platform: {result.platformUsed}
            <br />
            {/* URL: {result.urlTested} */}
            <br />
            Checks: {Object.keys(result.summary?.productChecks || {}).length}
            <br />
            Findings: {result.findings?.length || 0}
          </div>
          
        <div className="dashboard">
          {/* Overview Cards */}
          <div className="overview-grid">
            <div className="overview-card success">
              <div className="overview-icon">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="overview-content">
                <div className="overview-number">
                  {Object.values(result.summary.productChecks).filter(Boolean).length}
                </div>
                <div className="overview-label">Checks Passed</div>
              </div>
            </div>

            <div className="overview-card warning">
              <div className="overview-icon">
                <Image className="w-6 h-6" />
              </div>
              <div className="overview-content">
                <div className="overview-number">{result.summary.images.total}</div>
                <div className="overview-label">Total Images</div>
              </div>
            </div>

            <div className="overview-card error">
              <div className="overview-icon">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="overview-content">
                <div className="overview-number">{result.summary.errors.consoleCount}</div>
                <div className="overview-label">Console Errors</div>
              </div>
            </div>

            <div className="overview-card info">
              <div className="overview-icon">
                <Activity className="w-6 h-6" />
              </div>
              <div className="overview-content">
                <div className="overview-number">{result.summary.images.loaded}</div>
                <div className="overview-label">Images Loaded</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Product Checks */}
            <div className="card">
              <div className="card-header">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <h2>Product Element Checks</h2>
              </div>
              <div className="card-content">
                <div className="checks-grid">
                  {Object.entries(result.summary.productChecks).map(([key, value]) => (
                    <div key={key} className="check-item">
                      <div className="check-status">
                        {getStatusIcon(value)}
                      </div>
                      <div className="check-details">
                        <div className="check-name">{formatCheckName(key)}</div>
                        <div className={`check-result ${getStatusColor(value)}`}>
                          {value ? "Found" : "Missing"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="card">
              <div className="card-header">
                <Tag className="w-5 h-5 text-purple-500" />
                <h2>Extracted Product Data</h2>
              </div>
              <div className="card-content">
                <div className="product-info">
                  {result.summary.matched.values.title && (
                    <div className="info-item">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="info-label">Product Title</div>
                        <div className="info-value">{result.summary.matched.values.title}</div>
                      </div>
                    </div>
                  )}
                  
                  {result.summary.matched.values.price && (
                    <div className="info-item">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="info-label">Price</div>
                        <div className="info-value">₹{result.summary.matched.values.price}</div>
                      </div>
                    </div>
                  )}

                  {result.summary.matched.values.metaTitle && (
                    <div className="info-item">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="info-label">Meta Title</div>
                        <div className="info-value meta-title">{result.summary.matched.values.metaTitle}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image Analysis */}
            <div className="card">
              <div className="card-header">
                <Image className="w-5 h-5 text-green-500" />
                <h2>Image Analysis</h2>
              </div>
              <div className="card-content">
                <div className="image-stats">
                  <div className="stat-row">
                    <span className="stat-label">Total Images:</span>
                    <span className="stat-value">{result.summary.images.total}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Successfully Loaded:</span>
                    <span className="stat-value text-green-600">{result.summary.images.loaded}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Broken Images:</span>
                    <span className="stat-value text-red-600">{result.summary.images.broken}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Missing Alt Text:</span>
                    <span className="stat-value text-orange-600">{result.summary.images.altMissing}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Invalid Dimensions:</span>
                    <span className="stat-value">{result.summary.images.invalidDimensions}</span>
                  </div>
                </div>

                {result.summary.images.broken > 0 && (
                  <div className="broken-images">
                    <h4>Broken Images:</h4>
                    <div className="broken-list">
                      {result.summary.images.brokenSamples?.slice(0, 5).map((img, i) => (
                        <div key={i} className="broken-item">{img}</div>
                      ))}
                      {result.summary.images.brokenSamples?.length > 5 && (
                        <div className="broken-item">
                          ... and {result.summary.images.brokenSamples.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Analysis */}
            <div className="card">
              <div className="card-header">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2>Error Analysis</h2>
              </div>
              <div className="card-content">
                <div className="error-stats">
                  <div className="stat-row">
                    <span className="stat-label">Console Errors:</span>
                    <span className="stat-value text-red-600">{result.summary.errors.consoleCount}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Network Failures:</span>
                    <span className="stat-value text-red-600">{result.summary.errors.networkFailures}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Total Findings:</span>
                    <span className="stat-value text-orange-600">{result.findings?.length || 0}</span>
                  </div>
                </div>

                {result.findings && result.findings.length > 0 && (
                  <div className="findings">
                    <h4>Detailed Findings:</h4>
                    <div className="findings-list">
                      {result.findings.slice(0, 10).map((finding, i) => (
                        <div key={i} className={`finding-item ${finding.severity}`}>
                          <AlertTriangle className="w-4 h-4" />
                          <div className="finding-content">
                            <div className="finding-type">{finding.type} - {finding.severity}</div>
                            <div className="finding-message">{finding.message}</div>
                            {finding.meta?.stack && (
                              <div className="finding-stack">
                                <details>
                                  <summary>Stack trace</summary>
                                  <pre>{finding.meta.stack}</pre>
                                </details>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {result.findings.length > 10 && (
                        <div className="finding-item info">
                          <AlertTriangle className="w-4 h-4" />
                          <div className="finding-content">
                            <div className="finding-type">Info</div>
                            <div className="finding-message">
                              ... and {result.findings.length - 10} more findings
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Test Information */}
            <div className="card full-width">
              <div className="card-header">
                <Eye className="w-5 h-5 text-indigo-500" />
                <h2>Test Information</h2>
              </div>
              <div className="card-content">
                <div className="test-info">
                  <div className="test-item">
                    <div className="test-label">Platform Used:</div>
                    <div className="test-value">
                      <span className="platform-badge">{result.platformUsed}</span>
                    </div>
                  </div>
                  <div className="test-item">
                    <div className="test-label">Tested URL:</div>
                    <div className="test-value">
                      <a 
                        href={result.urlTested} 
                        target="_blank" 
                        rel="noreferrer"
                        className="url-link"
                      >
                        {result.urlTested}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default App;