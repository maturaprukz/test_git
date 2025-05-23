export type UserRole = "Admin" | "Editor" | "User";
export type UserStatus = "Active" | "Pending" | "Banned";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string; // YYYY-MM-DD
  avatarUrl?: string;
  lastLogin?: string; // ISO string
  // Add more fields as needed, e.g., for filtering or display
  department?: string;
  countryCode?: string; // e.g., 'US', 'TH'
}

const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateRandomPastDate = (daysAgoMax: number): string => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * daysAgoMax));
  return pastDate.toISOString();
}

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
  return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
}

export const mockUsers: MockUser[] = [
  { id: "USR001", name: "Alice Wonderland", email: "alice.wonder@example.com", role: "Admin", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Alice+Wonderland&background=random`, lastLogin: generateRandomPastDate(30), department: "Management", countryCode: "GB" },
  { id: "USR002", name: "Bob The Builder", email: "bob.builder@work.org", role: "Editor", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Bob+Builder&background=random`, lastLogin: generateRandomPastDate(30), department: "Engineering", countryCode: "US" },
  { id: "USR003", name: "สมชาย เข็มกลัด", email: "somchai.k@example.th", role: "User", status: "Pending", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=สมชาย+เข็มกลัด&background=random`, lastLogin: generateRandomPastDate(90), department: "Support", countryCode: "TH" },
  { id: "USR004", name: "Diana Prince", email: "diana.prince@justice.com", role: "Admin", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Diana+Prince&background=random`, lastLogin: generateRandomPastDate(10), department: "Management", countryCode: "US" },
  { id: "USR005", name: "Edward Scissorhands", email: "ed_scissor@goth.net", role: "User", status: "Banned", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Edward+Scissorhands&background=random`, lastLogin: generateRandomPastDate(200), department: "Creative", countryCode: "US" },
  { id: "USR006", name: "Fiona Gallagher", email: "fiona.g@southside.org", role: "Editor", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Fiona+Gallagher&background=random`, lastLogin: generateRandomPastDate(5), department: "Operations", countryCode: "US" },
  { id: "USR007", name: "George Jetson", email: "george.j@spacely.io", role: "User", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=George+Jetson&background=random`, lastLogin: generateRandomPastDate(15), department: "Engineering", countryCode: "US" },
  { id: "USR008", name: "ประยุทธ์ จันทร์โอชา", email: "prayuth.c@example.th", role: "Admin", status: "Pending", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=ประยุทธ์+จันทร์โอชา&background=random`, lastLogin: generateRandomPastDate(60), department: "Management", countryCode: "TH" },
  { id: "USR009", name: "Tony Stark", email: "tony.stark@avengers.com", role: "Admin", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Tony+Stark&background=random`, lastLogin: generateRandomPastDate(2), department: "RD", countryCode: "US" },
  { id: "USR010", name: "Jane Doe", email: "jane.doe@anonymous.com", role: "User", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Jane+Doe&background=random`, lastLogin: generateRandomPastDate(45), department: "Support", countryCode: "CA" },
  { id: "USR011", name: "Kenobi Obi-Wan", email: "ben.kenobi@jediorder.org", role: "Editor", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Kenobi+Obi+Wan&background=random`, lastLogin: generateRandomPastDate(8), department: "Security", countryCode: "N/A" },
  { id: "USR012", name: "อารยา เอ ฮาร์เก็ต", email: "araya.h@example.th", role: "User", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=อารยา+เอ+ฮาร์เก็ต&background=random`, lastLogin: generateRandomPastDate(22), department: "Marketing", countryCode: "TH" },
  { id: "USR013", name: "Peter Parker", email: "p.parker@dailybugle.com", role: "Editor", status: "Pending", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Peter+Parker&background=random`, lastLogin: generateRandomPastDate(120), department: "Media", countryCode: "US" },
  { id: "USR014", name: "Walter White", email: "w.white@heisenberg.com", role: "Admin", status: "Banned", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Walter+White&background=random`, lastLogin: generateRandomPastDate(300), department: "Chemistry", countryCode: "US" },
  { id: "USR015", name: "ทักษิณ ชินวัตร", email: "thaksin.s@example.th", role: "User", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=ทักษิณ+ชินวัตร&background=random`, lastLogin: generateRandomPastDate(3), department: "Business", countryCode: "TH" },
  { id: "USR016", name: "Sarah Connor", email: "sarah.c@resistance.org", role: "Editor", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Sarah+Connor&background=random`, lastLogin: generateRandomPastDate(7), department: "Security", countryCode: "US" },
  { id: "USR017", name: "John Wick", email: "john.wick@continental.com", role: "User", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=John+Wick&background=random`, lastLogin: generateRandomPastDate(1), department: "Operations", countryCode: "US" },
  { id: "USR018", name: "สุดารัตน์ เกยุราพันธุ์", email: "sudarat.k@example.th", role: "Admin", status: "Pending", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=สุดารัตน์+เกยุราพันธุ์&background=random`, lastLogin: generateRandomPastDate(80), department: "Management", countryCode: "TH" },
  { id: "USR019", name: "Bruce Wayne", email: "bruce.wayne@waynecorp.com", role: "Admin", status: "Active", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Bruce+Wayne&background=random`, lastLogin: generateRandomPastDate(4), department: "RD", countryCode: "US" },
  { id: "USR020", name: "Ellen Ripley", email: "ellen.ripley@weyland-yutani.com", role: "User", status: "Banned", joinedDate: generateRandomDate(new Date(2022, 0, 1), new Date()), avatarUrl: `https://ui-avatars.com/api/?name=Ellen+Ripley&background=random`, lastLogin: generateRandomPastDate(150), department: "Logistics", countryCode: "US" }
];

// Mock sales data for overview page
export interface MockSale {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number; // in USD
  productId: string;
  userId: string; // links to MockUser id
}

export const mockSales: MockSale[] = Array.from({ length: 100 }, (_, i) => {
  const userIndex = i % mockUsers.length;
  return {
    id: `SALE${String(i + 1).padStart(3, '0')}`,
    date: generateRandomDate(new Date(2023, 0, 1), new Date()), // Sales in 2023 and 2024
    amount: parseFloat((Math.random() * 200 + 10).toFixed(2)), // Sales between $10 and $210
    productId: `PROD${String(Math.floor(Math.random() * 20) + 1).padStart(3, '0')}`,
    userId: mockUsers[userIndex].id,
  };
});

// Mock data for sales trends chart (last 7 days)
export interface DailySales {
  date: string; // "YYYY-MM-DD" or "Mon", "Tue" etc.
  totalSales: number;
}

export const mockDailySalesLast7Days: DailySales[] = (() => {
  const sales: DailySales[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // Simulate some sales data for this date
    const dailyTotal = mockSales
      .filter(sale => sale.date === date.toISOString().split('T')[0])
      .reduce((sum, sale) => sum + sale.amount, 0);
    
    sales.push({
      // date: date.toLocaleDateString('en-US', { weekday: 'short' }), // e.g., "Mon"
      date: date.toISOString().split('T')[0], // Keep as YYYY-MM-DD for potential parsing
      totalSales: parseFloat((dailyTotal > 0 ? dailyTotal : Math.random() * 1500 + 200).toFixed(2)), // if no actual sales, generate random
    });
  }
  return sales;
})();

// Helper to get initials if no avatarUrl
export { getInitials };
