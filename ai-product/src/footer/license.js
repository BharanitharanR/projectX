import * as React from 'react';
import Box from '@mui/material/Box';   
import Typography from '@mui/material/Typography';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
export default function Footer(props) {

    return  (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
                <Box sx={{ padding: 2, marginTop: 8, textAlign: "center" }}>
                    <Typography variant="body2">© 2024 My AI Product. All rights reserved.</Typography>
                </Box>
                </AppTheme>

    );

};