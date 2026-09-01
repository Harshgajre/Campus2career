const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getUserNotifications = async (req, res, next) => {
  try {
    let notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (notifications.length === 0) {
      notifications = [
        {
          _id: 'notif-1',
          title: 'Interview Scheduled',
          message: 'TechCorp scheduled Technical Round 1 for Sep 10, 11:00 AM.',
          type: 'interview',
          isRead: false,
          timeAgo: '2h ago',
          link: '/student/applications',
        },
        {
          _id: 'notif-2',
          title: 'New Skill Challenge',
          message: 'SIH AI Skill Passport Verifier challenge is now live with ₹50,000 prize!',
          type: 'challenge',
          isRead: false,
          timeAgo: '1d ago',
          link: '/student/challenges',
        },
        {
          _id: 'notif-3',
          title: 'Skill Verified',
          message: 'Your React.js competency has been verified by the campus coordinator.',
          type: 'success',
          isRead: true,
          timeAgo: '2d ago',
          link: '/student/skills',
        },
      ];
    }

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.status(200).json({ success: true, count: notifications.length, unreadCount, notifications });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      notification.isRead = true;
      await notification.save();
    }
    res.status(200).json({ success: true, message: 'Marked as read' });
  } catch (error) {
    next(error);
  }
};
