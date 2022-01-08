import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Router from 'next/router';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const signout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        Router.push('/');
    };

    const divStyle = {
        padding: '10px',
        textAlign: 'right'
    }

    return (
        <div style={divStyle}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu': undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                DashBoard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <a onClick={signout}>Signout</a>
                </MenuItem>
            </Menu>
        </div>
    )
}