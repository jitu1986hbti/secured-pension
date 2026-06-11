import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PensionState, Transaction, ActivityLog } from '../types';

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Monthly Contribution',
    amount: 1240.00,
    type: 'contribution',
    category: 'Personal Contribution',
    status: 'Pending',
    date: 'Today',
    period: 'Today',
  },
  {
    id: 'tx-2',
    title: 'Employer Match',
    amount: 620.00,
    type: 'match',
    category: 'TechCorp Inc.',
    status: 'Completed',
    date: 'Today',
    period: 'Today',
  },
  {
    id: 'tx-3',
    title: 'Management Fee',
    amount: -12.50,
    type: 'fee',
    category: 'Quarterly Admin',
    status: 'Completed',
    date: 'Oct 3, 2023',
    period: 'October 2023',
  },
  {
    id: 'tx-4',
    title: 'Monthly Contribution',
    amount: 1240.00,
    type: 'contribution',
    category: 'Personal Contribution',
    status: 'Completed',
    date: 'Oct 1, 2023',
    period: 'October 2023',
  },
  {
    id: 'tx-5',
    title: 'Monthly Contribution',
    amount: 1240.00,
    type: 'contribution',
    category: 'Personal Contribution',
    status: 'Completed',
    date: 'Sep 1, 2023',
    period: 'September 2023',
  }
];

const initialActivities: ActivityLog[] = [
  {
    id: 'act-1',
    title: 'Monthly Contribution Received',
    description: 'Regular employer contribution processed',
    type: 'contribution',
    amount: 450.00,
    dateStr: 'Oct 28',
    period: 'October 2023',
  },
  {
    id: 'act-2',
    title: 'Tax Relief Applied',
    description: 'HMRC Basic rate relief credit',
    type: 'tax_relief',
    amount: 112.50,
    dateStr: 'Oct 24',
    period: 'October 2023',
  },
  {
    id: 'act-3',
    title: 'Plan Change: Risk Profile Updated',
    description: 'Shifted from Balanced to Growth strategy',
    type: 'plan_change',
    statusText: 'Updated',
    dateStr: 'Sep 15',
    period: 'September 2023',
  },
  {
    id: 'act-4',
    title: 'Monthly Contribution Received',
    description: 'Regular employer contribution processed',
    type: 'contribution',
    amount: 450.00,
    dateStr: 'Sep 28',
    period: 'September 2023',
  }
];

const initialGrowthData1Y = [
  { name: 'Sep 2023', value: 112000 },
  { name: 'Nov 2023', value: 118000 },
  { name: 'Jan 2024', value: 125000 },
  { name: 'Mar 2024', value: 131000 },
  { name: 'May 2024', value: 136000 },
  { name: 'Jul 2024', value: 139500 },
  { name: 'Aug 2024', value: 142580 },
];

const initialGrowthDataAll = [
  { name: '2018', value: 45000 },
  { name: '2019', value: 62000 },
  { name: '2020', value: 78000 },
  { name: '2021', value: 95000 },
  { name: '2022', value: 112000 },
  { name: '2023', value: 128000 },
  { name: '2024', value: 142580 },
];

const initialState: PensionState = {
  totalValue: 142580.42,
  yoyGrowth: 12.4,
  earnedThisMonth: 4210.00,
  transactions: initialTransactions,
  activities: initialActivities,
  growthData1Y: initialGrowthData1Y,
  growthDataAll: initialGrowthDataAll,
};

const pensionSlice = createSlice({
  name: 'pension',
  initialState,
  reducers: {
    addContribution: (state, action: PayloadAction<number>) => {
      const amount = action.payload;
      state.totalValue += amount;
      state.earnedThisMonth += amount * 0.05; // Mock slightly higher earnings

      // Add to transactions ledger
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        title: 'Top Up Contribution',
        amount: amount,
        type: 'contribution',
        category: 'Personal Top-Up',
        status: 'Completed',
        date: 'Today',
        period: 'Today'
      };
      
      const newAct: ActivityLog = {
        id: `act-${Date.now()}`,
        title: 'Top Up Contribution Received',
        description: 'Manual deposit successfully invested',
        type: 'contribution',
        amount: amount,
        dateStr: 'Today',
        period: 'Today'
      };

      state.transactions.unshift(newTx);
      state.activities.unshift(newAct);

      // Adjust growth chart lines dynamically to point higher
      state.growthData1Y = state.growthData1Y.map((item, idx) => {
        if (idx === state.growthData1Y.length - 1) {
          return { ...item, value: item.value + amount };
        }
        return item;
      });
      state.growthDataAll = state.growthDataAll.map((item, idx) => {
        if (idx === state.growthDataAll.length - 1) {
          return { ...item, value: item.value + amount };
        }
        return item;
      });
    },
    changeInvestmentPlan: (state, action: PayloadAction<{ planName: string; description: string }>) => {
      const newAct: ActivityLog = {
        id: `act-${Date.now()}`,
        title: `Plan Change: ${action.payload.planName}`,
        description: action.payload.description,
        type: 'plan_change',
        statusText: 'Updated',
        dateStr: 'Today',
        period: 'Today'
      };

      state.activities.unshift(newAct);
    }
  }
});

export const { addContribution, changeInvestmentPlan } = pensionSlice.actions;
export default pensionSlice.reducer;
