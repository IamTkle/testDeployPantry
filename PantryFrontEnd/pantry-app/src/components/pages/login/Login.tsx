
import React, { useState } from "react";
import { render } from "react-dom";
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    Link,
    Box
} from '@material-ui/core'
import { jsx } from 'theme-ui';
/** @jsxImportSource theme-ui */

// declare global {
//   namespace preact {
//     interface PreactDOMAttributes {
//       sx: SxStyleProp
//     }
//   }
// }

const SignUp = () => {

    const [name, setName] = useState('Person');
    const paperStyle={padding: 20, height:'80vh',width:500, margin:"20px auto"}

    return(
        <Grid>
            <Paper elevation={30} variant="outlined" style={paperStyle}>
                <Grid>
                    <Avatar alt="Remy Sharp" src="/static/images/avatars/unnamed.png" />
                    <h2> Login </h2>
                </Grid>
                <Box mt={5}>
                    <div>
                    <TextField label='Email' placeholder="Enter email" fullWidth required variant="outlined"/>
                    </div>
                    <div>
                    <TextField label='Password' placeholder="Enter password" type="password" fullWidth required variant="outlined"/>
                    </div>
                </Box>
                <FormControlLabel 
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' fullWidth variant="contained"> Login </Button>
                <Typography> Don't have an account? 
                    <Link href="#" >
                        Forgot Password?
                    </Link>
                </Typography>
                <Typography> Don't have an account? 
                    <Link href="#" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
    
}

export default SignUp;