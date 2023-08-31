import { useState,useEffect } from "react";
import { AppBar,Toolbar,useMediaQuery } from "@mui/material";
import './Headercss.css'
import { ShoppingBagOutlined,FaceOutlined,SearchOutlined } from "@mui/icons-material";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';






export default function Header(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    
    return(
    
        <div>
            <AppBar position="static" style={{backgroundColor:'#fff'}}  >
                  <Toolbar>
                   <div className="headermain">
                   <div className="header__logo">
                   
                        <img src={`http://localhost:5000/images/LETTICA.png`} width='100%'/>
                         

                    </div>
                    <div className="header__searchbar">
                     <input type="text" className="header__search" name='input' onFocus={()=>{
                     
                     }}/>
                    <div className="header__searchbar__icon">
                    <svg width="24" height="24" viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M112.913 127.287L99.0375 113.631L92.2688 116.742C82.352 121.301 74.8465 
                         122.946 64.0399 122.929C45.0702 122.899 31.4836 117.407 18.3718 104.466C5.52698 
                         91.7888 0 78.846 0 61.4439C0 44.419 5.48784 31.4009 17.956 18.8495C26.2214 10.5289
                          37.0788 4.3372 48.4601 1.45383C56.1117 -0.484611 71.8883 -0.484611 79.5399 1.45383C102.2
                           7.19456 120.493 24.9123 126.003 46.4551C130.352 63.4606 127.465 80.5322 117.789 95.0218L113.711
                            101.129L127.356 114.799C140.067 127.535 141 128.728 141 132.252C141 137.783 137.523 140.944
                             131.439 140.944C126.809 140.944 126.727 140.883 112.913 127.287ZM74.8882 104.883C85.8266
                              102.362 98.2823 93.4375 103.652 84.275C119.859 56.6204 102.796 22.2788 70.5395
                               17.6318C55.7043 15.4946 42.628 19.6831 31.4285 30.1597C6.77097 53.2256 16.032
                                92.4416 48.7717 103.599C56.1618 106.118 67.1829 106.66 74.8882 104.883Z" fill="var(--green)"/>
                    </svg>

                    </div>
                    </div>
                    <div className="header__icons header__cart">
                        <ShoppingBagOutlined/>
                        <FaceOutlined/>
             
                    </div>
                   </div>
                  </Toolbar>
            </AppBar>
        </div>
    )
}

























    {/*       {matches?       <FormControl sx={{ m: 1,  width: '45ch' }} variant="outlined">
                         <OutlinedInput
                           
                           id="outlined-adornment-weight"
                           endAdornment={<SearchOutlined/>}
                           aria-describedby="outlined-weight-helper-text"
                           inputProps={{
                             'aria-label': 'weight',
                           }}
                        />
                        </FormControl>:       <FormControl sx={{ m: 1,  width: '18ch' }} variant="outlined">
                         <OutlinedInput
                           
                           id="outlined-adornment-weight"
                           endAdornment={<SearchOutlined/>}
                           aria-describedby="outlined-weight-helper-text"
                           inputProps={{
                             'aria-label': 'weight',
                           }}
                        />
                        </FormControl>} */}