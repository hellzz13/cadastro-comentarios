export {};

declare global {
  interface Window {
    FakerApi: any; // 👈️ elimina uso de type api externa
  }
}
