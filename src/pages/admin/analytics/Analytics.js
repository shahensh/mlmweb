import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const monthlyData = [
    { name: 'Jan', leads: 65 },
    { name: 'Feb', leads: 59 },
    { name: 'Mar', leads: 80 },
    { name: 'Apr', leads: 81 },
    { name: 'May', leads: 56 },
    { name: 'Jun', leads: 55 },
    { name: 'Jul', leads: 40 },
    { name: 'Aug', leads: 45 },
    { name: 'Sep', leads: 60 },
    { name: 'Oct', leads: 70 },
    { name: 'Nov', leads: 75 },
    { name: 'Dec', leads: 85 }
  ];

  const yearlyData = [
    { name: '2019', leads: 400 },
    { name: '2020', leads: 300 },
    { name: '2021', leads: 500 },
    { name: '2022', leads: 600 },
    { name: '2023', leads: 700 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Analytics</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Monthly Leads</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#8884d8" name="Number of Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Yearly Leads</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#82ca9d" name="Number of Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics; 