import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, Send, Download, Copy, ExternalLink, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [walletAddress] = useState('0x742d35Cc6634C0532925a3b8D8C0532925a3b8D8');
  const [transactions, setTransactions] = useState([]);
  const [showSend, setShowSend] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
    setBalance(stats.totalTokens || 0);
    
    // Mock transaction history
    setTransactions([
      { id: 1, type: 'earned', amount: 12, from: 'Solar Charger Scan', date: '2024-01-15', hash: '0xabc123...' },
      { id: 2, type: 'earned', amount: 8, from: 'Organic Cotton Bag Scan', date: '2024-01-14', hash: '0xdef456...' },
      { id: 3, type: 'sent', amount: 5, to: '0x123...abc', date: '2024-01-13', hash: '0xghi789...' },
      { id: 4, type: 'earned', amount: 5, from: 'Bamboo Toothbrush Scan', date: '2024-01-12', hash: '0xjkl012...' }
    ]);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const handleSend = () => {
    if (sendAmount && sendAddress && parseFloat(sendAmount) <= balance) {
      const newTransaction = {
        id: Date.now(),
        type: 'sent',
        amount: parseFloat(sendAmount),
        to: sendAddress,
        date: new Date().toISOString().split('T')[0],
        hash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
      };
      
      setTransactions([newTransaction, ...transactions]);
      setBalance(balance - parseFloat(sendAmount));
      
      // Update localStorage
      const stats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
      stats.totalTokens = balance - parseFloat(sendAmount);
      localStorage.setItem('ecoStats', JSON.stringify(stats));
      
      setSendAmount('');
      setSendAddress('');
      setShowSend(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wallet</h1>
        <p className="text-gray-600">Manage your EcoTokens and view transaction history</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <WalletIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-green-100">EcoToken Balance</p>
                  <p className="text-3xl font-bold">{balance.toFixed(2)} ECO</p>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-green-100 text-sm mb-2">Wallet Address</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm">{walletAddress.slice(0, 20)}...</p>
                <button
                  onClick={copyAddress}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowSend(true)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Download className="w-4 h-4 mr-2" />
                Receive
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {tx.type === 'earned' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <Send className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {tx.type === 'earned' ? 'Earned from' : 'Sent to'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {tx.type === 'earned' ? tx.from : tx.to}
                      </p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      tx.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'earned' ? '+' : '-'}{tx.amount} ECO
                    </p>
                    <button className="text-xs text-blue-600 hover:underline flex items-center">
                      {tx.hash}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price</span>
                <span className="font-semibold">$0.25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24h Change</span>
                <span className="text-green-600 font-semibold">+5.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Supply</span>
                <span className="font-semibold">1,000,000 ECO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Holdings</span>
                <span className="font-semibold">${(balance * 0.25).toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                View on Explorer
              </Button>
              <Button variant="outline" className="w-full">
                Export Transactions
              </Button>
              <Button variant="outline" className="w-full">
                Connect Hardware Wallet
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {showSend && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <Card className="max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Send EcoTokens</h3>
              <button
                onClick={() => setShowSend(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (ECO)
                </label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  max={balance}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available: {balance} ECO
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => setShowSend(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={!sendAmount || !sendAddress || parseFloat(sendAmount) > balance}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Wallet;