'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Monitor, 
  Tablet,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle
} from 'lucide-react'

const StyleGuide = () => {
  const colorPalettes = [
    {
      name: 'Brand (Purple-Blue)',
      description: 'Primary brand colors for main actions and branding',
      colors: [
        { name: 'brand-50', value: '#f0f4ff', class: 'bg-brand-50' },
        { name: 'brand-100', value: '#e0e7ff', class: 'bg-brand-100' },
        { name: 'brand-200', value: '#c7d2fe', class: 'bg-brand-200' },
        { name: 'brand-300', value: '#a5b4fc', class: 'bg-brand-300' },
        { name: 'brand-400', value: '#818cf8', class: 'bg-brand-400' },
        { name: 'brand-500', value: '#6366f1', class: 'bg-brand-500' },
        { name: 'brand-600', value: '#4f46e5', class: 'bg-brand-600' },
        { name: 'brand-700', value: '#4338ca', class: 'bg-brand-700' },
        { name: 'brand-800', value: '#3730a3', class: 'bg-brand-800' },
        { name: 'brand-900', value: '#312e81', class: 'bg-brand-900' },
      ]
    },
    {
      name: 'Accent (Orange)',
      description: 'Secondary accent colors for highlights and CTAs',
      colors: [
        { name: 'accent-50', value: '#fff7ed', class: 'bg-accent-50' },
        { name: 'accent-100', value: '#ffedd5', class: 'bg-accent-100' },
        { name: 'accent-200', value: '#fed7aa', class: 'bg-accent-200' },
        { name: 'accent-300', value: '#fdba74', class: 'bg-accent-300' },
        { name: 'accent-400', value: '#fb923c', class: 'bg-accent-400' },
        { name: 'accent-500', value: '#f97316', class: 'bg-accent-500' },
        { name: 'accent-600', value: '#ea580c', class: 'bg-accent-600' },
        { name: 'accent-700', value: '#c2410c', class: 'bg-accent-700' },
        { name: 'accent-800', value: '#9a3412', class: 'bg-accent-800' },
        { name: 'accent-900', value: '#7c2d12', class: 'bg-accent-900' },
      ]
    }
  ]

  const typographyScale = [
    { name: 'Display XL', class: 'text-display-xl', size: '72px / 80px', usage: 'Hero headings' },
    { name: 'Display LG', class: 'text-display-lg', size: '56px / 64px', usage: 'Page headings' },
    { name: 'Display MD', class: 'text-display-md', size: '46px / 52px', usage: 'Section headings' },
    { name: 'Display SM', class: 'text-display-sm', size: '36px / 40px', usage: 'Card headings' },
    { name: '3XL', class: 'text-3xl', size: '30px / 36px', usage: 'Subheadings' },
    { name: '2XL', class: 'text-2xl', size: '24px / 32px', usage: 'Large text' },
    { name: 'XL', class: 'text-xl', size: '20px / 28px', usage: 'Emphasized text' },
    { name: 'LG', class: 'text-lg', size: '18px / 28px', usage: 'Lead paragraphs' },
    { name: 'Base', class: 'text-base', size: '16px / 24px', usage: 'Body text' },
    { name: 'SM', class: 'text-sm', size: '14px / 20px', usage: 'Small text' },
    { name: 'XS', class: 'text-xs', size: '12px / 16px', usage: 'Captions' },
  ]

  const breakpoints = [
    { name: 'xs', size: '475px', icon: Smartphone, usage: 'Small phones' },
    { name: 'sm', size: '640px', icon: Smartphone, usage: 'Large phones' },
    { name: 'md', size: '768px', icon: Tablet, usage: 'Tablets' },
    { name: 'lg', size: '1024px', icon: Monitor, usage: 'Small laptops' },
    { name: 'xl', size: '1280px', icon: Monitor, usage: 'Laptops' },
    { name: '2xl', size: '1536px', icon: Monitor, usage: 'Desktops' },
    { name: '3xl', size: '1920px', icon: Monitor, usage: 'Large screens' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-accent-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display-xl font-bold bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent mb-4">
            Design System Style Guide
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A comprehensive guide to our professional color palette, typography, and component system using vibrant yet professional colors.
          </p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="responsive" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Responsive
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Examples
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            {colorPalettes.map((palette) => (
              <Card key={palette.name}>
                <CardHeader>
                  <CardTitle className="text-2xl">{palette.name}</CardTitle>
                  <CardDescription>{palette.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                    {palette.colors.map((color) => (
                      <div key={color.name} className="space-y-2">
                        <div
                          className={`${color.class} h-16 rounded-lg border shadow-sm cursor-pointer transition-transform hover:scale-105`}
                          title={`${color.name}: ${color.value}`}
                        />
                        <div className="text-center">
                          <p className="text-xs font-medium">{color.name}</p>
                          <p className="text-xs text-neutral-500">{color.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Typography Scale</CardTitle>
                <CardDescription>Professional typography system with responsive scaling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {typographyScale.map((type) => (
                    <div key={type.name} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                      <div className="md:w-1/3">
                        <Badge variant="outline">{type.name}</Badge>
                        <p className="text-sm text-neutral-500 mt-1">{type.size}</p>
                        <p className="text-xs text-neutral-400">{type.usage}</p>
                      </div>
                      <div className="md:w-2/3">
                        <p className={`${type.class} text-neutral-900`}>
                          The quick brown fox jumps over the lazy dog
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <div className="grid gap-8">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Various button styles and variants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                    <Button disabled>Disabled Button</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>Input fields and form controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 max-w-md">
                    <Input placeholder="Email address" />
                    <Textarea placeholder="Your message..." />
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" />
                      <label htmlFor="notifications" className="text-sm">Enable notifications</label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Status and notification components</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>This is an informational alert message.</AlertDescription>
                    </Alert>
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">Success</AlertTitle>
                      <AlertDescription className="text-green-700">Operation completed successfully.</AlertDescription>
                    </Alert>
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle className="text-yellow-800">Warning</AlertTitle>
                      <AlertDescription className="text-yellow-700">Please review your input before proceeding.</AlertDescription>
                    </Alert>
                    <Alert className="border-red-200 bg-red-50">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <AlertTitle className="text-red-800">Error</AlertTitle>
                      <AlertDescription className="text-red-700">An error occurred while processing your request.</AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Responsive Tab */}
          <TabsContent value="responsive" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Breakpoints</CardTitle>
                <CardDescription>Responsive design breakpoints for different screen sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {breakpoints.map((bp) => {
                    const IconComponent = bp.icon
                    return (
                      <div key={bp.name} className="flex items-center gap-4 p-4 border rounded-lg">
                        <IconComponent className="w-6 h-6 text-brand-600" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{bp.name}</Badge>
                            <span className="font-mono text-sm">{bp.size}+</span>
                          </div>
                          <p className="text-sm text-neutral-600 mt-1">{bp.usage}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>Consistent spacing system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32].map((space) => (
                    <div key={space} className="flex items-center gap-4">
                      <Badge variant="outline" className="w-12">{space}</Badge>
                      <div className={`bg-brand-200 h-4`} style={{ width: `${space * 4}px` }} />
                      <span className="text-sm text-neutral-600">{space * 4}px</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Example Card 1 */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-brand-500 to-brand-600"></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">
                    Professional Card Design
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    This card demonstrates the use of our vibrant brand colors while maintaining a professional appearance.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-brand-500 hover:bg-brand-600">
                      Learn More
                    </Button>
                    <Button size="sm" variant="outline" className="border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white">
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Example Card 2 */}
              <Card className="overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-accent-500 to-accent-600"></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-accent-900 mb-2">
                    Accent Color Showcase
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Orange accent colors create warmth and energy while remaining business-appropriate.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-accent-500 hover:bg-accent-600">
                      Get Started
                    </Button>
                    <Button size="sm" variant="outline" className="border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Guidelines</CardTitle>
                <CardDescription>Best practices for implementing our design system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Do&apos;s
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        Use brand colors for primary actions and navigation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        Apply accent colors for CTAs and highlights
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        Maintain consistent spacing using our scale
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        Use responsive typography for better readability
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        Test designs across all breakpoints
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Don&apos;ts
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        Don&apos;t use colors outside the defined palette
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        Avoid using too many bright colors together
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        Don&apos;t compromise accessibility for aesthetics
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        Avoid inconsistent spacing patterns
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                        Don&apos;t ignore mobile-first design principles
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Common patterns and component usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Primary Button with Brand Colors</h4>
                    <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm">
                      {`<Button className="bg-brand-500 hover:bg-brand-600 text-white">`}<br/>
                      {`  Get Started`}<br/>
                      {`</Button>`}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Accent Color Card</h4>
                    <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm">
                      {`<Card className="border-accent-200 bg-accent-50">`}<br/>
                      {`  <CardHeader>`}<br/>
                      {`    <CardTitle className="text-accent-900">Title</CardTitle>`}<br/>
                      {`  </CardHeader>`}<br/>
                      {`</Card>`}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Responsive Typography</h4>
                    <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm">
                      {`<h1 className="text-display-lg md:text-display-xl">`}<br/>
                      {`  Responsive Heading`}<br/>
                      {`</h1>`}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Gradient Background</h4>
                    <div className="bg-neutral-100 p-4 rounded-lg font-mono text-sm">
                      {`<div className="bg-gradient-to-r from-brand-500 to-accent-500">`}<br/>
                      {`  Hero Section`}<br/>
                      {`</div>`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Separator className="my-12" />
        <div className="text-center text-sm text-neutral-600">
          <p>Design System v1.0 - Built with Next.js, Tailwind CSS, and Shadcn/UI</p>
          <p className="mt-1">Professional vibrant colors for modern applications</p>
        </div>
      </div>
    </div>
  )
}

export default StyleGuide