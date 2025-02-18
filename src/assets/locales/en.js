export default {
  commons: {
    buttons: {
      update: {
        label: "Update",
      },
      change: {
        label: "Change",
      },
    },
  },
  login: {
    toasts: {
      successful_reset_request: {
        label: "Requested successfully",
      },
    },
    request_reset_password_modal: {
      title: "Reset password request",
      inputs: {
        email: {
          label: "Email",
          errors: {
            empty: {
              label: "Email cannot be empty",
            },
          },
        },
      },
    },
  },
  change_password: {
    toasts: {
      successful_password_change: {
        label: "Password changed",
      },
    },
    inputs: {
      current_password: {
        label: "Current Password",
        errors: {
          empty: {
            label: "Current password field cannot be empty",
          },
        },
      },
      new_password: {
        label: "New Password",
        errors: {
          empty: {
            label: "New password field cannot be empty",
          },
        },
      },
      confirmed_new_password: {
        label: "Confirm New Password",
        errors: {
          empty: {
            label: "Confirm password field cannot be empty",
          },
          notSame: {
            label: "New password and confirmed new password must be same",
          },
        },
      },
    },
  },
  moderation_management: {
    cards: {
      admin_list: {
        title: "Admin List",
        empty_state: {
          title:
            "No admins at the moment, Check if we have any requester to grant access!",
        },
      },
      requester_list: {
        title: "Requester List",
        empty_state: {
          title: "Currently no requests are found, Check after a while!",
        },
      },
    },
  },
  users_listing: {
    title: "Users list",
    empty_state: {
      title: "Oops, no user!",
    },
  },
  reset_password: {
    toasts: {
      successful_password_change: {
        label: "Password changed",
      },
      invalid_credentials: {
        label: "Invalid credentials",
      },
    },
    inputs: {
      new_password: {
        label: "New Password",
        errors: {
          empty: {
            label: "New password field cannot be empty",
          },
        },
      },
      confirmed_new_password: {
        label: "Confirm New Password",
        errors: {
          empty: {
            label: "Confirm password field cannot be empty",
          },
          notSame: {
            label: "New password and confirmed new password must be same",
          },
        },
      },
    },
  },
};
