import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useRouter } from "next/navigation";
import { Box, Typography, IconButton, Popper, PaPer, List, ListItem, ListItemText, Divider, Badge, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationPanel() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const anchorRef = useRef(null);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const pusher = new Pusher(process.env.PUSHER_KEY, {
            cluster: process.env.PUSHER_CLUSTER,
            forceTLS: true,
        });

        const channel = pusher.subscribe("notifications");

        channel.bind("new-notification", (data) => {
            if (session?.user?.role === "admin") {
                setNotifications((prev) => [data.notification, ...prev]);
                setUnreadCount((prev) => Math.max(0, prev + 1));
            }
        });

        channel.bind("notifications-read", () => {
            setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
            setUnreadCount(0);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [session?.user?.role]);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    const fetchNotifications = async () => {
        try {
            const response = await fetch(`${process.env.API}/notifications`);
            const data = await response.json();
            setNotifications(data);
            setUnreadCount(Math.max(0, data.filter((n) => !n.seen).length));
        } catch (error) {
            console.error("Erro carregando notificações: ", error);
        }
    };

    const markNotificatioAsRead = async (notification) => {
        try {
            await fetch(`${process.env.API}/notifications/${notification._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setNotifications((prev) => 
                prev.map((n) => (n._id === notification._id ? { ...n, seen: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));

            if (notification.redirectUrl) {
                router.push(notification.redirectUrl);
            }
        } catch (error) {
            console.error("Erro marcando notificação como lida: ", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch(`${process.env.API}/notifications/mark-all-read`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setNotifications((prev) => 
                prev.map((n) => ({ ...n, seen: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Erro marcando todas as notificação como lida: ", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const formatTime = (dateString) => {
        if (!dateString) return "Apenas Agora";
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now -date) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} SEGUNDOS ATRÁS`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} MINUTOS ATRÁS`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} HORAS ATRÁS`;
        return `${Math.floor(diffInSeconds / 86400)} DIAS ATRÁS`;
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {session?.user?.role === "admin" && (
                <IconButton ref={anchorRef} onClick={toggleOpen}>
                    <Badge
                        badgeContent={unreadCount > 0 ? unreadCount : null}
                        color="error"
                    >
                        <NotificationsIcon sx={{ color: "red" }} />
                    </Badge>
                </IconButton>
            )}

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                style={{ zIndex: 1300 }}
            >
                <Paper
                    sx={{
                        width: { xs: "90vw", sm: 360 },
                        maxHeight: 400,
                        overflowY: "auto",
                        p: 1,
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        px={1}
                    >
                        <Typography variant="subtitle1" fontWeight="bold">
                            Notificações
                        </Typography>
                        {unreadCount > 0 && (
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{ cursor: "pointer" }}
                                onClick={markAllAsRead}
                            >
                                Marcar todas Como Lida
                            </Typography>
                        )}
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <List>
                        {notifications.length > 0 ? (
                            notifications.map((item, index) => (
                                <ListItem
                                    key={index}
                                    alignItems="flex-start"
                                    onClick={() => markNotificatioAsRead(item)}
                                    sx={{
                                        cursor: "pointer",
                                        backgroundColor: item.seen ? "inherit" : "action.hover",
                                        "&:hover": {
                                            backgroundColor: "action.selected",
                                        },
                                    }}
                                >
                                    <ListItemText 
                                        primary={item.message}
                                        secondary={formatTime(item.createdAt)}
                                        primaryTypographyProps={{
                                            fontSize: 14,
                                            fontWeight: item.seen ? "normal" : "bold",
                                        }}
                                        secondaryTypographyProps={{ fontSize: 12 }}
                                    />    
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="Nenhuam notificação" />
                            </ListItem>
                        )}
                    </List>
                    <Divider />
                    <Box textAlign="center" py={1}>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ cursor: "pointer" }}
                            onClick={() => router.push("/notifications")}
                        >
                            Vê todas as notificações
                        </Typography>
                    </Box>
                </Paper>
            </Popper>
        </Box>
    );
}