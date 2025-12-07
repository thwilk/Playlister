import { useContext, useState } from 'react';
import AuthContext from '../auth'
import MUIErrorModal from './MUIErrorModal'
import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function RegisterScreen() {
    const { auth } = useContext(AuthContext);

    const [profileAvatar, setProfileAvatar] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.registerUser(
            formData.get('userName'),
            formData.get('email'),
            profileAvatar,
            formData.get('password'),
            formData.get('passwordVerify')
        );
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const img = new Image();
        img.src = URL.createObjectURL(file);
    
        img.onload = async () => {
            if (img.width !== 250 || img.height !== 250) {
                alert("Image must be 250x250 pixels!");
                return;
            }

            const base64 = await resizeImage(file);
            setProfileAvatar(base64);
        };
    };

    function resizeImage(file, maxWidth = 250, maxHeight = 250) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = maxWidth;
                    canvas.height = maxHeight;
                    const ctx = canvas.getContext('2d');
    
                    ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
    
                    const dataUrl = canvas.toDataURL('image/png'); 
                    resolve(dataUrl);
                };
                img.onerror = (err) => reject(err);
                img.src = event.target.result;
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    let modalJSX = ""
    console.log(auth);
    if (auth.errorMessage !== null){
        modalJSX = <MUIErrorModal />;
    }
    console.log(modalJSX);

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="uname"
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid> */}


                            
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordVerify"
                                    label="Password Verify"
                                    type="password"
                                    id="passwordVerify"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                            >
                                Upload Avatar (250x250)
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </Grid>

                        {profileAvatar && (
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Typography variant="body2">Preview:</Typography>
                                <Avatar
                                    src={profileAvatar}
                                    sx={{ width: 80, height: 80, margin: '0 auto' }}
                                />
                            </Grid>
                        )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
                { modalJSX }
            </Container>
    );
}