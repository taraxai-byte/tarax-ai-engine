import React from 'react';

export default function Home() {
  return (
    <main style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          backgroundColor: '#1e293b',
          color: '#38bdf8',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          ● Powered by Google Gemini API (Free Tier)
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 0.5rem 0', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          TARAX AI ENGINE
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.125rem', maxWidth: '600px' }}>
          Autonomous B2B Global Trade & Multi-Agent Negotiation Console
        </p>
      </header>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '1000px'
      }}>
        {/* Card 1: Status */}
        <div style={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Engine Status</h3>
          <p style={{ color: '#e5e5e5', fontSize: '0.95rem' }}>
            <strong>Backend API:</strong> Active & Live<br />
            <strong>AI Model:</strong> Gemini 1.5 Flash<br />
            <strong>Deployment:</strong> Vercel Global Edge
          </p>
        </div>

        {/* Card 2: Multi-Agent Trade Engine */}
        <div style={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#818cf8', marginTop: 0 }}>Autonomous Agents</h3>
          <p style={{ color: '#e5e5e5', fontSize: '0.95rem' }}>
            <strong>Buyer Agent:</strong> Ready<br />
            <strong>Supplier Agent:</strong> Ready<br />
            <strong>Escrow Mediator:</strong> Active
          </p>
        </div>

        {/* Card 3: Global Trade RFQ */}
        <div style={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ color: '#34d399', marginTop: 0 }}>Smart Escrow Protocol</h3>
          <p style={{ color: '#e5e5e5', fontSize: '0.95rem' }}>
            Automated B2B contract verification and deal settlement ready for API triggers.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', paddingTop: '3rem', color: '#525252', fontSize: '0.875rem' }}>
        TARAX AI &copy; {new Date().getFullYear()} - Autonomous B2B Trade Infrastructure
      </footer>
    </main>
  );
}
