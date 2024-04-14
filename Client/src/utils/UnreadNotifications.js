export const UnreadNotificationsFunc = (notifications) => {
    return notifications?.filter((n) => n.isRead === false);
}