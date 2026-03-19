import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton"
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Typography} from "@mui/material";
import {styles} from "@/components/nav/topnav/navbarStyles";

export default function TopNav() {
    return (
        <Box component="nav" sx={styles.navbarContainer}>
            <Box sx={styles.contentWrapper}>
                {/* Contact Information */}
                <Box sx={styles.contactInfo}>
                    <Box sx={styles.contactItem}>
                        <IconButton size="small" sx={styles.iconButton}>
                            <PhoneIcon />
                        </IconButton>
                        <Typography variant="body2" sx={styles.contactText}>
                            +1234567890
                        </Typography>
                    </Box>

                    <Box sx={styles.contactItem}>
                        <IconButton size="small" sx={styles.iconButton}>
                            <EmailIcon />
                        </IconButton>
                        <Typography variant="body2" sx={styles.contactText}>
                        test@gmail.com
                        </Typography>
                    </Box>
                </Box>

                <Box sx={styles.socialIcons}>
                    <IconButton sx={styles.iconButton} aria-label="Facebook">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton sx={styles.iconButton} aria-label="Tnstagram">
                        <InstagramIcon />
                    </IconButton>
                    <IconButton sx={styles.iconButton} aria-label="Twitter">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton sx={styles.iconButton} aria-label="YouTube">
                        <YouTubeIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
