/*
Enum for check-in status
The descriptions are for the UI labels in the bottom of the page
*/
export const CheckinStatus = {
    CheckedIn: 'Status: Checked in',
    NotCheckedIn: 'Status: Not checked in'
}

/* Connect to backend logic code start */

export function ReadCheckinStatus() {
    return CheckinStatus.NotCheckedIn;
}

/* Connect to backend logic code end */
