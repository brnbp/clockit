module.exports = {
  clock: {
    in: {
      success: 'check in at morning done 👩‍💻',
      error: 'check in at morning already done',
    },
    lunch: {
      in: {
          success: 'check in for lunch done 🍝',
          error: 'check in for lunch already done',    
      },
      out: {
        success: 'check out for lunch done 🍽',
        error: 'check out for lunch already done',
        rule: 'you should clockin for lunch before clockout',
      },
    },
    out: {
      success: 'check out done 👋😎',
      error: 'check out already done',
      rule: 'you should clock out for lunch before clock out for the day',
    },
    errNotClokedYet: 'you might have not clockin for work yet 🤔',
    noRecordsFound: 'No records found! 📭',
  },
};