import React, { useState } from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '../components/Dialog';

const theme = createTheme();
const apiUrl = `http://localhost:3080/api`;

export default function Form(props) {

    const [usernameValid, setUsernameValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [dialog, setDialog] = useState(null);

    const registerUser = async (formData) => {
        if (!usernameValid || !phoneValid || !emailValid) {
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/submit`, {
                username: formData.get('username'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address')
            }, {headers: {
                "Authorization": JSON.parse(localStorage.getItem('token'))?.token
            }});

            localStorage.setItem("id", JSON.stringify({
                "id": response.data.id,
                "exp": Date.now()+300000
            }));

            setDialog(<Dialog title={response.data.msg} msg={""}></Dialog>);
        } catch (err) {
            setDialog(<Dialog title={"Error!"} msg={err.toString()}></Dialog>);
        }
    }

    const usernameHandle = (event) => {
        setUsernameValid(event.currentTarget.value.match(/^[a-z0-9]+$/i) ? true : false);
    };

    const phoneHandle = (event) => {
        setPhoneValid(event.currentTarget.value.match(/^[0-9]{10}$/i) ? true : false);
    };

    const emailHandle = (event) => {
        setEmailValid(event.currentTarget.value.match(/^[a-z0-9]{2,}@[a-z0-9]{2,}\.[a-z0-9]{2,}$/i) ? true : false);
    };

    const addressHandle = (event) => {
        setAddressValid(event.currentTarget.value.match(/\S.+/i) ? true : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDialog(null);
        registerUser(new FormData(event.currentTarget));        
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
                        User Details
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        helperText={"only alphabets, numbers"}
                                        onChange={usernameHandle}
                                        error={!usernameValid}
                                    />
                                </Grid>
                                <Grid item xs={3} sm={2}>
                                    <TextField
                                        value="+91"
                                        disabled
                                        />
                                </Grid>
                                <Grid item xs={9} sm={10}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    helperText={"10 digits"}
                                    onChange={phoneHandle}
                                    error={!phoneValid}
                                    />
                                </Grid>
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
                                    name="address"
                                    label="Address"
                                    id="address"
                                    aria-label="empty address"
                                    helperText={"Address is required"}
                                    onChange={addressHandle}
                                    error={!addressValid}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}