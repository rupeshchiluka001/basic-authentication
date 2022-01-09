import React, { useState, useEffect } from "react";
import axios from 'axios';
import Router from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../components/Dialog';

const theme = createTheme();
const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

export default function Login(props) {

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [dialog, setDialog] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if ( token ) {
            if (Date.now() <= token.exp) {
                Router.push('/screen2');
            }
        }
    }, [])

    const storeToken = (token, expiry) => {
        localStorage.setItem("token", JSON.stringify({
            "token": token,
            "exp": expiry
        }));
    };

    const loginUser = async (formData) => {
        if (!emailValid || !passwordValid) {
            return;
        }
        try {
          const response = await axios.post(`${apiUrl}/login`, {
              email: formData.get('email'),
              password: formData.get('password')
          });
          if (response.status === 200) {
                storeToken(response.data.token, response.data.expires);
                Router.push('/screen2');
          }
          else {
            setDialog(<Dialog title={response.data.msg} msg={""}></Dialog>);
          }
        } catch (err) {
            setDialog(<Dialog title={"Error!"} msg={err.toString()}></Dialog>);
        }
    }

    const emailHandle = (event) => {
      setEmailValid(event.currentTarget.value.match(/^[a-z0-9]{2,}@[a-z0-9]{2,}\.[a-z0-9]{2,}$/i) ? true : false);
    };

    const passwordHandle = (event) => {
      setPasswordValid(event.currentTarget.value.match(/\S.+/i) ? true : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDialog(null);
        loginUser(new FormData(event.currentTarget));        
    };

    return (
        <>
            {dialog}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        Login
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={"Enter valid email address"}
                                    onChange={emailHandle}
                                    error={!emailValid}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    aria-label="empty password"
                                    helperText={"only numbers, alphabets, length>6"}
                                    onChange={passwordHandle}
                                    error={!passwordValid}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}