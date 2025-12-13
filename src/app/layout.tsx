import './styles/globals.css';
import ReactQueryProvider from '../../components/ReactQueryProvider';
import { CartProvider } from '../../lib/cart';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FacebookPixel from '../../components/FacebookPixel';
import Script from 'next/script';
import AnnouncementBar from '../../components/anouncement';
import { Suspense } from 'react';
import Whatsapp from '../../components/Whatsapp';
import Loading from './loading'; // Import the loading component created above

export const metadata = {
  title: 'Vyadhihar Foods - Premium Dry Fruits & Natural Snacks',
  description: 'Discover premium quality dry fruits, makhana snacks, and mixed fresh fruits. 100% natural, lab-tested, and delivered fresh. Trusted by 10,000+ customers across India.',
  keywords: 'dry fruits online, premium almonds, cashews, walnuts, makhana snacks, dried fruits, natural snacks, healthy food, dry fruit delivery, corporate gifting',
  openGraph: {
    title: 'Vyadhihar Foods - Premium Quality Dry Fruits',
    description: '100% Natural, Lab-Tested Dry Fruits & Healthy Snacks. Fast delivery across India.',
    url: 'https://vyadhiharfoods.com',
    siteName: 'Vyadhihar Foods',
    images: [
      {
        url: '/logo.PNG',
        width: 1200,
        height: 630,
        alt: 'Vyadhihar Foods - Premium Dry Fruits',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vyadhihar Foods - Premium Dry Fruits & Snacks',
    description: '100% Natural, Lab-Tested Products. Nationwide Delivery.',
    images: ['/logo.PNG'],
    creator: '@vyadhiharfoods',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://vyadhiharfoods.com',
  },
  category: 'Food & Beverages',
  classification: 'Health & Wellness',
  authors: [{ name: 'Vyadhihar Foods Team' }],
  creator: 'Vyadhihar Foods',
  publisher: 'Vyadhihar Foods',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fbPixelId = 'YOUR_FB_PIXEL_ID'; // Replace with actual Vyadhihar FB Pixel ID
  const gtagId = 'YOUR_GTAG_ID'; // Replace with actual Vyadhihar Google Ads ID


  return (
    <html lang="en">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6B8E23" />
        <meta name="msapplication-TileColor" content="#6B8E23" />
        
        {/* Preload Critical Assets */}
        <link rel="preload" href="/logo.PNG" as="image" type="image/png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="target" content="all" />
        <meta name="audience" content="Health Conscious Consumers" />
        <meta name="coverage" content="India" />
        
        {/* Structured Data for Food/Ecommerce Brand */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vyadhihar Foods",
              "description": "Premium quality dry fruits, makhana snacks, and mixed fresh fruits. 100% natural, lab-tested products.",
              "url": "https://vyadhiharfoods.com",
              "logo": "https://vyadhiharfoods.com/logo.PNG",
              "foundingDate": "2020",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Vyadhihar Foods Founder"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Health Street",
                "addressLocality": "Organic Market",
                "addressRegion": "New Delhi",
                "postalCode": "110001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-98765-43210",
                "contactType": "customer service",
                "email": "care@vyadhiharfoods.com"
              },
              "sameAs": [
                "https://www.facebook.com/vyadhiharfoods",
                "https://www.instagram.com/vyadhiharfoods",
                "https://www.youtube.com/@vyadhiharfoods",
                "https://wa.me/919876543210"
              ],
              "brand": {
                "@type": "Brand",
                "name": "Vyadhihar Foods",
                "description": "Premium Quality Dry Fruits"
              },
              "potentialAction": {
                "@type": "BuyAction",
                "target": "https://vyadhiharfoods.com/shop"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1000",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />


        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Premium Dry Fruits & Makhana Snacks",
              "brand": {
                "@type": "Brand",
                "name": "Vyadhihar Foods"
              },
              "description": "100% Natural, Lab-Tested Dry Fruits and Healthy Snacks",
              "category": "Food & Beverages",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "299",
                "highPrice": "2999",
                "offerCount": "50+",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1000"
              }
            })
          }}
        />


        {/* Facebook Pixel Script */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
            
            // Track food/ecommerce specific events
            fbq('trackCustom', 'ViewFoodBrand', {
              brand: 'Vyadhihar Foods',
              category: 'Premium Dry Fruits',
              product_type: 'Natural Snacks'
            });
          `}
        </Script>


        {/* Google Analytics */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}', {
              page_title: 'Vyadhihar Foods',
              page_location: window.location.href,
              content_group1: 'Premium Dry Fruits',
              content_group2: 'Health & Wellness',
              custom_map: {
                'dimension1': 'food_ecommerce',
                'dimension2': 'dry_fruits_category'
              }
            });
            
            // Enhanced ecommerce tracking
            gtag('config', '${gtagId}', {
              'custom_map': {'custom_parameter': 'dimension1'},
              'enhanced_ecommerce': true
            });
          `}
        </Script>


        {/* Google Tag Manager (Optional) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>


        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
            alt="facebook pixel"
          />
        </noscript>
      </head>
      <body className="overflow-x-hidden overflow-y-scroll antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>


        <ReactQueryProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <AnnouncementBar />
              <Header />
              
              <main role="main" className="flex-grow">
                {/* 
                  Wrapping children in Suspense ensures that when navigating,
                  only this main area shows the fallback Loading component.
                  Header and Footer remain visible.
                */}
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </main>

              <Footer />
            </div>
            <Whatsapp/>
            
            {/* Facebook Pixel Route Tracking */}
            <Suspense fallback={null}>
              <FacebookPixel pixelId={1648859765778662} />
            </Suspense>
          </CartProvider>
        </ReactQueryProvider>


        {/* Customer Chat Plugin (Optional) */}
        <Script id="facebook-chat" strategy="lazyOnload">
          {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "YOUR_PAGE_ID");
            chatbox.setAttribute("attribution", "biz_inbox");
            
            window.fbAsyncInit = function() {
              FB.init({
                xfbml: true,
                version: 'v18.0'
              });
            };
            
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
        
        {/* Facebook Customer Chat */}
        <div id="fb-customer-chat" className="fb-customerchat"></div>
      </body>
    </html>
  );
}
