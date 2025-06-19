import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const MailContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [mailContent, setMailContent] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const mailTemplates = {
    transactionPassword: [
      { id: 1, language: 'English', subject: 'Change Transaction Password' },
      { id: 2, language: 'Español', subject: 'Change Transaction Password' },
      { id: 3, language: '中文', subject: 'Change Transaction Password' },
      { id: 4, language: 'Deutsch', subject: 'Change Transaction Password' },
      { id: 5, language: 'Português', subject: 'Change Transaction Password' },
      { id: 6, language: 'français', subject: 'Change Transaction Password' },
      { id: 7, language: 'italiano', subject: 'Change Transaction Password' },
      { id: 8, language: 'Türk', subject: 'Change Transaction Password' },
      { id: 9, language: 'polski', subject: 'Change Transaction Password' },
      { id: 10, language: 'العربية', subject: 'Change Transaction Password' },
      { id: 11, language: 'русский', subject: 'Change Transaction Password' },
    ],
    payoutRequest: [
      { id: 1, language: 'English', subject: 'Payout Request' },
      // Add other languages...
    ],
    emailVerification: [
      { id: 1, language: 'English', subject: 'Email Verification' },
      // Add other languages...
    ],
    forgotPassword: [
      { id: 1, language: 'English', subject: 'Forgot Password' },
      // Add other languages...
    ],
    resetGoogleAuth: [
      { id: 1, language: 'English', subject: 'Reset Google Authentication' },
      // Add other languages...
    ],
    forgotTransactionPassword: [
      { id: 1, language: 'English', subject: 'Forgot Transaction Password' },
      // Add other languages...
    ],
    externalMail: [
      { id: 1, language: 'English', subject: 'External Mail' },
      // Add other languages...
    ],
    changePassword: [
      { id: 1, language: 'English', subject: 'Change Password' },
      // Add other languages...
    ],
    registration: [
      { id: 1, language: 'English', subject: 'Registration' },
      // Add other languages...
    ],
    payoutRelease: [
      { id: 1, language: 'English', subject: 'Payout Release' },
      // Add other languages...
    ],
  };

  const tabLabels = [
    'Transaction Password',
    'Payout Request',
    'Email Verification',
    'Forgot Password',
    'Reset GoogleAuth',
    'Forgot Transaction Password',
    'External Mail',
    'Change Password',
    'Registration',
    'Payout Release',
  ];

  const handleEdit = (mail) => {
    setSelectedMail(mail);
    setMailContent('Your transaction password has been changed successfully.'); // Sample content
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedMail(null);
    setMailContent('');
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving mail content:', { mail: selectedMail, content: mailContent });
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Mail Content
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Add New Template
        </Button>
      </Box>

      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 100,
              },
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mailTemplates[Object.keys(mailTemplates)[selectedTab]].map((mail) => (
                  <TableRow key={mail.id}>
                    <TableCell>{mail.id}</TableCell>
                    <TableCell>{mail.language}</TableCell>
                    <TableCell>{mail.subject}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(mail)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>
          Edit Mail Template - {selectedMail?.language}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Subject"
              value={selectedMail?.subject}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mail Content"
              multiline
              rows={6}
              value={mailContent}
              onChange={(e) => setMailContent(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              mr: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MailContent; 