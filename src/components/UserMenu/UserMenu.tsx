import React, { useState } from 'react';
import { Avatar, IconButton, Snackbar, Alert } from '@mui/material';
import UserProfileDialog from '../UserProfileDialog/UserProfileDialog';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [profileDialogOpen, setProfileDialogOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { currentUser } = useAuthContext();
	const navigate = useNavigate();
	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const openProfileDialog = () => {
		try {
			if (!currentUser) {
				console.log('Redirecting anonymous users to login page');
				navigate('/login');
			} else {
				setProfileDialogOpen(true);
			}
			handleClose();
		} catch (err) {
			console.error('Error opening profile dialog:', err);
			setError('Failed to open profile. Please try again.');
		}
	};

	const handleCloseError = () => {
		setError(null);
	};

	return (
		<div>
			<IconButton
				size="small"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={openProfileDialog}
				color="inherit"
			>
				<Avatar
					sx={{ width: 30, height: 30 }} // Adjust the size as needed
					alt={currentUser?.displayName || 'User Avatar'}
					src={currentUser?.photoURL || ''}
				/>
			</IconButton>
			
			{profileDialogOpen && (
				<UserProfileDialog
					open={profileDialogOpen}
					onClose={() => setProfileDialogOpen(false)}
				/>
			)}
			
			<Snackbar 
				open={!!error} 
				autoHideDuration={6000} 
				onClose={handleCloseError}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseError} severity="error">
					{error}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default UserMenu;
