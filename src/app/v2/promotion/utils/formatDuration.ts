/**
 * Formats the duration between the current date and the end date in the format "Xd Yh Zm Zs"
 * @param endDate - The end date as a string or Date object
 * @returns A string representing the duration in days, hours, minutes, and seconds
 */
export function formatDuration(endDate: string | Date): string {
  const end = new Date(endDate);
  const now = new Date();
  
  // If the end date is in the past, return "Expired"
  if (end <= now) {
    return "Expired";
  }
  
  // Calculate the difference in milliseconds
  const diffMs = end.getTime() - now.getTime();
  
  // Convert to days, hours, minutes, seconds
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  // Format the duration
  let formattedDuration = "";
  
  if (days > 0) {
    formattedDuration += `${days}d `;
  }
  
  if (hours > 0 || days > 0) {
    formattedDuration += `${hours}h `;
  }
  
  if (minutes > 0 || hours > 0 || days > 0) {
    formattedDuration += `${minutes}m `;
  }
  
  formattedDuration += `${seconds}s`;
  
  return formattedDuration;
}