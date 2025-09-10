import React from 'react';
import './index.css'

// StatusTag component
export const StatusTag = ({ value }) => (
  <span className={`ecom-status ${value ? 'ecom-found' : 'ecom-missing'}`}>{value ? 'Found' : 'Missing'}</span>
);

const Dashboard = ({ result }) => {
  if (!result) return null;

  const productChecks = result?.summary?.productChecks || {};
  const images = result?.summary?.images || { total: 0, loaded: 0, broken: 0, brokenSamples: [] };
  const matchedValues = result?.summary?.matched?.values || {};
  const imagePercent = images.total > 0 ? Math.round((images.loaded / images.total) * 100) : 0;

  return (
    <div className="ecom-grid">
      {/* Product Checks */}
      <div className="ecom-card">
        <h2 className="ecom-title">✅ Product Checks</h2>
        <ul className="ecom-list">
          {Object.entries(productChecks).map(([key, val]) => (
            <li key={key} className="ecom-list-item">
              <span className="ecom-cap">{key.replace(/([A-Z])/g, ' $1')}</span>
              <StatusTag value={val} />
            </li>
          ))}
        </ul>
      </div>

      {/* Images */}
      <div className="ecom-card">
        <h2 className="ecom-title">🖼️ Images</h2>
        <div className="ecom-row" style={{ marginTop: 4 }}>
          <div>
            <strong>Total</strong>
            <div className="ecom-muted">{images.total}</div>
          </div>
          <div>
            <strong>Loaded</strong>
            <div className="ecom-muted">{images.loaded}</div>
          </div>
          <div>
            <strong>Broken</strong>
            <div className="ecom-muted">{images.broken}</div>
          </div>
        </div>

        <div className="ecom-progress-wrap">
          <div className="ecom-progress" style={{ width: `${imagePercent}%` }} />
        </div>
        <div className="ecom-muted" style={{ marginTop: 8 }}>{imagePercent}% loaded</div>

        {images.broken > 0 && (
          <div style={{ marginTop: 12 }}>
            <strong>Broken samples</strong>
            <ul className="ecom-small-list">
              {images.brokenSamples.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Errors */}
      <div className="ecom-card">
        <h2 className="ecom-title">⚠️ Errors</h2>
        <p><strong>Console:</strong> {result.summary.errors?.consoleCount ?? 0}</p>
        <p><strong>Network:</strong> {result.summary.errors?.networkFailures ?? 0}</p>
      </div>

      {/* Matched values */}
      <div className="ecom-card">
        <h2 className="ecom-title">📌 Matched Values</h2>
        <ul className="ecom-list">
          {Object.entries(matchedValues).map(([k, v]) => (
            <li key={k} className="ecom-list-item">
              <strong>{k}:</strong>
              <span className="ecom-code">{v === null ? '—' : String(v)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Test Info */}
      <div className="ecom-card ecom-full">
        <h2 className="ecom-title">🌐 Test Info</h2>
        <div className="ecom-row-between">
          <div>
            <strong>Platform:</strong>
            <div className="ecom-muted">{result.platformUsed}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>URL:</strong>
            <div className="ecom-muted"><a href={result.urlTested} target="_blank" rel="noreferrer">{result.urlTested}</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
