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


    const handleSubmit = (event) => {
        event.preventDefault();
            

            const x = auth.editUser(
                userName,
                "placeholderProfileAvatar",
                password,
            );
            console.log("THIS IS X: " + x);
    
            if(auth.errorMessage !== null){
                setPasswordVerify("");
                setPassword("");
                setUserName("");
            }

            
            store.closeCurrentList();

        
        
    };





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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                                name="userName"
                                label="User Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="passwordVerify"
                                label="New Password Verify"
                                type="password"
                                value={passwordVerify}
                                onChange={(e) => setPasswordVerify(e.target.value)}
                            />
                        </Grid>
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