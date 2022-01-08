import React, { useEffect, useState } from 'react';
import Dialog from '../components/Dialog';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Router from 'next/router';

const apiUrl = `http://localhost:3080/api`;

export default function Details(props) {

    const [dialog, setDialog] = useState(null);
    const [data, setData] = useState({});

    const getUserData = async () => {
        const idObj = JSON.parse(localStorage.getItem('id'));
        if (!idObj || Date.now() > idObj.exp) {
            localStorage.removeItem('id');
            alert(`Please enter the user details first`);
            Router.push('/');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/details`, {params: {
                "id": idObj.id
            }}, {headers: {
                "Authorization": JSON.parse(localStorage.getItem('token'))?.token
            }});
            
            if (response.status === 200) {
                setData(response.data.msg);
            }
            else {
                alert("No user data found!");
                Router.push('/');
            }
        } catch (err) {
            setDialog(<Dialog title={"Error!"} msg={err.toString()}></Dialog>);
        }
    };

    useEffect(() => {
        if ( !localStorage.getItem('token') ) {
          Router.push('/');
        }
        setDialog(null);
        getUserData();
    }, [])

    return (
        <TableContainer component={Paper}>
        <Table aria-label="user details">
            <TableHead>
                <TableRow>
                    <TableCell rowSpan={2} align="center">User Details</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Username: </TableCell>
                    <TableCell align="right">{data.username}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Email: </TableCell>
                    <TableCell align="right">{data.email}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Phone: </TableCell>
                    <TableCell align="right">{data.phone}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Address: </TableCell>
                    <TableCell align="right">{data.address}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    );
}