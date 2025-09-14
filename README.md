# CVS Till Counter Application

A comprehensive web-based cash counting system designed specifically for CVS employees during night shifts. This application helps streamline the process of counting cash, calculating withdrawals, and maintaining records while ensuring the required $200 minimum remains in each drawer.

## Features

### 🧮 Cash Counting

- **Bill Counting**: Count $20, $10, $5, and $1 bills
- **Coin Counting**: Count quarters, dimes, nickels, and pennies
- **Real-time Total**: Automatically calculates total drawer amount as you input counts
- **Accurate Calculations**: Handles floating-point precision for accurate money calculations

### 💰 Smart Withdrawal System

- **Optimal Denomination Selection**: Prioritizes larger bills/coins when calculating withdrawals
- **$200 Minimum Protection**: Ensures drawer never goes below required minimum
- **Exact Change Verification**: Confirms exact withdrawal amount can be made with available denominations
- **Clear Instructions**: Provides step-by-step withdrawal instructions with amounts

### 📊 Record Keeping

- **Local Storage Database**: Stores all counting sessions in browser's local storage
- **Complete Records**: Saves drawer number, date, time, total amount, and sales amount
- **Record Management**: View, sort, and delete saved records
- **Persistent Data**: Records remain available between browser sessions

### 🎨 User Interface

- **Dark Theme**: Easy on the eyes during night shifts
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **CVS Branding**: Red accent colors matching CVS brand identity
- **Intuitive Layout**: Logical flow from counting to withdrawal to record saving

## How to Use

### 1. Setup

- Enter the drawer number
- Input the total sales amount for withdrawal

### 2. Count Cash

- Enter the count for each bill denomination ($20, $10, $5, $1)
- Enter the count for each coin type (quarters, dimes, nickels, pennies)
- Watch the total update automatically

### 3. Calculate Withdrawal

- Click "Calculate Withdrawal" to see optimal withdrawal strategy
- Review the withdrawal instructions showing which denominations to take
- Verify the remaining amount stays at $200

### 4. Save Record

- Click "Save Record" to store the counting session
- View saved records in the right panel
- Records include date, time, drawer number, and amounts

## Technical Details

### Files Structure

```
cvs-till-count/
├── index.html          # Main application interface
├── script.js           # JavaScript functionality
└── README.md          # Documentation (this file)
```

### Technologies Used

- **HTML5**: Structure and semantic markup
- **Tailwind CSS**: Styling and responsive design (loaded via CDN)
- **Vanilla JavaScript**: Core functionality and calculations
- **Local Storage API**: Data persistence

### Key Functions

- `calculateTotal()`: Computes total drawer amount from input counts
- `calculateWithdrawal()`: Determines optimal withdrawal strategy
- `calculateOptimalWithdrawal()`: Algorithm for denomination optimization
- `saveRecord()`: Stores counting session to local storage
- `loadRecords()`: Retrieves and displays saved records

## Usage Instructions

### Opening the Application

1. Open the `index.html` file in any modern web browser
2. The application works entirely offline - no internet connection required after initial load

### Best Practices

1. **Double-check counts**: Verify your bill and coin counts before calculating withdrawal
2. **Save records**: Always save each counting session for audit purposes
3. **Review withdrawals**: Carefully review withdrawal instructions before removing cash
4. **Clear form**: Use the save function to automatically clear the form for the next drawer

### Error Handling

- **Invalid sales amount**: Application prevents processing without valid sales input
- **Insufficient funds**: Warns if withdrawal would reduce drawer below $200
- **Exact change**: Alerts if exact withdrawal amount cannot be made with available denominations
- **Missing drawer number**: Requires drawer number before saving records

## Security & Privacy

- All data is stored locally in your browser
- No data is transmitted to external servers
- Records remain private to your device
- Clear browser data to remove all stored records

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Application Not Loading

- Ensure JavaScript is enabled in your browser
- Check that all files are in the same directory
- Try opening in an incognito/private window

### Data Not Saving

- Verify local storage is enabled in browser settings
- Check available storage space
- Try refreshing the page and re-entering data

### Calculations Incorrect

- Verify all input fields contain valid numbers
- Check for decimal places in sales amount
- Ensure no negative values in count fields

## Support

This application is designed to work independently without external dependencies. For any issues or improvements, refer to the source code in `script.js` for the calculation logic.

---

**Note**: This application is designed for CVS night shift operations and follows the standard requirement of maintaining $200 in each drawer after sales withdrawals.
