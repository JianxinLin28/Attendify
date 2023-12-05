/*
Enum for check-in status
The descriptions are for the UI labels in the bottom of the page
*/

export const CheckinStatus = {
    CheckedIn: 'Status: Checked in',
    NotCheckedIn: 'Status: Not checked in'
}

var currentCheckinStatus = CheckinStatus.NotCheckedIn;

export const setCurrentCheckinStatus = (newCheckinStatus) => {
    currentCheckinStatus = newCheckinStatus;
}

export const getCurrentCheckinStatus = () => currentCheckinStatus;

/* Connect to backend logic code start */

export function ReadCheckinStatus() {
    return getCurrentCheckinStatus();
}

/* Connect to backend logic code end */
