import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Scan, Coins, TrendingUp, Award, Users } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTokens: 0,
    scansToday: 0,
    totalScans: 0,
    rank: 0
  });

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
    setStats({
      totalTokens: savedStats.totalTokens || 0,
      scansToday: savedStats.scansToday || 0,
      totalScans: savedStats.totalScans || 0,
      rank: savedStats.rank || 1250
    });
  }, []);

  const achievements = [
    { id: 1, title: 'First Scan', desc: 'Scanned your first eco product', earned: stats.totalScans > 0 },
    { id: 2, title: 'Green Warrior', desc: 'Earned 100 EcoTokens', earned: stats.totalTokens >= 100 },
    { id: 3, title: 'Daily Hero', desc: 'Scan 5 products in one day', earned: stats.scansToday >= 5 },
    { id: 4, title: 'Eco Champion', desc: 'Complete 50 total scans', earned: stats.totalScans >= 50 }
  ];

  const recentActivity = [
    { id: 1, product: 'Bamboo Toothbrush', tokens: 5, time: '2 hours ago' },
    { id: 2, product: 'Organic Cotton Bag', tokens: 8, time: '1 day ago' },
    { id: 3, product: 'Solar Charger', tokens: 12, time: '2 days ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Keep scanning eco-friendly products to earn more tokens</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Tokens</p>
              <p className="text-2xl font-bold">{stats.totalTokens}</p>
            </div>
            <Coins className="w-8 h-8 text-green-200" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Scans Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scansToday}</p>
            </div>
            <Scan className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Scans</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalScans}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Global Rank</p>
              <p className="text-2xl font-bold text-gray-900">#{stats.rank}</p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/scanner')}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Scan className="w-4 h-4 mr-2" />
              Scan Product
            </Button>
            <Button
              onClick={() => navigate('/wallet')}
              variant="outline"
              className="w-full"
            >
              <Coins className="w-4 h-4 mr-2" />
              View Wallet
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.product}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <div className="text-green-600 font-semibold">+{activity.tokens} ECO</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center p-4 rounded-lg border-2 ${
                achievement.earned
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <Award
                className={`w-8 h-8 mr-3 ${
                  achievement.earned ? 'text-green-600' : 'text-gray-400'
                }`}
              />
              <div>
                <p className={`font-medium ${
                  achievement.earned ? 'text-green-900' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </p>
                <p className="text-sm text-gray-600">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;