export const PRIMARY_COLOUR = "#660033"
export const FONT_FAMILY = "Prata"
export const finalPrice = (price: number, discountPrice: number) => price - (price * discountPrice) / 100;
export const RAZORPAYKEY_ID = "rzp_test_qXH0h7SCch7OVM";
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    return date.toLocaleDateString("en-US", {
      month: "short", // Feb
      day: "2-digit", // 25
      year: "numeric", // 2025
    });
  }