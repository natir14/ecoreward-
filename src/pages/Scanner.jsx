import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Scan, Camera, Award, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const fileInputRef = useRef(null);

  const ecoProducts = [
    { id: 'ECO001', name: 'Bamboo Toothbrush', tokens: 5, category: 'Personal Care' },
    { id: 'ECO002', name: 'Organic Cotton Bag', tokens: 8, category: 'Accessories' },
    { id: 'ECO003', name: 'Solar Charger', tokens: 12, category: 'Electronics' },
    { id: 'ECO004', name: 'Reusable Water Bottle', tokens: 6, category: 'Lifestyle' },
    { id: 'ECO005', name: 'Biodegradable Phone Case', tokens: 10, category: 'Electronics' }
  ];

  const handleScan = () => {
    setScanning(true);
    
    // Simulate QR scan with random product
    setTimeout(() => {
      const randomProduct = ecoProducts[Math.floor(Math.random() * ecoProducts.length)];
      setResult(randomProduct);
      setScanning(false);
      
      // Update stats in localStorage
      const stats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
      const updatedStats = {
        totalTokens: (stats.totalTokens || 0) + randomProduct.tokens,
        scansToday: (stats.scansToday || 0) + 1,
        totalScans: (stats.totalScans || 0) + 1,
        rank: stats.rank || 1250
      };
      localStorage.setItem('ecoStats', JSON.stringify(updatedStats));
      
      setShowReward(true);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleScan();
    }
  };

  const resetScanner = () => {
    setResult(null);
    setShowReward(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Scanner</h1>
        <p className="text-gray-600">Scan eco-friendly products to earn EcoTokens</p>
      </motion.div>

      <div className="max-w-md mx-auto">
        <Card className="text-center">
          {!scanning && !result && (
            <div className="py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ready to Scan</h2>
              <p className="text-gray-600 mb-6">Point your camera at a QR code on an eco-friendly product</p>
              
              <div className="space-y-3">
                <Button
                  onClick={handleScan}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera Scan
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full"
                >
                  Upload QR Image
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {scanning && (
            <div className="py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Scan className="w-12 h-12 text-blue-600" />
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Scanning...</h2>
              <p className="text-gray-600">Looking for QR code</p>
            </div>
          )}

          {result && !showReward && (
            <div className="py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Found!</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900">{result.name}</h3>
                <p className="text-sm text-gray-600">{result.category}</p>
                <p className="text-sm text-gray-600">ID: {result.id}</p>
              </div>
              <Button
                onClick={() => setShowReward(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Claim Reward
              </Button>
            </div>
          )}
        </Card>

        {showReward && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <Card className="max-w-sm w-full text-center relative">
              <button
                onClick={resetScanner}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Award className="w-10 h-10 text-green-600" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                <p className="text-gray-600 mb-4">You earned</p>
                
                <div className="text-4xl font-bold text-green-600 mb-4">
                  +{result.tokens} ECO
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                  For scanning {result.name}
                </p>
                
                <Button
                  onClick={resetScanner}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Scan Another Product
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Eligible Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ecoProducts.map((product) => (
            <Card key={product.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
              <div className="text-green-600 font-semibold">
                {product.tokens} ECO
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scanner;