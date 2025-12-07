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
import { GlobalStoreContext } from '../store'


export default function EditAccount() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [profileAvatar, setProfileAvatar] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
            

            const x = auth.editUser(
                userName,
                profileAvatar,
                password,
            );
            console.log("THIS IS X: " + x);
    
            if(auth.errorMessage !== null){
                setPasswordVerify("");
                setPassword("");
                setUserName("");
                setProfileAvatar("");
            }

            
            store.closeCurrentList();

        
        
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

            const base64String = await resizeImage(file);
            setProfileAvatar(base64String);
    
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
    




    const isDisabled = !(
        userName.trim() !== "" ||
        (password.trim() !== "" && passwordVerify.trim() !== "")
    );
    


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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit Account Information
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="User Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Verify New Password"
                                type="password"
                                value={passwordVerify}
                                onChange={(e) => setPasswordVerify(e.target.value)}
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
                        disabled={isDisabled}
                    >
                        Edit Account
                    </Button>
                </Box>
            </Box>

            {auth.errorMessage && <MUIErrorModal />}
        </Container>
    );
}