"use client";

import Box from "@mui/material/Box";
import {
    Avatar,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery, useTheme
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareIcon from "@mui/icons-material/Compare";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {KeyboardArrowDown} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import CartContent from "../cartContent/CartContent";
import Notification from "@/components/nav/notification/NotificationPanel";

const Nav = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery("(max-width: 600px)");

    const cartCount = useSelector((state) => state.cart.items?.length || 0);

    const handleAuthIconClick = () => {
        if (session && session?.user) {
            router.push(`/dashboard/${session?.user?.role}`);
        } else {
            router.push("/login");
        }
    }

    const toggleMobileDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setMobileDrawerOpen(open);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const toggleCartDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setCartDrawerOpen(open);
    }

    const menuItems = (
        <>
            <Link href="/" passHref>
                <Button sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                    Loja
                </Button>
            </Link>
            <Link href="/about" passHref>
                <Button sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                    Sobre
                </Button>
            </Link>
            <Link href="/contact" passHref>
                <Button sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}>
                    Contato
                </Button>
            </Link>

            <Button
                sx={{ color: "black", fontSize: isSmallScreen ? "0.8rem" : "1rem" }}
                endIcon={<KeyboardArrowDown />}
            >
                Páginas
            </Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <Link href="/about" passHref>
                        Sobre
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link href="/contact" passHref>
                        Contato
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link href="/term" passHref>
                        Termo
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link href="/privacy" passHref>
                        Privacidade
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );

    return (
        <Box sx={{
            width: "100%",
            backgroundColor: "white",
            boxShadow: 3,
            padding: isSmallScreen ? "0.5rem 0" : "1rem 0",
            position: "sticky",
            top: 0,
            zIndex:  1000
        }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    flexDirection: isSmallScreen ? "column" : "row",
                }}
            >
                {/* Logo and Mobile Menu Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: isSmallScreen ? "100%" : "auto",
                        justifyContent: isSmallScreen ? "space-between" : "flex-start",
                        marginBottom: isSmallScreen ? "1rem" : "0",
                    }}
                >
                    {isSmallScreen && !window.location.pathname.includes("/dashboard/admin") && (
                        <IconButton onClick={toggleMobileDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        onClick={() => router.push("/")}
                        sx={{
                            color: "black",
                            fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Cris Laços
                    </Typography>
                </Box>

                {/* Desktop Menu */}
                {!isSmallScreen && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>{menuItems}</Box>
                )}

                {/* Icons */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: isSmallScreen ? "100%" : "auto",
                        justifyContent: isSmallScreen ? "space-between" : "flex-end",
                        marginTop: isSmallScreen ? "1rem" : "0",
                    }}
                >
                    <IconButton
                        onClick={toggleCartDrawer(true)}
                        sx={{
                            color: "#BE9ECC",
                            marginRight: "0.5rem",
                            "&:hover": {
                                backgroundColor: "#e60000",
                                color: "white",
                            }
                        }}
                    >
                        <Badge
                            badgeContent={cartCount}
                            overlap="rectangular"
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: "#FF1A1A",
                                    color: "white",
                                    fontSize: "0.8rem",
                                    minWidth: "20px",
                                    height: "20px",
                                    boxShadow: "0 0 0 2px white",
                                }
                            }}
                        >
                            <ShoppingCartIcon fontSize={isSmallScreen ? "small" : "medium"} />
                        </Badge>
                    </IconButton>

                    <IconButton
                        sx={{
                            color: "#BE9ECC",
                            marginRight: "0.5rem",
                            "&:hover": {
                                backgroundColor: "#e60000",
                                color: "white",
                            }
                        }}
                    >
                        <CompareIcon fontSize={isSmallScreen ? "small" : "medium"} />
                    </IconButton>

                    <IconButton
                        onClick={handleAuthIconClick}
                        sx={{
                            color: "#BE9ECC",
                            marginRight: "0.5rem",
                            "&:hover": {
                                backgroundColor: "#e60000",
                                color: "white",
                            }
                        }}
                    >
                        {session?.user ? (
                            session.user.image ? (
                                <Avatar
                                src={session.user.image}
                                alt="Perfil do usuário"
                                sx={{
                                    width: isSmallScreen ? 24 : 32,
                                    height: isSmallScreen ? 24 : 32,
                                }}
                            />  
                        ) : (
                            <PersonIcon fontSize={isSmallScreen ? "small" : "medium"} />
                        ) 
                    ) : (
                            <LoginIcon fontSize={isSmallScreen ? "small" : "medium"} />
                        )}
                        
                    </IconButton>

                    <Notification />
                </Box>
            </Box>

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="left"
                open={mobileDrawerOpen}
                onClose={toggleMobileDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleMobileDrawer(false)}
                    onKeyDown={toggleMobileDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <ListItemText>
                                <Link href="/" passHref>
                                    Loja
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Link href="/about" passHref>
                                    Sobre
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Link href="/contact" passHref>
                                    Contato
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Link href="/test" passHref>
                                    Teste
                                </Link>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Cart Drawer */}
            <Drawer
                anchor="right"
                open={cartDrawerOpen}
                onClose={toggleCartDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleCartDrawer(false)}
                    onKeyDown={toggleCartDrawer(false)}
                >
                    <CartContent />
                </Box>
            </Drawer>
        </Box>
    );
}

export default Nav;
