// Mock data for chats
export async function getChatsData() {
  return [
    {
      id: 1,
      name: "John Doe",
      message: "Hello, how are you?",
      time: "2024-03-20T10:00:00Z",
      avatar: "/images/user-01.png",
      status: "online"
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Can we meet tomorrow?",
      time: "2024-03-20T09:30:00Z",
      avatar: "/images/user-02.png",
      status: "offline"
    },
    // Add more mock data as needed
  ];
}

// Mock data for overview
export async function getOverviewData() {
  return {
    views: {
      value: 15000,
      change: 12.5,
      trend: "up"
    },
    profit: {
      value: 45000,
      change: 8.2,
      trend: "up"
    },
    products: {
      value: 1200,
      change: -2.1,
      trend: "down"
    },
    users: {
      value: 850,
      change: 5.7,
      trend: "up"
    }
  };
} 