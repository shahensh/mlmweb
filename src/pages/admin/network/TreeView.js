import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const NetworkTreeView = () => {
  const [expanded, setExpanded] = useState({});

  const handleToggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Example data
  const treeData = {
    id: '1',
    name: 'Root',
    children: [
      {
        id: '2',
        name: 'Level 1 - 1',
        children: [
          { id: '3', name: 'Level 2 - 1' },
          { id: '4', name: 'Level 2 - 2' },
        ],
      },
      {
        id: '5',
        name: 'Level 1 - 2',
        children: [
          { id: '6', name: 'Level 2 - 3' },
          { id: '7', name: 'Level 2 - 4' },
        ],
      },
    ],
  };

  const renderTree = (node) => (
    <React.Fragment key={node.id}>
      <ListItem
        button
        onClick={() => node.children && handleToggle(node.id)}
        sx={{ pl: node.id === '1' ? 0 : 2 }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={node.name} />
        {node.children && (
          <IconButton size="small">
            {expanded[node.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </ListItem>
      {node.children && (
        <Collapse in={expanded[node.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children.map((child) => renderTree(child))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Network Tree
      </Typography>
      <Paper sx={{ p: 3 }}>
        <List>{renderTree(treeData)}</List>
      </Paper>
    </Box>
  );
};

export default NetworkTreeView;