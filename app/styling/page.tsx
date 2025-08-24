import React from 'react'

const StylingGuidePage = () => {
  const colorPalettes = {
    primary: [
      { name: 'primary-50', value: '#f0f4ff', text: 'text-neutral-800' },
      { name: 'primary-100', value: '#e0ecff', text: 'text-neutral-800' },
      { name: 'primary-200', value: '#c7dbff', text: 'text-neutral-800' },
      { name: 'primary-300', value: '#a4c2ff', text: 'text-neutral-800' },
      { name: 'primary-400', value: '#8199ff', text: 'text-white' },
      { name: 'primary-500', value: '#6366f1', text: 'text-white' },
      { name: 'primary-600', value: '#4f46e5', text: 'text-white' },
      { name: 'primary-700', value: '#4338ca', text: 'text-white' },
      { name: 'primary-800', value: '#3730a3', text: 'text-white' },
      { name: 'primary-900', value: '#312e81', text: 'text-white' },
    ],
    secondary: [
      { name: 'secondary-50', value: '#faf7ff', text: 'text-neutral-800' },
      { name: 'secondary-100', value: '#f4edff', text: 'text-neutral-800' },
      { name: 'secondary-200', value: '#e9d8ff', text: 'text-neutral-800' },
      { name: 'secondary-300', value: '#d8b9ff', text: 'text-neutral-800' },
      { name: 'secondary-400', value: '#c589ff', text: 'text-white' },
      { name: 'secondary-500', value: '#a855f7', text: 'text-white' },
      { name: 'secondary-600', value: '#9333ea', text: 'text-white' },
      { name: 'secondary-700', value: '#7c2d12', text: 'text-white' },
      { name: 'secondary-800', value: '#6b21a8', text: 'text-white' },
      { name: 'secondary-900', value: '#581c87', text: 'text-white' },
    ],
    neutral: [
      { name: 'neutral-50', value: '#f8fafc', text: 'text-neutral-800' },
      { name: 'neutral-100', value: '#f1f5f9', text: 'text-neutral-800' },
      { name: 'neutral-200', value: '#e2e8f0', text: 'text-neutral-800' },
      { name: 'neutral-300', value: '#cbd5e1', text: 'text-neutral-800' },
      { name: 'neutral-400', value: '#94a3b8', text: 'text-white' },
      { name: 'neutral-500', value: '#64748b', text: 'text-white' },
      { name: 'neutral-600', value: '#475569', text: 'text-white' },
      { name: 'neutral-700', value: '#334155', text: 'text-white' },
      { name: 'neutral-800', value: '#1e293b', text: 'text-white' },
      { name: 'neutral-900', value: '#0f172a', text: 'text-white' },
    ]
  }

  const typographyScales = [
    { name: 'text-xs', size: '12px', example: 'Extra small text' },
    { name: 'text-sm', size: '14px', example: 'Small text' },
    { name: 'text-base', size: '16px', example: 'Base text' },
    { name: 'text-lg', size: '18px', example: 'Large text' },
    { name: 'text-xl', size: '20px', example: 'Extra large text' },
    { name: 'text-2xl', size: '24px', example: 'Double extra large' },
    { name: 'text-3xl', size: '30px', example: 'Triple extra large' },
    { name: 'text-4xl', size: '36px', example: 'Heading 1' },
    { name: 'text-5xl', size: '48px', example: 'Hero Title' },
  ]

  const spacingScale = [
    { name: 'p-1', size: '4px' },
    { name: 'p-2', size: '8px' },
    { name: 'p-3', size: '12px' },
    { name: 'p-4', size: '16px' },
    { name: 'p-6', size: '24px' },
    { name: 'p-8', size: '32px' },
    { name: 'p-12', size: '48px' },
    { name: 'p-16', size: '64px' },
  ]

  const shadowStyles = [
    { name: 'shadow-soft', class: 'shadow-soft' },
    { name: 'shadow-medium', class: 'shadow-medium' },
    { name: 'shadow-large', class: 'shadow-large' },
    { name: 'shadow-glow', class: 'shadow-glow' },
    { name: 'shadow-inner', class: 'shadow-inner' },
  ]

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-gradient-primary shadow-medium">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Design System Guide
          </h1>
          <p className="text-primary-100 text-lg md:text-xl max-w-2xl">
            Complete styling reference including colors, typography, spacing, and components
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Navigation */}
        <nav className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center bg-background-secondary p-6 rounded-2xl shadow-soft">
            {['Colors', 'Typography', 'Spacing', 'Shadows', 'Components', 'Layout'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-6 py-2 bg-white text-text-primary font-medium rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Color Palette</h2>
          
          {Object.entries(colorPalettes).map(([paletteName, colors]) => (
            <div key={paletteName} className="mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-text-secondary mb-6 capitalize">
                {paletteName} Colors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="group">
                    <div 
                      className={`w-full h-20 md:h-24 rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-200 ${color.text} flex items-center justify-center font-medium text-sm`}
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {color.name.split('-')[1]}
                      </span>
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-text-secondary">{color.name}</p>
                      <p className="text-xs text-text-muted">{color.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Status Colors */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-text-secondary mb-6">Status Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-success-50 border border-success-200 p-6 rounded-2xl">
                <div className="w-8 h-8 bg-success-500 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-success-700 mb-2">Success</h4>
                <p className="text-success-600 text-sm">Used for positive actions and confirmations</p>
                <code className="text-xs bg-success-100 px-2 py-1 rounded mt-2 inline-block">bg-success-500</code>
              </div>
              <div className="bg-warning-50 border border-warning-200 p-6 rounded-2xl">
                <div className="w-8 h-8 bg-warning-500 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-warning-700 mb-2">Warning</h4>
                <p className="text-warning-600 text-sm">Used for cautions and important notices</p>
                <code className="text-xs bg-warning-100 px-2 py-1 rounded mt-2 inline-block">bg-warning-500</code>
              </div>
              <div className="bg-error-50 border border-error-200 p-6 rounded-2xl">
                <div className="w-8 h-8 bg-error-500 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-error-700 mb-2">Error</h4>
                <p className="text-error-600 text-sm">Used for errors and destructive actions</p>
                <code className="text-xs bg-error-100 px-2 py-1 rounded mt-2 inline-block">bg-error-500</code>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Typography Scale</h2>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
            {typographyScales.map((type) => (
              <div key={type.name} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-neutral-200 last:border-b-0">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <code className="text-sm bg-neutral-100 px-3 py-1 rounded font-mono text-primary-600">
                    {type.name}
                  </code>
                  <span className="text-sm text-text-muted">{type.size}</span>
                </div>
                <div className={`${type.name} text-text-primary font-medium`}>
                  {type.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Spacing Scale</h2>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spacingScale.map((space) => (
                <div key={space.name} className="text-center">
                  <div className="bg-primary-100 rounded-lg mb-3 flex items-center justify-center">
                    <div 
                      className="bg-primary-500 rounded"
                      style={{ 
                        width: space.size, 
                        height: space.size,
                        minWidth: '16px',
                        minHeight: '16px'
                      }}
                    ></div>
                  </div>
                  <code className="text-sm font-mono text-primary-600 block">{space.name}</code>
                  <span className="text-xs text-text-muted">{space.size}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shadows Section */}
        <section id="shadows" className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Shadow Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shadowStyles.map((shadow) => (
              <div key={shadow.name} className="text-center">
                <div className={`bg-white p-8 rounded-2xl mb-4 ${shadow.class}`}>
                  <div className="w-16 h-16 bg-primary-500 rounded-xl mx-auto"></div>
                </div>
                <code className="text-sm font-mono text-primary-600">{shadow.name}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Component Examples</h2>
          
          {/* Buttons */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-text-secondary mb-6">Buttons</h3>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-soft hover:shadow-glow transition-all duration-200">
                  Primary Button
                </button>
                <button className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-xl shadow-soft hover:shadow-glow-secondary transition-all duration-200">
                  Secondary Button
                </button>
                <button className="px-6 py-3 bg-white hover:bg-neutral-50 text-text-primary font-semibold rounded-xl border border-neutral-200 shadow-soft hover:shadow-medium transition-all duration-200">
                  Outline Button
                </button>
                <button className="px-6 py-3 text-primary-600 hover:text-primary-700 font-semibold hover:bg-primary-50 rounded-xl transition-all duration-200">
                  Text Button
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-text-secondary mb-6">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-200">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary-500 rounded"></div>
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Basic Card</h4>
                <p className="text-text-muted text-sm">Simple card with icon, title, and description.</p>
              </div>
              
              <div className="bg-gradient-primary p-6 rounded-2xl text-white shadow-medium">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
                <h4 className="text-lg font-semibold mb-2">Gradient Card</h4>
                <p className="text-primary-100 text-sm">Card with gradient background and white text.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-neutral-200 hover:border-primary-300 transition-all duration-200">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-secondary-500 rounded"></div>
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">Border Card</h4>
                <p className="text-text-muted text-sm">Card with subtle border and hover effects.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Section */}
        <section id="layout" className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Layout Examples</h2>
          
          {/* Grid System */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-text-secondary mb-6">Responsive Grid</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-primary-100 text-primary-700 p-4 rounded-xl text-center font-medium">
                    Col {item}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-secondary-100 text-secondary-700 p-6 rounded-xl text-center font-medium">
                    Column {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Container Sizes */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-text-secondary mb-6">Container Sizes</h3>
            <div className="space-y-4">
              <div className="bg-neutral-100 p-4 rounded-xl">
                <code className="text-sm font-mono text-primary-600">container mx-auto</code>
                <p className="text-text-muted text-sm mt-1">Responsive container with auto margins</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-xl max-w-sm">
                <code className="text-sm font-mono text-primary-600">max-w-sm</code>
                <p className="text-text-muted text-sm mt-1">Small max width (384px)</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-xl max-w-md">
                <code className="text-sm font-mono text-primary-600">max-w-md</code>
                <p className="text-text-muted text-sm mt-1">Medium max width (448px)</p>
              </div>
              <div className="bg-neutral-100 p-4 rounded-xl max-w-lg">
                <code className="text-sm font-mono text-primary-600">max-w-lg</code>
                <p className="text-text-muted text-sm mt-1">Large max width (512px)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Examples */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Responsive Design</h2>
          
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft mb-8">
            <h3 className="text-xl font-semibold text-text-secondary mb-6">Breakpoint Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="pb-3 font-semibold text-text-primary">Breakpoint</th>
                    <th className="pb-3 font-semibold text-text-primary">Min Width</th>
                    <th className="pb-3 font-semibold text-text-primary">Device</th>
                    <th className="pb-3 font-semibold text-text-primary">Example Usage</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3"><code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">xs</code></td>
                    <td className="py-3">475px</td>
                    <td className="py-3">Large phones</td>
                    <td className="py-3"><code className="text-xs">xs:text-sm</code></td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3"><code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">sm</code></td>
                    <td className="py-3">640px</td>
                    <td className="py-3">Tablets</td>
                    <td className="py-3"><code className="text-xs">sm:grid-cols-2</code></td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3"><code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">md</code></td>
                    <td className="py-3">768px</td>
                    <td className="py-3">Small laptops</td>
                    <td className="py-3"><code className="text-xs">md:text-lg</code></td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3"><code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">lg</code></td>
                    <td className="py-3">1024px</td>
                    <td className="py-3">Laptops</td>
                    <td className="py-3"><code className="text-xs">lg:grid-cols-3</code></td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3"><code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">xl</code></td>
                    <td className="py-3">1280px</td>
                    <td className="py-3">Desktops</td>
                    <td className="py-3"><code className="text-xs">xl:text-2xl</code></td>
                  </tr>
                  <tr>
                    <td className="py-3"><code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">2xl</code></td>
                    <td className="py-3">1536px</td>
                    <td className="py-3">Large screens</td>
                    <td className="py-3"><code className="text-xs">2xl:grid-cols-4</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Responsive Example */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
            <h3 className="text-xl font-semibold text-text-secondary mb-6">Live Responsive Example</h3>
            <div className="bg-background-secondary p-6 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="bg-primary-500 text-white p-4 rounded-lg text-center font-medium">
                    Item {item}
                  </div>
                ))}
              </div>
              <p className="text-text-muted text-sm mt-4">
                <span className="block sm:hidden">📱 Mobile: 1 column</span>
                <span className="hidden sm:block lg:hidden">📱 Tablet: 2 columns</span>
                <span className="hidden lg:block xl:hidden">💻 Laptop: 3 columns</span>
                <span className="hidden xl:block">🖥️ Desktop: 4 columns</span>
              </p>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Usage Examples</h2>
          
          <div className="space-y-8">
            {/* Button Example */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Primary Button</h3>
              <div className="mb-4">
                <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-soft hover:shadow-glow transition-all duration-200 transform hover:-translate-y-0.5">
                  Click Me
                </button>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <code className="text-sm text-neutral-700">
                  {`<button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-soft hover:shadow-glow transition-all duration-200 transform hover:-translate-y-0.5">
  Click Me
</button>`}
                </code>
              </div>
            </div>

            {/* Card Example */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Feature Card</h3>
              <div className="mb-4 max-w-sm">
                <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-primary-500 rounded"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-2">Feature Title</h4>
                  <p className="text-text-muted text-sm">Description of the feature with supporting details.</p>
                </div>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-neutral-700 whitespace-pre">
                  {`<div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100">
  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
    <div className="w-6 h-6 bg-primary-500 rounded"></div>
  </div>
  <h4 className="text-lg font-semibold text-text-primary mb-2">Feature Title</h4>
  <p className="text-text-muted text-sm">Description of the feature...</p>
</div>`}
                </code>
              </div>
            </div>

            {/* Responsive Layout Example */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Responsive Layout</h3>
              <div className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-secondary-100 text-secondary-700 p-4 rounded-lg text-center font-medium">
                      Column {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-neutral-700">
                  {`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content automatically adjusts from 1 -> 2 -> 3 columns */}
</div>`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-text-primary mb-8">Best Practices</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-success-50 border border-success-200 p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg font-semibold text-success-700 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                Do&#39;s
              </h3>
              <ul className="space-y-3 text-success-700">
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">•</span>
                  Use consistent spacing (4px grid system)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">•</span>
                  Follow mobile-first responsive design
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">•</span>
                  Maintain proper color contrast ratios
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">•</span>
                  Use semantic color meanings consistently
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">•</span>
                  Keep animations subtle and purposeful
                </li>
              </ul>
            </div>

            <div className="bg-error-50 border border-error-200 p-6 md:p-8 rounded-2xl">
              <h3 className="text-lg font-semibold text-error-700 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-error-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✗</span>
                </div>
                Don&#39;ts
              </h3>
              <ul className="space-y-3 text-error-700">
                <li className="flex items-start gap-2">
                  <span className="text-error-500 mt-1">•</span>
                  Don&#39;t mix different spacing systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error-500 mt-1">•</span>
                  Avoid too many bright colors together
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error-500 mt-1">•</span>
                  Don&#39;t ignore accessibility guidelines
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error-500 mt-1">•</span>
                  Avoid excessive animations or transitions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error-500 mt-1">•</span>
                  Don&#39;t use colors without semantic meaning
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-4">Design System Guide</h3>
          <p className="text-neutral-400 mb-4">
            Built with Tailwind CSS and modern design principles
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-400">
            <span>Mobile-First</span>
            <span>•</span>
            <span>Accessible</span>
            <span>•</span>
            <span>Consistent</span>
            <span>•</span>
            <span>Scalable</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default StylingGuidePage